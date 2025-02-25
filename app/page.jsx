"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import ComplaintManagement from "@/components/ComplaintManagement";
import MaintenanceBills from "@/components/MaintenanceBills";
import NoticesAndEvents from "@/components/NoticesAndEvents";
import ProfileManagement from "@/components/ProfileManagement";
import Calendar from "@/components/Calendar";
import ParkingManagement from "@/components/ParkingManagement";
import Signup from "@/Pages/signUp";
import Login from "@/Pages/Login";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showSignup, setShowSignup] = useState(false); // State to toggle between login and signup

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
  };

  const handleSignup = () => {
    setIsLoggedIn(true); // Set login status to true after signup
  };

  // Render Login/Signup screen if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        {showSignup ? (
          <Signup onSignup={handleSignup} onToggle={() => setShowSignup(false)} />
        ) : (
          <Login onLogin={handleLogin} onToggle={() => setShowSignup(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center py-8 text-blue-800">
          Society Management System
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 gap-2">
              <TabsTrigger value="dashboard" className="bg-blue-100 hover:bg-blue-200">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="complaints" className="bg-red-100 hover:bg-red-200">
                Complaints
              </TabsTrigger>
              <TabsTrigger value="bills" className="bg-green-100 hover:bg-green-200">
                Bills
              </TabsTrigger>
              <TabsTrigger value="notices" className="bg-yellow-100 hover:bg-yellow-200">
                Notices & Events
              </TabsTrigger>
              <TabsTrigger value="profile" className="bg-purple-100 hover:bg-purple-200">
                Profile
              </TabsTrigger>
              <TabsTrigger value="calendar" className="bg-pink-100 hover:bg-pink-200">
                Calendar
              </TabsTrigger>
              <TabsTrigger value="parking" className="bg-indigo-100 hover:bg-indigo-200">
                Parking
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="complaints">
              <ComplaintManagement />
            </TabsContent>
            <TabsContent value="bills">
              <MaintenanceBills />
            </TabsContent>
            <TabsContent value="notices">
              <NoticesAndEvents />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileManagement />
            </TabsContent>
            <TabsContent value="calendar">
              <Calendar />
            </TabsContent>
            <TabsContent value="parking">
              <ParkingManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}