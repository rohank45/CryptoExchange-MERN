import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import login from "../Images/signup.png";
import { FcGoogle } from "react-icons/fc";
import NavBar from "../Components/NavBar";
import { UserContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState("");
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const submitLoginForm = async (e) => {
    e.preventDefault();

    if (!email || !passwords) {
      return alert("please fill the data!");
    }

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, passwords }),
    });

    const data = res.json();

    if (!data) {
      history.push("/login");
      return alert("login failed! try again.");
    } else {
      dispatch({ type: "User", payload: true });
      history.push("/");
      return alert("login successful");
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center pt-32">
        <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black">
            Login form
          </div>
          <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={login} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                  <div className="w-full relative">
                    <form
                      method="POST"
                      autoComplete="off"
                      onSubmit={submitLoginForm}
                    >
                      <div className="py-1">
                        <span className="px-1 text-lg font-semibold text-gray-700">
                          Email
                        </span>
                        <input
                          type="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />
                      </div>
                      <div className="py-1">
                        <span className="px-1 text-lg font-semibold text-gray-700">
                          Password
                        </span>
                        <input
                          type="password"
                          placeholder="password (8 characters minimum)"
                          value={passwords}
                          minLength="8"
                          maxLength="10"
                          onChange={(e) => setPasswords(e.target.value)}
                          className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-3 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 
                            w-full text-white rounded-lg px-6 py-3 block shadow-xl mobile:py-2 mobile:mt-0"
                      >
                        Login
                      </button>
                    </form>

                    <div className="text-gray-700 text-sm font-semibold px-2 my-6 flex flex-col justify-center items-center gap-2">
                      <Link to="/register" className="border-b border-gray-200">
                        didn't registered yet ? Register
                      </Link>
                      <Link
                        to="/sendotp"
                        className="text-red-700 border-b border-gray-200"
                      >
                        forget password ?
                      </Link>
                    </div>

                    <div
                      className="bg-white text-black hover:bg-black hover:text-white shadow py-3 px-5 rounded cursor-pointer 
                        flex justify-start items-center border border-black font-bold font-nunito w-full"
                    >
                      <span className="mr-3 text-3xl">
                        <FcGoogle />
                      </span>

                      <span className="border-l border-gray-50 h-6 w-1 block"></span>
                      <span className="pl-3">Sign up with Google</span>
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
