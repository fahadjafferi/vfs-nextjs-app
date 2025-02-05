// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the hashed password using the same salt rounds (10 in this case)
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword, 10); 

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Authentication successful 
    // (You would typically generate and return a JWT here)
    // For this example, we'll just return a success message
    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}