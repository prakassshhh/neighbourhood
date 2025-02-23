'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MaintenanceBills() {
  const [bills, setBills] = useState([
    { id: 1, month: "January 2023", amount: 1000, status: "Paid" },
    { id: 2, month: "February 2023", amount: 1000, status: "Unpaid" },
  ])

  const handlePayment = (id) => {
    setBills(bills.map((bill) => (bill.id === id ? { ...bill, status: "Paid" } : bill)))
  }

  return (
    (<div className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-800">Maintenance Bills</h2>
      {bills.map((bill) => (
        <Card key={bill.id} className="mb-4">
          <CardHeader>
            <CardTitle>{bill.month}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">₹{bill.amount}</p>
              <p
                className={`text-sm ${bill.status === "Paid" ? "text-green-600" : "text-red-600"}`}>{bill.status}</p>
            </div>
            {bill.status === "Unpaid" && (
              <Button
                onClick={() => handlePayment(bill.id)}
                className="bg-green-500 hover:bg-green-600">
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>)
  );
}

