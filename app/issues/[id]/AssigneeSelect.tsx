"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = () => {

  // we used react-query to cash the users
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"], // the queryKey is a unic key to identify the data in the cash
    queryFn: () => axios.get("/api/users").then((res) => res.data), // we pass a function to this to fetch the data
    staleTime: 60 * 1000, //60s // the time to refetch the data
    retry:3, // if fetching data was not succes, then try 3 more times
  });

  if(isLoading) return <Skeleton height="2rem"/>;

  if(error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
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
