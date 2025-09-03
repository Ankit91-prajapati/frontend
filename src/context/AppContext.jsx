import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ensure cookies are sent with every request
  axios.defaults.withCredentials = true;

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Auth check failed");
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      getUserData();
    }
  }, [isLoggedin]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
