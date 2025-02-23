'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([
    { id: 1, category: "Maintenance", description: "Leaking tap in kitchen", status: "Pending" },
    { id: 2, category: "Security", description: "Main gate not closing properly", status: "In Progress" },
  ])

  const [newComplaint, setNewComplaint] = useState({ category: "", description: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    setComplaints(
      [...complaints, { id: complaints.length + 1, ...newComplaint, status: "Pending" }]
    )
    setNewComplaint({ category: "", description: "" })
  }

  return (
    (<div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800">Complaint Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Submit a New Complaint</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Cleanliness">Cleanliness</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Describe your complaint"
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              className="w-full" />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-800">Recent Complaints</h3>
        {complaints.map((complaint) => (
          <Card key={complaint.id} className="mb-4">
            <CardContent className="p-4">
              <p>
                <strong>Category:</strong> {complaint.category}
              </p>
              <p>
                <strong>Description:</strong> {complaint.description}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    complaint.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : complaint.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                  }`}>
                  {complaint.status}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>)
  );
}

