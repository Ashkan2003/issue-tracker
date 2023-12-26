// this page has the logic of implementing filtering and sorthing

import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  //
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    // the columns is a array of obj // the type of "value" is the keys of Issue-obj // the className-property is optional
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  //filtering section // we want to validate the search-params.its not nessesery but if a user type a serach-param it self in the url then we get an error
  const statuses = Object.values(Status); //statuses is an array of 3-values =>["OPEN","IN_PROGRESS","CLOSED"] //Object.value Returns an array of values of the enumerable properties of an object
  const status = statuses.includes(searchParams.status)
    ? searchParams.status // if the searchParams.status was it the statuses-array put searchParams.status in the status
    : undefined; // if the searchParams.status was not in the statuses-array put undefind in the status // prisma will render all of the issues if the "where"-value was undefind

  //sorthing section// we want to validate the search-params.its not nessesery but if a user type a serach-param it self in the url then we get an error
  const orderby = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // get the filtered issues from the db// const issues is an array of obj
  const issues = await prisma.issue.findMany({
    where: { status: status }, // filter the issues
    orderBy: orderby, // sort the issues
  });

  return (
    <div>
      <IssueActions />
      {/* variant="surface" is a design value for creating a beutifull table */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
