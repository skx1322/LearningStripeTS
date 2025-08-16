import * as React from "react";
import type { APICall } from "../types/types";
import { FaDoorOpen } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../api/publicAPI";
import { userAPI } from "../api/accessAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {


  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<APICall<string>>(
        `${baseURL}/${userAPI.logout.url}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/shop");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "An unexpected error occurred."
        );
      } else {
        toast.error("Network Error: Could not connect to the server.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
        <FaDoorOpen onClick={()=>handleLogout} className="w-32 h-32"/>
    </div>  
  );
};

export default Login;
