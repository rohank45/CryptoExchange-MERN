import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signImg from "../Images/signup.png";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";

  const [verify, setVerify] = useState();

  const verifyCallback = (checkCaptcha) => {
    if (!checkCaptcha || checkCaptcha.trim().length === 0) {
      return toast.error("Captcha is required!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    passwords: "",
    cpasswords: "",
    profilePic: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImage = (e) => {
    setUser({ ...user, profilePic: e.target.files[0] });
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();

    const { fullName, email, contactNo, passwords, cpasswords } = user;

    if (!fullName || !email || !contactNo || !passwords || !cpasswords) {
      return toast.error("All fields are mandatory!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    if (passwords !== cpasswords) {
      return toast.error("Password and Confirm Password are not matching!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    try {
      const formData = new FormData();

      formData.append("profilePic", user.profilePic);
      formData.append("fullName", user.fullName);
      formData.append("email", user.email);
      formData.append("contactNo", user.contactNo);
      formData.append("passwords", user.passwords);
      formData.append("cpasswords", user.cpasswords);

      const setHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/register", formData, setHeader);
      const data = res.data;

      if (data) {
        history.push("/login");
        return toast.success("Registration Successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center pt-32 pb-20">
        <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black mobile:text-3xl">
            Registration form
          </div>
          <div className="flex items-center justify-center">
            <div className="mobile:hidden tablet:hidden">
              <img src={signImg} alt="register svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                  <div className="w-full relative">
                    <form
                      autoComplete="off"
                      onSubmit={submitRegisterForm}
                      className="mt-4"
                    >
                      <div className="mx-auto max-w-lg ">
                        <input
                          type="file"
                          name="profilePic"
                          onChange={handleImage}
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <input
                          type="text"
                          minLength="2"
                          maxLength="20"
                          pattern="[a-zA-Z]+([ ]?[a-zA-Z]+)*"
                          name="fullName"
                          value={user.fullName}
                          onChange={handleInputs}
                          placeholder="name"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputs}
                          pattern="[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,6}$"
                          placeholder="valid email@email.com only"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        {/* starting with 9,8,7 international but indian numbers allowed */}

                        <input
                          type="tel"
                          minLength="10"
                          maxLength="10"
                          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
                          name="contactNo"
                          value={user.contactNo}
                          onChange={handleInputs}
                          placeholder="valid contact number only"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <p className="text-sm text-red-700 font-nunito">
                          at least 1 (Uppercase, Lowercase, Number, Symbol)
                        </p>
                        <span className="flex items-center">
                          <input
                            type={InputType}
                            minLength="8"
                            maxLength="12"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                            name="passwords"
                            value={user.passwords}
                            onChange={handleInputs}
                            placeholder="password (8 characters minimum)"
                            className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                              shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                          />
                          <span
                            className="text-2xl cursor-pointer -ml-8"
                            onClick={() =>
                              setVisible((visibilty) => !visibilty)
                            }
                          >
                            {visible ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </span>
                        </span>

                        <input
                          type="password"
                          minLength="8"
                          maxLength="12"
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                          name="cpasswords"
                          value={user.cpasswords}
                          onChange={handleInputs}
                          placeholder="Confirm password"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <ReCAPTCHA
                          sitekey="6LcVynwdAAAAADJFSapf-lAHI7QyiG1RA4bLSDly"
                          type="image"
                          verifyCallback={verifyCallback}
                        />

                        <div className="flex flex-col justify-start">
                          <label className="text-gray-500 font-bold my-4 flex flex-col">
                            <p>
                              {!verify ? (
                                <span className="text-red-600 text-xs">
                                  *checkbox is not selected
                                </span>
                              ) : null}
                            </p>
                            <div className="flex items-center justify-center">
                              <input
                                className="leading-loose text-pink-600 top-0 cursor-pointer"
                                type="checkbox"
                                onChange={(e) => {
                                  setVerify(e.target.value);
                                }}
                              />

                              <span className="ml-8 text-center text-sm py-2 text-gray-500 mobile:text-xs mobile:font-thin">
                                Accept the
                                <p className="font-semibold text-gray-500 border-b-2 border-gray-200 hover:border-gray-500">
                                  / Terms and Conditions of the site
                                </p>
                                <p className="font-semibold text-gray-500 border-b-2 border-gray-200 hover:border-gray-500">
                                  the information data policy. /
                                </p>
                              </span>
                            </div>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="mt-3 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 
                            w-full text-white rounded-lg px-6 py-3 block shadow-xl mobile:py-2 mobile:mt-0"
                        >
                          Register
                        </button>
                      </div>
                    </form>

                    <span className="text-black flex items-center justify-center font-medium px-2 my-6 border-b border-gray-200 mobile:font-thin">
                      <Link to="/login">You're already registered ? Login</Link>
                    </span>
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

export default Register;
