"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type LoanDetail = {
  id: string
  loanAmount: number
  interestRate: number
  loanTerm: number
  monthlyPayment: number
  loanStatus: string
  startDate: string | null
  endDate: string | null
  outstandingBalance: number
  vin: string
  make: string
  model: string
  year: number
  mileage: number | null
  condition: string | null
  vehiclePrice: number
  downPayment: number | null
  dealerName: string | null
  dealerAddress: string | null
  dealerContact: string | null
  loanType: string | null
  insuranceProvider: string | null
  policyNumber: string | null
  coSignerName: string | null
  coSignerContact: string | null
  notes: string | null
}

export function LoanDetails({ id }: { id: string }) {
  const [loan, setLoan] = useState<LoanDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(`/api/loans/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch loan details")
        }
        const data = await response.json()
        setLoan(data)
      } catch (err) {
        setError("An error occurred while fetching loan details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoanDetails()
  }, [id])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!loan) return <div>No loan details found</div>

  return (
    <div className="space-y-6">
      {/* Loan Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Information</CardTitle>
          <CardDescription>Details about the loan terms and payments</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Loan Amount</Label>
            <p>${loan.loanAmount.toFixed(2)}</p>
          </div>
          <div>
            <Label>Interest Rate</Label>
            <p>{(loan.interestRate * 100).toFixed(2)}%</p>
          </div>
          <div>
            <Label>Loan Term</Label>
            <p>{loan.loanTerm} months</p>
          </div>
          <div>
            <Label>Monthly Payment</Label>
            <p>${loan.monthlyPayment.toFixed(2)}</p>
          </div>
          <div>
            <Label>Loan Status</Label>
            <p>{loan.loanStatus}</p>
          </div>
          <div>
            <Label>Outstanding Balance</Label>
            <p>${loan.outstandingBalance.toFixed(2)}</p>
          </div>
          <div>
            <Label>Start Date</Label>
            <p>{loan.startDate ? new Date(loan.startDate).toLocaleDateString() : "N/A"}</p>
          </div>
          <div>
            <Label>End Date</Label>
            <p>{loan.endDate ? new Date(loan.endDate).toLocaleDateString() : "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
          <CardDescription>Details about the financed vehicle</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>VIN</Label>
            <p>{loan.vin}</p>
          </div>
          <div>
            <Label>Make</Label>
            <p>{loan.make}</p>
          </div>
          <div>
            <Label>Model</Label>
            <p>{loan.model}</p>
          </div>
          <div>
            <Label>Year</Label>
            <p>{loan.year}</p>
          </div>
          <div>
            <Label>Mileage</Label>
            <p>{loan.mileage ?? "N/A"}</p>
          </div>
          <div>
            <Label>Condition</Label>
            <p>{loan.condition ?? "N/A"}</p>
          </div>
          <div>
            <Label>Vehicle Price</Label>
            <p>${loan.vehiclePrice.toFixed(2)}</p>
          </div>
          <div>
            <Label>Down Payment</Label>
            <p>{loan.downPayment ? `$${loan.downPayment.toFixed(2)}` : "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Dealer Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Dealer Information</CardTitle>
          <CardDescription>Details about the dealer</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Dealer Name</Label>
            <p>{loan.dealerName ?? "N/A"}</p>
          </div>
          <div>
            <Label>Dealer Address</Label>
            <p>{loan.dealerAddress ?? "N/A"}</p>
          </div>
          <div>
            <Label>Dealer Contact</Label>
            <p>{loan.dealerContact ?? "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Other relevant details</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Loan Type</Label>
            <p>{loan.loanType ?? "N/A"}</p>
          </div>
          <div>
            <Label>Insurance Provider</Label>
            <p>{loan.insuranceProvider ?? "N/A"}</p>
          </div>
          <div>
            <Label>Policy Number</Label>
            <p>{loan.policyNumber ?? "N/A"}</p>
          </div>
          <div>
            <Label>Co-Signer Name</Label>
            <p>{loan.coSignerName ?? "N/A"}</p>
          </div>
          <div>
            <Label>Co-Signer Contact</Label>
            <p>{loan.coSignerContact ?? "N/A"}</p>
          </div>
          <div className="col-span-2">
            <Label>Notes</Label>
            <p>{loan.notes ?? "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

