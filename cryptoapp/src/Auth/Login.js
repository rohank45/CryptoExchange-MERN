import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import login from "../Images/signup.png";
import NavBar from "../Components/NavBar";

const Login = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";

  const [userLogin, setUserLogin] = useState({
    email: "",
    passwords: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", userLogin);
      const data = res.data;

      if (data) {
        let expirestimeCookie = new Date();
        expirestimeCookie.setTime(expirestimeCookie.getTime() + 30 * 60 * 1000);

        cookies.set("isLogin", "true", {
          expires: expirestimeCookie,
        });

        history.push("/");
        toast.success("Login Successful!", {
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

      <div className="flex justify-center pt-32">
        <div className="font-nunito w-3/5 shadow-lg rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black">
            Login
          </div>
          <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={login} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                  <div className="w-full relative">
                    <form autoComplete="off" onSubmit={submitLoginForm}>
                      <div className="">
                        <span className="px-1 text-lg font-semibold text-gray-700">
                          Email
                        </span>
                        <input
                          type="email"
                          pattern="[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,6}$"
                          placeholder="valid email@email.com only"
                          name="email"
                          value={userLogin.email}
                          onChange={handleInputs}
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                        />

                        {/* {errors.email ? (
                          <span className="px-1 font-semibold text-red-500">
                            {errors.email}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </div>

                      <div className="my-3">
                        <span className="px-1 text-lg font-semibold text-gray-700">
                          Password
                        </span>

                        <span className="flex items-center">
                          <input
                            type={InputType}
                            minLength="8"
                            maxLength="10"
                            placeholder="password"
                            name="passwords"
                            value={userLogin.passwords}
                            onChange={handleInputs}
                            className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
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

                        {/* {errors.passwords ? (
                          <span className="px-1 font-semibold text-red-500">
                            {errors.passwords}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </div>

                      <button
                        type="submit"
                        className="mt-2 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 
                            w-full text-white rounded-lg px-6 py-2 block shadow-md mobile:mt-0 uppercase"
                      >
                        Login
                      </button>
                    </form>

                    <div className="text-gray-700 text-sm font-semibold px-2 my-6 flex flex-col justify-center items-center gap-2">
                      <Link to="/register" className="border-b border-gray-200">
                        didn't register? CLICK ME
                      </Link>
                      <Link
                        to="/sendotp"
                        className="text-red-700 border-b border-gray-200"
                      >
                        forget password?
                      </Link>
                    </div>
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

export default Login;
