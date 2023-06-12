import Button from "react-bootstrap/Button";
import userStore from "../../stores/userStore";
import { logout } from "../../services/user.service";
import css from "./LogOut.module.scss";

const LogOut = () => {
  const logoutInStore = userStore((state) => state.logout);

  const handleLogOut = () => {
    logout();
    logoutInStore();
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="outline-yellow"
      className={css.logoutButton}
    >
      Log Out
    </Button>
  );
};

export default LogOut;
