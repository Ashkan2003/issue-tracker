"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  // we used react-query to cash the users
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"], // the queryKey is a unic key to identify the data in the cash
    queryFn: () => axios.get("/api/users").then((res) => res.data), // we pass a function to this to fetch the data
    staleTime: 60 * 1000, //60s // the time to refetch the data
    retry: 3, // if fetching data was not succes, then try 3 more times
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => {
        //we want evey time the user change the select-box value,send a patch-request to put the select-box-value("userId") to the issue-table assignedToUserId-coluom 
        // the userId-value is the same user.id-value that we pass to the "value"-property of Select.Item
        // the onValueChange-prop is a radix-ui interal prop for onchange-event
        // we send a patch-request to this api for assign an issue to a user
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId || null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
