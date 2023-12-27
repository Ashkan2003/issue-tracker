// this page has the logic of implementing filtering and sorthing

import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../_components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";

interface Props {
  // the "status" and "orderby" and "page" are the searchPrams query-strings
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  //filtering section // we want to validate the search-params.its not nessesery but if a user type a serach-param it self in the url then we get an error
  const statuses = Object.values(Status); //statuses is an array of 3-values =>["OPEN","IN_PROGRESS","CLOSED"] //Object.value Returns an array of values of the enumerable properties of an object
  const status = statuses.includes(searchParams.status)
    ? searchParams.status // if the searchParams.status was it the statuses-array put searchParams.status in the status
    : undefined; // if the searchParams.status was not in the statuses-array put undefind in the status // prisma will render all of the issues if the "where"-value was undefind

  //sorthing section// we want to validate the search-params.its not nessesery but if a user type a serach-param it self in the url then we get an error
  const orderby = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1; // we need the current-page from the seachParams.if its null,we are in the first-page
  const pageSize = 10; // the number of issues shown in one page

  // get the filtered issues from the db// const issues is an array of obj
  const issues = await prisma.issue.findMany({
    where: { status: status }, // filter the issues
    orderBy: orderby, // sort the issues
    skip: (page - 1) * pageSize, // the number of record we want to skip // we need this to implement paginate issues
    take: pageSize, // the number of records we want to fetch // // we need this to implement paginate issues
  });

  //Count the number of Issues
  const issueCount = await prisma.issue.count({ where: { status: status } });

  return (
    <div className="space-y-5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
