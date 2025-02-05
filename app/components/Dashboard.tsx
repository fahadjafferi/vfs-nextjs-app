import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const Dashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$24,000</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$450</div>
          <p className="text-xs text-muted-foreground">Due on the 15th</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Loan Term</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">60 months</div>
          <p className="text-xs text-muted-foreground">5 year term</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Loan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">40%</div>
          <Progress value={40} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

