import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export const useAuthStatus = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [checkingStatus, setcheckingStatus] = useState(true);

  const { employer } = useSelector((state) => state.auth);

  useEffect(() => {
    if (employer) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }

    setcheckingStatus(false);
  }, [employer]);

  return { loggedIn, checkingStatus };
};
