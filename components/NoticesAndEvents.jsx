'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NoticesAndEvents() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Annual General Meeting",
      date: "2023-07-15",
      description: "Annual meeting for all society members",
    },
    { id: 2, title: "Diwali Celebration", date: "2023-11-12", description: "Society-wide Diwali celebration" },
  ])

  const [events, setEvents] = useState([
    { id: 1, title: "Yoga Workshop", date: "2023-06-21", description: "Free yoga workshop for all members" },
    { id: 2, title: "Children's Day Event", date: "2023-11-14", description: "Fun activities planned for children" },
  ])

  return (
    (<div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Notices</h2>
        {notices.map((notice) => (
          <Card key={notice.id} className="mb-4 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">{notice.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Date:</strong> {notice.date}
              </p>
              <p>{notice.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Upcoming Events</h2>
        {events.map((event) => (
          <Card key={event.id} className="mb-4 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>{event.description}</p>
              <Button className="mt-2 bg-yellow-500 hover:bg-yellow-600">RSVP</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>)
  );
}

