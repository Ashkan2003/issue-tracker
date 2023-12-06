import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// interface Props {
//   params: { params: { id: string } };
// }

// this is a api for updating an issue
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // get the issue-id from params
) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body); // validate the body with zod

  if (!validation.success) // if the validation falied retunr 400
    return NextResponse.json(validation.error.format(), { status: 400 });
  // ------------------------------------
  const issue = await prisma.issue.findUnique({ // find the equal issue by its id
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  // -------------------------------------
  const updatedIssue = await prisma.issue.update({ // if every thing was right then update the issue
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
