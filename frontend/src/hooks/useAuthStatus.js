import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export const useAuthStatus = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [checkingStatus, setcheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }

    setcheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};
