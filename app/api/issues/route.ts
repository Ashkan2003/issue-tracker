//API routes provide a solution to build a public API with Next.js.
// status:400 // mean bad-request // means that the client send invalid-data
// status:201 // ok // a new obj was created
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  // this is the schema of validation with zod
  title: z.string().min(1,"Title is required").max(255), // the second arg is the error-message
  description: z.string().min(1,"Description is required"),
});

//mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }

export async function POST(request: NextRequest) {
  const body = await request.json(); // this return a promise so we store-await it in body
  // we expect that the body have title and description,so then validate them
  const validation = createIssueSchema.safeParse(body); // if the body have the title and description with the "createIssueSchema" format the success is true otherwise false

  if (!validation.success)
    // if the validation.success was false then throw a 400 error in response
    return NextResponse.json(validation.error.format(), { status: 400 });

  //if  the validation.success was true then get the body and des from body and create a new issue-row in db
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  // return the ok respons to the client
  return NextResponse.json(newIssue, { status: 201 });
}
