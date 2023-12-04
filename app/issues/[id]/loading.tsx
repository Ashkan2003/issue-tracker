import { Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <div className="flex space-x-3 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem"/>
      </div>
      {/* the prose class is the talwind-tophography class */}
      <Card className="prose mt-4">
        <Skeleton count={3}/>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
