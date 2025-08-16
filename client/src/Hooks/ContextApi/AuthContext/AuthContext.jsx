import { useEffect } from "react";
import { useState } from "react";
import { me } from "../../../api/authApi";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then((res) => {
        // console.log(res.data.data.user);
        
        setUser(res.data.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  },[]);

  return (
    <AuthContext.Provider value={{user, setUser, loading}}>
        {children}
    </AuthContext.Provider>
  )
};
