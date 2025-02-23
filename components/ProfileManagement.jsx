'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    flatNumber: "A-101",
  })

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated profile to a server
    console.log("Profile updated:", profile)
  }

  return (
    (<div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-800">Profile Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full" />
            </div>
            <div>
              <Label htmlFor="flatNumber">Flat Number</Label>
              <Input
                id="flatNumber"
                name="flatNumber"
                value={profile.flatNumber}
                onChange={handleChange}
                className="w-full" />
            </div>
            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}

