"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]); // the type "User[]" is a array of obj

  // in this useEffect-hook we fetch the users from db by axios and set it to the users-state
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users"); // we only want to fetch the data in type of <User[]>
      setUsers(data); // we set the data(an array of abj) to the user
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users.map((user) => (
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
