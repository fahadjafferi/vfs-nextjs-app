import { Loans } from "../components/Loans"

export default function LoansPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Loans</h1>
      <Loans />
    </div>
  )
}

