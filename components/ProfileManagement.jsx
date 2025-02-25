"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebaseConfig"; // Import Firestore
import { auth } from "@/firebaseConfig"; // Import Firebase Authentication
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    flatNumber: "",
    role: "", // New Role field
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser; // Get logged-in user
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfile(userDoc.data()); // Load user data from Firestore
        } else {
          console.error("User profile not found.");
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: profile.name,
          phone: profile.phone,
          flatNumber: profile.flatNumber,
        });
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-800">Profile Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} className="w-full" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} disabled className="w-full bg-gray-100" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} className="w-full" />
            </div>
            <div>
              <Label htmlFor="flatNumber">Flat Number</Label>
              <Input id="flatNumber" name="flatNumber" value={profile.flatNumber} onChange={handleChange} className="w-full" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={profile.role} disabled className="w-full bg-gray-100" />
            </div>
            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
