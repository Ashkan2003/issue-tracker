"use client"
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  // the type of status is an array of obj that each obj has a two value,"lable" that is a string and "value" that is optioanal and we gave the "Status"-type that is a union of 3-value
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value}
            value={status.value || ""} // beacus we declered value optianal, it may be undifind. so its gave an compilition error, so to avoid that we write if status.value was undfind(falsy value), put ""
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
