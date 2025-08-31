'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ user, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
