import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Card, Text } from "@radix-ui/themes";

import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

// interface Props {
//   issue: Issue;
// }

const IssueDetails = ({ issue }: { issue: Issue }) => {
  // the type of issue is "Issue" from prisma-client // this type is a model in the schema.prisma-file
  return (
    <>
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      {/* the prose class is the talwind-tophography class */}
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
