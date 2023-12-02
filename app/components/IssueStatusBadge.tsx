import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status; // the type of status is the Status-type in the schema.prisma-file
}

// the Record is one of the types of typeScript// its a generic-type
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};



const IssueStatusBadge = ({ status }: Props) => {
  return (
    // instead of using a if-else-statment we used the Record-type
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
