//API routes provide a solution to build a public API with Next.js.
// status:400 // mean bad-request // means that the client send invalid-data
// status:201 // ok // a new obj was created
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// this is an api for creating an issue
export async function POST(request: NextRequest) {
  // we want to protect our api-end-point from unautninicated users
  // so we get the user-Auth-state from the getServerSettion and if there is no session(its means that the user doesent loged in) so return a 401 error
  // 401 : unAutorise
  // if you try to send a request from the postman it faild
  const session = await getServerSession(authOptions); // we use getServerSession-hook fot geting user Auth-state in server components
  if (!session) return NextResponse.json({}, { status: 401 });
  
  //
  const body = await request.json(); // this return a promise so we store-await it in body
  // we expect that the body have title and description,so then validate them
  const validation = issueSchema.safeParse(body); // if the body have the title and description with the "createIssueSchema" format the success is true otherwise false

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
