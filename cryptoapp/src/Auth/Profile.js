import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ProfilePng from "../Images/profile.png";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();

  const getUserData = async () => {
    try {
      const res = await axios.get("/profile");
      const data = await res.data;
      setUserData(data);
    } catch (err) {
      history.push("/login");
      toast.warning("Login to access profile page!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <NavBar />

      <div className="flex justify-center">
        <div className="font-nunito w-3/5 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full mobile:px-0">
          <form method="GET">
            <div className="pt-32 pb-20 mobile:pt-24 mobile:pb-10">
              <div className="mx-5 px-5 bg-gray-50 py-10 border-2 border-gray-300 hover:border-black rounded-lg shadow-xl">
                <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
                  <div>
                    <div className="avatar online">
                      <div className="rounded-full w-24 h-24">
                        <img
                          src={userData?.userProfile.profilePic.secure_url}
                          alt="use profile pic"
                        />
                      </div>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Full Name :
                      </label>
                      <p className="text-xl font-medium text-gray-700">
                        {userData?.userProfile.fullName}
                      </p>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Contact No :
                      </label>
                      <p className="text-xl font-medium text-gray-700">
                        {userData?.userProfile.contactNo}
                      </p>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Email id :
                      </label>
                      <p className="text-xl font-medium text-gray-700">
                        {userData?.userProfile.email}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <button
                        className="bg-gray-600 text-white font-nunito font-semibold p-2 text-xl rounded-md shadow-xl mt-10 
                          mobile:text-lg mobile:py-2 w-48 mobile:w-full"
                      >
                        <Link to="/editprofile">Edit Profile</Link>
                      </button>

                      <button
                        className="bg-indigo-600 text-white font-nunito font-semibold p-2 text-lg rounded-md shadow-xl mt-10 
                          mobile:text-base mobile:py-2 w-48 mobile:w-full"
                      >
                        <Link to="/changepass">Change Password</Link>
                      </button>

                      <button
                        className="bg-red-600 text-white font-nunito font-semibold p-2 text-lg rounded-md shadow-xl mt-10 
                          mobile:text-base mobile:py-2 w-48 mobile:w-full"
                      >
                        <Link to="/deleteprofile">Delete Account</Link>
                      </button>
                    </div>
                  </div>

                  <div
                    className="mobile:hidden tablet:hidden"
                    style={{ width: "600px" }}
                  >
                    <img src={ProfilePng} alt="login svg" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
