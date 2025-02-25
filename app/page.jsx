"use client";
import { useState, useEffect } from "react";
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
import CommitteeDashboard from "@/components/CommitteeDashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for stored role on component mount
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleSignup = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

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

  return userRole === "committee_member" ? <CommitteeDashboard /> : <Dashboard />;
}