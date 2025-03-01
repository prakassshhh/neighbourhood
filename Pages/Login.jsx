import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useRouter } from 'next/navigation';

export default function Login({ onLogin, onToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User not found. Please sign up.");
        onToggle();
        return;
      }

      const userData = userDoc.data();
      onLogin(userData.role);

      // Store user role in localStorage for persistence
      localStorage.setItem('userRole', userData.role);
      
      // Navigate based on role
      if (userData.role === "committee_member") {
        window.location.href = "/committee-dashboard";
      } else {
        window.location.href = "/resident-dashboard";
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Login</h2>
      {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}