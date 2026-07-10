import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (user) => {
    if (!user) return null;
    try {
      // Try to get user from Mongo
      let res = await axios.get(`/api/users/${user.uid}`);
      setUserData(res.data);
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        // User exists in Firebase but not in Mongo (e.g. first time Google Login)
        // Auto-register them in MongoDB
        try {
          const newUser = {
            uid: user.uid,
            name: user.displayName || "New User",
            email: user.email,
            role: "user", // Default role
            profilePic: user.photoURL || ""
          };
          const registerRes = await axios.post("/api/users/register", newUser);
          setUserData(registerRes.data);
          return registerRes.data;
        } catch (regErr) {
          console.error("Auto-registration failed", regErr);
        }
      }
      setUserData(null);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData: async () => {
      if (auth.currentUser) {
        return await fetchUserData(auth.currentUser);
      }
      return null;
    },
    setUserData // Allow manual updates
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
