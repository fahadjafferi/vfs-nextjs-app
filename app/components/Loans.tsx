"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Loan = {
  id: string
  loanAmount: number | null
  interestRate: number | null
  loanTerm: number | null
  monthlyPayment: number | null
  loanStatus: string
  startDate: string | null
  make: string
  model: string
  year: number | null
}

export function Loans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("/api/loans")
        if (!response.ok) {
          throw new Error("Failed to fetch loans")
        }
        const data = await response.json()
        setLoans(data)
      } catch (err) {
        setError("An error occurred while fetching loans")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoans()
  }, [])

  const handleRowClick = (id: string) => {
    router.push(`/loans/${id}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Table>
      <TableCaption>A list of your current loans.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Loan Amount</TableHead>
          <TableHead>Interest Rate</TableHead>
          <TableHead>Term (months)</TableHead>
          <TableHead>Monthly Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Vehicle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id} onClick={() => handleRowClick(loan.id)} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{loan.loanAmount ? `$${loan.loanAmount.toFixed(2)}` : "N/A"}</TableCell>
            <TableCell>{loan.interestRate ? `${(loan.interestRate * 100).toFixed(2)}%` : "N/A"}</TableCell>
            <TableCell>{loan.loanTerm ?? "N/A"}</TableCell>
            <TableCell>{loan.monthlyPayment ? `$${loan.monthlyPayment.toFixed(2)}` : "N/A"}</TableCell>
            <TableCell>{loan.loanStatus}</TableCell>
            <TableCell>{loan.startDate ? new Date(loan.startDate).toLocaleDateString() : "N/A"}</TableCell>
            <TableCell>
              {loan.year && loan.make && loan.model ? `${loan.year} ${loan.make} ${loan.model}` : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

