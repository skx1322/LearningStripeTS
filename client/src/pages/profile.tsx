import * as React from "react";
import type { AccountDocument, userDoc } from "../types/types";
import axios from "axios";
import { baseURL } from "../api/publicAPI";
import { userAPI } from "../api/accessAPI";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUserDoc] = React.useState<AccountDocument | null>(null);
  const navigate = useNavigate();

  const getUserDoc = async () => {
    try {
      const response = await axios.get<userDoc>(
        `${baseURL}/${userAPI.userDoc.url}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setUserDoc(response.data.output);
      } else {
        toast.error(response.data.message);
        navigate("/account");
      }
    } catch (error) {
      toast.error(`Internal server API error.`)
    }
  };

  React.useEffect(() => {
    getUserDoc();
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-primary-dark p-8 bg-secondary">
      <div className="max-w-4xl mx-auto bg-primary text-text-main p-8 rounded-md shadow-xl border border-support-gray-dark">
        <h1 className="text-3xl font-bold mb-6 border-b border-support-gray-dark pb-4">
          User Profile
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt={`${user.username}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-secondary object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-text-secondary">{user.email}</p>
            <p className="text-sm text-support-gray-dark mt-1">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-support-gray-dark">
              Last Login: {new Date(user.lastLogin).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8 border-2 border-accent-gold rounded-xl p-2">
          <h2 className="text-xl font-bold mb-4 border-b border-support-gray-dark pb-2">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-support-gray-dark-20 p-4 rounded-lg border-b-2 border-support-gray-dark">
              <span className="font-medium">Change Password</span>
              <button className="text-sm text-secondary hover:underline transition-colors duration-300">
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center bg-support-gray-dark-20 p-4 rounded-lg border-b-2 border-support-gray-dark">
              <span className="font-medium">Update Profile Information</span>
              <button className="text-sm text-secondary hover:underline transition-colors duration-300">
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center bg-support-gray-dark-20 p-4 rounded-lg border-b-2 border-support-gray-dark">
              <span className="font-medium">View Order History</span>
              <button className="text-sm text-secondary hover:underline transition-colors duration-300">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
