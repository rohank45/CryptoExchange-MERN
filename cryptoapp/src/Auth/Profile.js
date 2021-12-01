import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProfilePng from "../Images/profile.png";

import NavBar from "../Components/NavBar";

const Profile = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();

  useEffect(() => {
    const openAboutPage = async () => {
      try {
        const res = await fetch("/profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        setUserData(data);
        console.log("about page data", data);

        if (!data) {
          return alert("there is no data availble plzz login");
        }
      } catch (err) {
        console.log("about auth F", err);
        alert("Login to access profile page");
        history.push("/login");
      }
    };

    openAboutPage();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="font-nunito w-3/5 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <form method="GET">
            <div className="pt-40">
              <div className="mx-5 px-5 bg-gray-50 py-10 border-2 border-gray-300 hover:border-black rounded-lg shadow-xl">
                <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
                  <div>
                    <div className="avatar online">
                      <div className="rounded-full w-24 h-24">
                        <img
                          // "http://daisyui.com/tailwind-css-component-profile-5@56w.png"
                          src={`/Images/${userData?.myprofilePic}`}
                          alt="use profile pic"
                        />
                      </div>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Full Name :
                      </label>
                      <p className="text-2xl font-medium text-gray-700">
                        {userData?.name}
                      </p>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Contact No :
                      </label>
                      <p className="text-2xl font-medium text-gray-700">
                        {userData?.contact}
                      </p>
                    </div>
                    <div className="pt-5">
                      <label className="text-lg lowercase text-gray-500">
                        Email id :
                      </label>
                      <p className="text-2xl font-medium text-gray-700">
                        {userData?.email}
                      </p>
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
