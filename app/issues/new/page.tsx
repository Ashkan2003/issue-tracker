"use client";
import { Button, Callout, CalloutIcon, CalloutText, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor"; // this is for the editor
import "easymde/dist/easymde.min.css"; // this is for the editor
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter(); //we navigate with useRouter-function
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  console.log(error);
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon >
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          // the data is an obj and its value is the registered inputs.// like {title: 'bug1', description: 'fix it'}
          // with "api-routes" we write a post-api and with axios we sent a post-request to the my-sql and post(create) the data(title,des) in the db
          try {
            await axios.post("/api/issues", data); // see the POST-methid in the api/issues/route.ts file
            router.push("/issues");
          } catch (error) {
            console.log(error, "dd");
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {/* we cant use the register-property for a component like "Simplemde" so we use the Controller-component in this way to control the registering on "simplemde" */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
