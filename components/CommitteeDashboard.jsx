import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bell, Calendar, Home, MessageSquare } from "lucide-react";

export default function CommitteeDashboard() {
  const [notice, setNotice] = useState("");
  const [flatNo, setFlatNo] = useState("");
  
  const handlePostNotice = (e) => {
    e.preventDefault();
    console.log("Notice posted:", notice);
    setNotice("");
  };

  const handleGenerateBill = (e) => {
    e.preventDefault();
    console.log("Generating bill for flat:", flatNo);
    setFlatNo("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800">Committee Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: Yoga Workshop (Jun 21)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,000</div>
            <p className="text-xs text-muted-foreground">Due by: June 30, 2023</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Bell className="h-4 w-4 mr-2 text-blue-500" />
              <span>New notice: Annual General Meeting on July 15</span>
            </li>
            <li className="flex items-center">
              <Bell className="h-4 w-4 mr-2 text-green-500" />
              <span>Maintenance bill for June has been generated</span>
            </li>
            <li className="flex items-center">
              <Bell className="h-4 w-4 mr-2 text-yellow-500" />
              <span>Reminder: Yoga Workshop tomorrow at 7 AM</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostNotice}>
              <Textarea
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="Write notice here..."
                className="mb-4"
              />
              <Button type="submit" className="w-full">Post Notice</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate Maintenance Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateBill}>
              <Input
                value={flatNo}
                onChange={(e) => setFlatNo(e.target.value)}
                placeholder="Enter Flat No."
                className="mb-4"
              />
              <Button type="submit" className="w-full">Generate Bill</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600">View All Notifications</Button>
      </div>
    </div>
  );
}
