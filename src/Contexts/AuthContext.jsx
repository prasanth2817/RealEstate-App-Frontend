import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; 

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const token = localStorage.getItem("User-token"); // Fetch token from localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode token
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
        console.log(decodedToken);
        setAuthUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setAuthUser(null);
      }
    }
  }, []); // Run when component mounts or token changes

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
