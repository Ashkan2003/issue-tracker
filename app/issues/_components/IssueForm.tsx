"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillInfoCircle } from "react-icons/ai";
import { z } from "zod";
import "easymde/dist/easymde.min.css"; // this is for the editor
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor"; // this is for the editor


// interface IssueFormData {
//   title: string;
//   description: string;
// }

type IssueFormData = z.infer<typeof issueSchema>; // we give the useForm-hook a type based on custom-zod-schema // so we get "createIssueSchema" and infer the type of it and place in "IssueFormData" and give it to useForm

interface Props {
  issue?: Issue; //with ? we make issue optional// this Issue-type is generated from prisma-client
}

//we used this component in two places // 1)in the "NewIssuePage"-file to create a new issue //2) in the "EditIssuePage"-file for edtiting the issue
// so if issue exists => then we use this component to update an issue
//  if issue dont exists => then we use this component to create an issue
const IssueForm = ({ issue }: Props) => {
  const router = useRouter(); //we navigate with useRouter-function

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }, // this error is for client side validation error
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema), // this code allows hookform to integrait with so many data-validation-library like "zod"
  });

  const [error, setError] = useState(""); // this error is for server-side validation error
  const [isSubmitting, setIsSubmitting] = useState(false); // this error is for server-side validation error

  const onsubmit = handleSubmit(async (data) => {
    // the data is an obj and its value is the registered inputs.// like {title: 'bug1', description: 'fix it'}
    // with "api-routes" we write a post-api and with axios we sent a post-request to the my-sql and post(create) the data(title,des) in the db
    try {
      console.log(issue, "ddd");
      setIsSubmitting(true);
      if (issue) {
        // if issue exists => then send a patch(update) request to the server
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        // if issue dont exists => then send a post request to the server
        await axios.post("/api/issues", data); // see the POST-methid in the api/issues/route.ts file
      }
      router.push("/issues/list");
      router.refresh(); // this will tell to nextjs to refresh the content of this page
    } catch (error) {
      setIsSubmitting(false);
      // this error is for server-side validation errors
      console.log(error);
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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* we cant use the register-property for a component like "Simplemde" so we use the Controller-component in this way to control the registering on "simplemde" */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
