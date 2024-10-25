import { createContext, useContext, useState, useEffect } from "react";

export const RoleContext = createContext();

export const useRoleContext = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const userRole = sessionStorage.getItem("User-token"); // Get role from sessionStorage
    return userRole || null; // Default to null if not set
  });

  useEffect(() => {
    const userRole = sessionStorage.getItem("User-token"); // Retrieve role when component mounts
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
