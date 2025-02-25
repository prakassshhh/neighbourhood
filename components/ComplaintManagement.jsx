"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebaseConfig"; // Import Firebase auth

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ category: "", description: "" });
  const [userName, setUserName] = useState(""); // Store current user's name

  // Fetch the current logged-in user's name
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Fetch from users collection
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set user's name
        } else {
          console.error("User document not found");
        }
      }
    };

    fetchUserName();
  }, []);

  // Fetch complaints from Firestore on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "complaints"));
        const complaintsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComplaints(complaintsData);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Handle complaint submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "complaints"), {
        name: userName, // Store the user's name
        category: newComplaint.category,
        description: newComplaint.description,
        status: "Pending",
        timestamp: new Date(), // Add timestamp for sorting
      });

      setNewComplaint({ category: "", description: "" });

      // Refresh complaints after adding a new one
      const querySnapshot = await getDocs(collection(db, "complaints"));
      const complaintsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComplaints(complaintsData);
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800">Complaint Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Submit a New Complaint</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p><strong>User:</strong> {userName || "Loading..."}</p> {/* Display user name */}
            <Select onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}>
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
              className="w-full"
            />
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
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    complaint.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : complaint.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                  }`}
                >
                  {complaint.status}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
