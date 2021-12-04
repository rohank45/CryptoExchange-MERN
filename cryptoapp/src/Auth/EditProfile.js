import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ProfilePng from "../Images/profile.png";
import NavBar from "../Components/NavBar";

const EditProfile = () => {
  const [user, setUser] = useState({
    profilePic: "",
    name: "",
    email: "",
    contactNo: "",
  });

  const [userData, setUserData] = useState();
  const history = useHistory();

  const openAboutPage = async () => {
    try {
      const res = await axios.get("/profile");

      const data = await res.data;
      setUserData(data);
    } catch (err) {
      history.push("/login");
      return alert("Login to access profile page");
    }
  };

  useEffect(() => {
    openAboutPage();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImage = (e) => {
    setUser({ ...user, profilePic: e.target.files[0] });
  };

  const submitEditProfileDetails = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("profilePic", user.profilePic);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("contactNo", user.contactNo);

      const setHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/edit/profile", formData, setHeader);
      const data = res.data;

      if (data) {
        history.push("/profile");
        return alert("Profile details updated Successfully!");
      } else {
        history.push("/");
        return alert("Something went wrong try later!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center">
        <div className="font-nunito w-3/5 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <form autoComplete="off" onSubmit={submitEditProfileDetails}>
            <div className="pt-40 pb-20">
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
                    <input
                      type="file"
                      name="myprofilePic"
                      onChange={handleImage}
                    />

                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Full Name :
                      </label>
                      <input
                        type="text"
                        minLength="2"
                        maxLength="20"
                        name="name"
                        value={userData?.userProfile.name}
                        onChange={handleInputs}
                        placeholder="name"
                        className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                      />
                    </div>

                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Contact No :
                      </label>
                      <input
                        type="tel"
                        minLength="10"
                        maxLength="10"
                        name="contactNo"
                        value={userData?.userProfile.contactNo}
                        onChange={handleInputs}
                        placeholder="contact number"
                        className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                      />
                    </div>

                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Email id :
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData?.userProfile.email}
                        onChange={handleInputs}
                        placeholder="email@email.com"
                        className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-4 py-2 text-2xl my-5"
                    >
                      Save Edit
                    </button>
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

export default EditProfile;
