import { useAuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { RoleContext } from "../Contexts/RoleContext";
import LogoutButton from "./LogoutButton";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const { role } = useContext(RoleContext);


  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev);
  // };

  return (
    <header className="bg-slate-200 shadow-2xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-1.5 h-16">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">My </span>
            <span className="text-slate-500">&nbsp;</span>
            <span className="text-slate-700">Estates.com</span>
          </h1>
        </Link>

        <div className="flex items-center justify-center gap-3">
          {authUser ? (
            <>
                <h1 className="text-slate-500 text-sm sm:text-base font-bold">
                  Welcome,{" "}
                  <span className="text-slate-700">{authUser.userName}</span>
                </h1>
                <FaUserCircle
                size={32}
                className="text-slate-700 cursor-pointer"
              />
                <LogoutButton />
            </>
          ) : (
            <Link to="/login">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </div> 

        {/* <div className="relative">
          {authUser ? (
            <div className="flex items-center gap-4">
             
              <FaUserCircle
                size={32}
                className="text-slate-700 cursor-pointer"
                onClick={toggleDropdown}
              />
              <LogoutButton />
             
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-200"></div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
