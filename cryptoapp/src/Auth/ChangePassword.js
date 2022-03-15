import React, { useState } from "react";
import newPass from "../Images/New campaign_Outline.png";
import NavBar from "../Components/NavBar";
import { useHistory } from "react-router";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";

  const [state, setstate] = useState({
    oldPasswords: "",
    newPasswords: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const { oldPasswords, newPasswords } = state;

      if (!oldPasswords || !newPasswords) {
        toast.error("All fields are mandatory!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      if (oldPasswords === newPasswords) {
        toast.warning("Old password and New password should not be the same!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      const data = await axios.post("/change/password", state);

      if (data) {
        history.push("/profile");
        toast.success("Password Changed Successfully!", {
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
        <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black mobile:text-2xl">
            Reset Password form
          </div>
          <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={newPass} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                  <div className="w-full relative">
                    <form autoComplete="off" onSubmit={changePassword}>
                      <div className="py-1">
                        <p className="text-sm text-red-700 font-nunito">
                          at least 1 (Uppercase, Lowercase, Number, Symbol)
                        </p>
                        <span className="flex items-center">
                          <input
                            type={InputType}
                            name="oldPasswords"
                            value={state.oldPasswords}
                            onChange={handleInputs}
                            placeholder="Old password"
                            minLength="8"
                            maxLength="10"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
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

                        <span className="flex items-center">
                          <input
                            type={InputType}
                            name="newPasswords"
                            value={state.newPasswords}
                            onChange={handleInputs}
                            placeholder="New password"
                            minLength="8"
                            maxLength="10"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
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

                        <button
                          type="submit"
                          className="mt-3 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 
                            w-full text-white rounded-lg px-6 py-3 block shadow-xl mobile:py-2 mobile:mt-0"
                        >
                          Change Password
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

export default ChangePassword;
