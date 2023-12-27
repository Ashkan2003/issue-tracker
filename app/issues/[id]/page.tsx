import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { title } from "process";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions); // we user getServerSession hook for geting user Auth-state in the server-components

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound(); // if the issue does not exist then go to notFound-page //When used in a React server component, this will set the status code to 404. When used in a custom app route it will just send a 404 status.

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {/* if the session was true(exist) so the user exists so render these component */}
      {/* if the session was false(not-exist) so the user not loged in so dont render these component */}
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};


//important// this is the metadata of this page. this is for better seo
// this is the way of implementing dynamic metadata
export async function generateMetadata({ params }: Props) {
  // fetch the issue by its id from db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title, // this will shown in the title of the page of site
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailPage;
