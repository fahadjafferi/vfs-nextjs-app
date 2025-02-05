import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const loans = await prisma.loan.findMany()
    return NextResponse.json(loans)
  } catch (error) {
    console.error("Error fetching loans:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}


