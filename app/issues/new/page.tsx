"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor"; // this is for the editor
import "easymde/dist/easymde.min.css"; // this is for the editor
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>; // we give the useForm-hook a type based on custom-zod-schema // so we get "createIssueSchema" and infer the type of it and place in "IssueForm" and give it to useForm

const NewIssuePage = () => {
  const router = useRouter(); //we navigate with useRouter-function

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }, // this error is for client side validation error
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema), // this code allows hookform to integrait with so many data-validation-library like "zod"
  });

  const [error, setError] = useState(""); // this error is for server-side validation error
  const [isSubmitting, setIsSubmitting] = useState(false); // this error is for server-side validation error

  const onsubmit = handleSubmit(async (data) => {
    // the data is an obj and its value is the registered inputs.// like {title: 'bug1', description: 'fix it'}
    // with "api-routes" we write a post-api and with axios we sent a post-request to the my-sql and post(create) the data(title,des) in the db
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data); // see the POST-methid in the api/issues/route.ts file
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      // this error is for server-side validation errors
      console.log(error, "dd");
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onsubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* we cant use the register-property for a component like "Simplemde" so we use the Controller-component in this way to control the registering on "simplemde" */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;