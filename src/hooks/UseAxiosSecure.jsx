import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  const auth = getAuth(); // ❌ destructuring removed
  const navigate = useNavigate();

  // REQUEST interceptor
  axiosSecure.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser; // ✅ correct way

      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`; // lowercase is safer
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // RESPONSE interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("axios interceptor error", error);

      const status = error.response?.status;

      if (status === 403) {
        navigate("/forbidden");
      } 
      else if (status === 401) {
        auth
          .signOut() // ❌ SignOut() was wrong
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
