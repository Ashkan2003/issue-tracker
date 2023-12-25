import { patchIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// interface Props {
//   params: { params: { id: string } };
// }

// this is a api for updating an issue
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // get the issue-id from params
) {
  // we want to protect our api-end-point from unautninicated users
  // so we get the user-Auth-state from the getServerSettion and if there is no session(its means that the user doesent loged in) so return a 401 error
  // 401 : unAutorise
  // if you try to send a request from the postman it faild
  const session = await getServerSession(authOptions); // we use getServerSession-hook fot geting user Auth-state in server components
  if (!session) return NextResponse.json({}, { status: 401 });

  //
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body); // validate the body with zod

  if (!validation.success)
    // if the validation falied retunr 400
    return NextResponse.json(validation.error.format(), { status: 400 });

  //
  const { assignedToUserId, title, description } = body; // destructor the values from body
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  // ------------------------------------
  const issue = await prisma.issue.findUnique({
    // find the equal issue by its id
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  // -------------------------------------
  const updatedIssue = await prisma.issue.update({
    // if every thing was right then update the issue
    where: { id: issue.id },
    data: {
      title: title,
      description: description,
      assignedToUserId: assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

// this is a api for deleting an issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // get the issue-id from params
) {
  // we want to protect our api-end-point from unautninicated users
  // so we get the user-Auth-state from the getServerSettion and if there is no session(its means that the user doesent loged in) so return a 401 error
  // 401 : unAutorise
  // if you try to send a request from the postman it faild
  const session = await getServerSession(authOptions); // we use getServerSession-hook fot geting user Auth-state in server components
  if (!session) return NextResponse.json({}, { status: 401 });

  //
  const issue = await prisma.issue.findUnique({
    // find the equel issue with its id
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    // if the issue doesnt exists then return a 404 error
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // then delete the issue from the db
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  // return a empty obj for the responbse beacuse this is a delete api
  return NextResponse.json({});
}
