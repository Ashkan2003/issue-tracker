import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  // we want to validate the search-params.its not nessesery but if a user type a serach-param it self in the url then we get an error
  const statuses = Object.values(Status); //statuses is an array of 3-values =>["OPEN","IN_PROGRESS","CLOSED"] //Object.value Returns an array of values of the enumerable properties of an object
  const status = statuses.includes(searchParams.status)
    ? searchParams.status // if the searchParams.status was it the statuses-array put searchParams.status in the status
    : undefined; // if the searchParams.status was not in the statuses-array put undefind in the status // prisma will render all of the issues if the "where"-value was undefind

  // get the filtered issues from the db// const issues is an array of obj
  const issues = await prisma.issue.findMany({
    where: { status: status },
  });

  return (
    <div>
      <IssueActions />
      {/* variant="surface" is a design value for creating a beutifull table */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
