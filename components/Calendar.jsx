'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Calendar() {
  const [events, setEvents] = useState([
    { id: 1, title: "Annual General Meeting", date: "2023-07-15" },
    { id: 2, title: "Diwali Celebration", date: "2023-11-12" },
    { id: 3, title: "Yoga Workshop", date: "2023-06-21" },
    { id: 4, title: "Children's Day Event", date: "2023-11-14" },
  ])

  // This is a simplified calendar view. In a real application, you'd want to use a proper calendar library.
  return (
    (<div className="space-y-6">
      <h2 className="text-2xl font-semibold text-pink-800">Society Calendar</h2>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold text-pink-800">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="border p-2 h-24 bg-pink-50">
                <div className="font-bold text-pink-800">{day}</div>
                {events
                  .filter((event) => new Date(event.date).getDate() === day)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="text-xs bg-pink-200 p-1 mt-1 rounded text-pink-800">
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

