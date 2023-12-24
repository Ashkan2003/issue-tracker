import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// this api is for getting all of the users in database
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } }); // get all the users(the sniguped accounts) from db by prisma
  return NextResponse.json(users); //the users is an aaray of obj of the sign uped accounts// return all the users in the NextResponse
}
