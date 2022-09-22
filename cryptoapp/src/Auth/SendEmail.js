import React, { useState } from "react";
import login from "../Images/signup.png";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const SendEmail = () => {
  const history = useHistory();
  const [getEmail, setEmail] = useState({
    email: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setEmail({ ...getEmail, [name]: value });
  };

  const sendOtpMail = async (e) => {
    e.preventDefault();

    try {
      const { email } = getEmail;
      if (!email) {
        toast.error("Please provide a email!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      const res = await axios.post("/forgot/password", getEmail);
      const data = res.data;

      if (data) {
        history.push("/login");
        toast.success("Password reset link sended, check your email!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center pt-40">
        <div
          className="font-nunito w-3/5 shadow-lg rounded-lg border-2 border-gray-200 
            py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full"
        >
          <div className="text-center font-bold text-4xl pt-5 uppercase text-black mobile:text-3xl">
            Send email
          </div>
          <div className="flex items-center justify-around px-10 py-8 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={login} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                  <div className="w-full relative">
                    <form autoComplete="off" onSubmit={sendOtpMail}>
                      <div className="py-1">
                        <span className="px-1 text-lg font-semibold text-gray-700">
                          Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={getEmail.email}
                          onChange={handleInputs}
                          pattern="[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,6}$"
                          placeholder="valid email@email.com only"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <button
                          type="submit"
                          className="mt-3 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 
                            w-full text-white rounded-lg px-6 py-2 block shadow-md mobile:mt-0 uppercase"
                        >
                          send email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
