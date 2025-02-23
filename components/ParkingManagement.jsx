'use client' 
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function ParkingManagement() {
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, number: "A1", occupied: true, vehicle: "MH02AB1234" }, 
    { id: 2, number: "A2", occupied: false, vehicle: "" },
    { id: 3, number: "B1", occupied: true, vehicle: "MH02CD5678" },
    { id: 4, number: "B2", occupied: false, vehicle: "" },  
  ])

  const [guestVehicle, setGuestVehicle] = useState("")

  const handleGuestParking = () => {
    const availableSpot = parkingSpots.find((spot) => !spot.occupied)
    if (availableSpot) {
      setParkingSpots(parkingSpots.map((spot) =>
        spot.id === availableSpot.id ? { ...spot, occupied: true, vehicle: guestVehicle } : spot))
      setGuestVehicle("")
    } else {
      alert("No parking spots available")
    }
  }

  return (
    (<div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-800">Parking Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Parking Spots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {parkingSpots.map((spot) => (
              <div
                key={spot.id}
                className={`p-4 rounded-lg ${spot.occupied ? "bg-red-100" : "bg-green-100"}`}>
                <p>
                  <strong>Spot:</strong> {spot.number}
                </p>
                <p>
                  <strong>Status:</strong> {spot.occupied ? "Occupied" : "Available"}
                </p>
                {spot.occupied && (
                  <p>
                    <strong>Vehicle:</strong> {spot.vehicle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Book Guest Parking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Label htmlFor="guestVehicle" className="sr-only">
              Guest Vehicle Number
            </Label>
            <Input
              id="guestVehicle"
              placeholder="Enter guest vehicle number"
              value={guestVehicle}
              onChange={(e) => setGuestVehicle(e.target.value)}
              className="flex-grow" />
            <Button
              onClick={handleGuestParking}
              className="bg-indigo-500 hover:bg-indigo-600">
              Book
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

