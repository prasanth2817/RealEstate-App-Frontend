import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; 

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const token = localStorage.getItem("User-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken; // Return user data from token
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null; // No token found
  });

  useEffect(() => {
    const token = localStorage.getItem("User-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setAuthUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
