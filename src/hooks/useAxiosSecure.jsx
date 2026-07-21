import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // set token in the header for all API call using axios secure hook
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token") || user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log("error inside the current interceptor", err);
        const status = err.status;
        if (status === 401 || status == 403) {
          console.log("log out the user for bad request");
          signOutUser()
          .then(() => {
            // navigate user to the login page
            navigate('/register');
          })
        }
        return Promise.reject(err);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};
export default useAxiosSecure;
