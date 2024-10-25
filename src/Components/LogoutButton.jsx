import { ImExit } from "react-icons/im";
import useLogout from "../Hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto flex justify-center items-center rounded-full ">
      {!loading ? (
          <button
            type="submit"
            className="btn text-slate-600"
          >
            <ImExit 
              className="w-4 h-4 sm:w-5 sm:h-5 outline-none"
              onClick={logout}
            />
          </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;