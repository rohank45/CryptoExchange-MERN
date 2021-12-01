import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signImg from "../Images/signup.png";
import NavBar from "../Components/NavBar";

const Register = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const [verify, setVerify] = useState();
  const [captchaVerify, setCaptchaVerify] = useState();

  const InputType = visible ? "text" : "password";

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    passwords: "",
    cpasswords: "",
    myprofilePic: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setUser({ ...user, myprofilePic: e.target.files[0] });
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    const { name, email, contact, passwords, cpasswords } = user;

    if (!name || !email || !contact || !passwords || !cpasswords) {
      return alert("please fill the data!");
    }

    if (passwords !== cpasswords) {
      return alert("password and confirm password are not matching");
    }

    const formData = new FormData();

    formData.append("myprofilePic", user.myprofilePic);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("contact", user.contact);
    formData.append("passwords", user.passwords);
    formData.append("cpasswords", user.cpasswords);

    try {
      // const res = await fetch("/register", formData, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: JSON.stringify({ email, passwords }),
      // });
      // const data = res.json();

      const setHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/register", formData, setHeader);

      const data = res.data;

      if (data) {
        history.push("/login");
        alert("register Successfully!");
      } else {
        return alert("something went wrong server error");
      }
    } catch (err) {
      console.log("reg f err" + err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center pt-32">
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
                      method="POST"
                      autoComplete="off"
                      onSubmit={submitRegisterForm}
                      className="mt-4"
                    >
                      <div className="mx-auto max-w-lg ">
                        <input
                          type="file"
                          name="myprofilePic"
                          onChange={handleImage}
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <input
                          type="text"
                          name="name"
                          minLength="2"
                          maxLength="20"
                          value={user.name}
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
                          placeholder="email@email.com"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <input
                          type="tel"
                          name="contact"
                          minLength="10"
                          maxLength="10"
                          pattern="[0-9]"
                          value={user.contact}
                          onChange={handleInputs}
                          placeholder="contact number"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        {/* <span className="text-red-600 text-xs font-bold">
                          *please provide a difficult password
                        </span> */}
                        <span className="flex items-center">
                          <input
                            type={InputType}
                            name="passwords"
                            minLength="8"
                            maxLength="10"
                            value={user.passwords}
                            onChange={handleInputs}
                            placeholder="password"
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
                          name="cpasswords"
                          minLength="8"
                          maxLength="10"
                          value={user.cpasswords}
                          onChange={handleInputs}
                          placeholder="Confirm password"
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />

                        <ReCAPTCHA
                          // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          sitekey="6Ld5uQkdAAAAALIYFBt8B0aVz58aB-ZSmz8Ao9Kg"
                          type="image"
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
