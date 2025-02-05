import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const loan = await prisma.loan.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 })
    }

    // Ensure numeric fields are numbers or null
    const processedLoan = {
      ...loan,
      loanAmount: loan.loanAmount != null ? Number(loan.loanAmount) : null,
      interestRate: loan.interestRate != null ? Number(loan.interestRate) : null,
      loanTerm: loan.loanTerm != null ? Number(loan.loanTerm) : null,
      monthlyPayment: loan.monthlyPayment != null ? Number(loan.monthlyPayment) : null,
      outstandingBalance: loan.outstandingBalance != null ? Number(loan.outstandingBalance) : null,
      year: loan.year != null ? Number(loan.year) : null,
      mileage: loan.mileage != null ? Number(loan.mileage) : null,
      vehiclePrice: loan.vehiclePrice != null ? Number(loan.vehiclePrice) : null,
      downPayment: loan.downPayment != null ? Number(loan.downPayment) : null,
    }

    return NextResponse.json(processedLoan)
  } catch (error) {
    console.error("Error fetching loan:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

