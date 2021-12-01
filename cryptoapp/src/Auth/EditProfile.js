import axios from "axios";
import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const submitRegisterForm = async () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("contact", user.contact);

    const setHeader = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios.put("/editprofile", formData, setHeader);
  };

  return (
    <div>
      <form
        method="PUT"
        autoComplete="off"
        onSubmit={submitRegisterForm}
        className="mt-4"
      >
        <div className="mx-auto max-w-lg ">
          {/* <input type="file" name="myprofilePic" onChange={handleImage} /> */}

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
            value={user.contact}
            onChange={handleInputs}
            placeholder="contact number"
            className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300
                            shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-4"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 text-2xl"
        >
          SAVE Edit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
