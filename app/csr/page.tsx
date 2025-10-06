"use client";

import { useState, useEffect } from "react";
import { User } from "@/types";

export default function CSRPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUser({
        id: "1",
        name: "Client Side User",
        email: "client@example.com",
        avatar: "https://i.pravatar.cc/150?img=3"
      });
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🎯 Client-Side Rendering (CSR)</h1>
      <p>This page renders on the client after initial load.</p>
      
      <div className="card">
        <h2>User Profile (Loaded via CSR)</h2>
        {user && (
          <div>
            <img 
              src={user.avatar} 
              alt={user.name}
              style={{ borderRadius: "50%", width: "80px", height: "80px" }}
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Interactive Counter (Client Only)</h3>
        <p>Count: {count}</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ padding: "0.5rem 1rem", background: "#007acc", color: "white", border: "none", borderRadius: "4px" }}
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            style={{ padding: "0.5rem 1rem", background: "#ff4444", color: "white", border: "none", borderRadius: "4px" }}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
