import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

const navItems = [
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Daily",
    path: "/",
  },
];
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-end gap-5 pr-5 pt-2 bg-ocean-04">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div className="flex flex-col">
            <button
              onClick={() => navigate(item.path)}
              className={classNames(
                "text-ocean-01 hover:text-ocean-02 transition-all",
                { "": isActive }
              )}
            >
              {item.label}
            </button>
            <span
              className={classNames(
                "border border-accent-01 transition-all duration-300",
                {
                  hidden: !isActive,
                }
              )}
            ></span>
          </div>
        );
      })}
    </div>
  );
}

export default Navbar;
