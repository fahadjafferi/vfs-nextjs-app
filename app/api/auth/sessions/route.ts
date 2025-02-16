import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await NextAuth.authenticate('credentials', {
      request,
      email,
      password,
    });

    if (result) {
      return NextResponse.json({
        status: 'success',
        message: 'Login successful',
        user: result.user,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        error: 'Invalid credentials',
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: 'Internal server error',
    }, { status: 500 });
  }
}
