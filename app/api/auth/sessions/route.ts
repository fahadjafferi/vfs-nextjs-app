import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const session = await NextAuth.session({ 
    req, 
    credentials: { 
      email, 
      password 
    },
  });

  if (session) {
    return NextResponse.json({ 
      message: "Login successful", 
      user: session.user 
    });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}