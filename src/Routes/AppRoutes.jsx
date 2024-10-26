import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Contexts/AuthContext";
import Home from "../Components/Home";
import Login from "../UserPages/LoginPage";
import RoleSelection from "../UserPages/RoleSelection";
import SignUp from "../UserPages/CreateUser";
import ForgotPassword from "../UserPages/ForgetPassword";
import ResetPassword from "../UserPages/ResetPassword";
import CreateProperty from "../Components/CreateProperty";
import EditProperty from "../Components/EditProperty";
import PropertyListings from "../UserComponents/PropertyListings";
import SearchedResults from "../Components/SearchedResults";
import PropertyDetails from "../UserComponents/PropertyDetails";
import Header from "../Components/Header";
import AllPropertyListing from "../UserComponents/AllProperties";

function AppRoutes() {
  const { authUser } = useAuthContext();
  const location = useLocation();
  return (
    <>
    {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/results" element={<SearchedResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/listings" element={<PropertyListings />} />
        <Route path="/allProperties" element={<AllPropertyListing />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/edit/:id" element={<EditProperty />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default AppRoutes;
