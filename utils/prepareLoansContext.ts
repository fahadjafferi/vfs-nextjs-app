import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function prepareLoansContext(): Promise<string> {
  const loans = await prisma.loan.findMany()

  const loansContext = loans
    .map(
      (loan) => `
Loan ID: ${loan.id}
Amount: $${loan.loanAmount}
Interest Rate: ${(loan.interestRate * 100).toFixed(2)}%
Term: ${loan.loanTerm} months
Monthly Payment: $${loan.monthlyPayment.toFixed(2)}
Status: ${loan.loanStatus}
Start Date: ${loan.startDate ? new Date(loan.startDate).toLocaleDateString() : "N/A"}
End Date: ${loan.endDate ? new Date(loan.endDate).toLocaleDateString() : "N/A"}
Outstanding Balance: $${loan.outstandingBalance.toFixed(2)}
Vehicle: ${loan.year} ${loan.make} ${loan.model}
  `,
    )
    .join("\n\n")

  return `Here's a summary of all current loans in the system:\n\n${loansContext}`
}

