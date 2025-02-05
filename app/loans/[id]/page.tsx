import { LoanDetails } from "@/app/components/LoanDetails"

export default function LoanDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Loan Details</h1>
      <LoanDetails id={params.id} />
    </div>
  )
}

