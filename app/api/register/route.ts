import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

// this post-resquet is for sign up the user (register)
export async function POST(request: NextRequest) {
  // post the new user email and password in the database
  try {
    const body = await request.json(); // so get the body of request from the system

    const validation = schema.safeParse(body); // validate the body(email and password) given by new user with zod

    if (!validation.success) {
      // if the validation was not succsses the return a 400 error
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // check if the new user email (in body) is in the database by prisma-findUnique-mathod
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      // so if the user exist, it means that the new user-email is allready in the data base
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
  

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      // set these new datas in the user-table
      data: {
        name: body.name,
        email: body.email,
        hashedPassword,
      },
      
    });

    return NextResponse.json({ email: newUser.email });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
