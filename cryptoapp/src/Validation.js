import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Validation = () => {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({
    userId: null,
  });

  const validate = () => {
    return new Promise(async (resolve, reject) => {
      let errors = {
        userId: null,
      };

      let bool = true;

      if (!userId) {
        errors.userId = `user is required`;
      }

      setErrors(errors);
      resolve(bool);
    });
  };

  const Error = ({ error }) => {
    return error && <span className="text-red-500">{error}</span>;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    validate().then((isValid) => {
      if (isValid === true) {
        history.push("/");
      }
    });
  };

  return (
    <form onSubmit={formSubmit}>
      <div>
        <label className="font-bold md:text-base">User</label>
        <select
          placeholder="Select User"
          inputClassName="w-full"
          size="large"
          value={userId}
          onChange={(e) => {
            setUserId(e);
          }}
        />

        <Error error={errors.userId} />
      </div>

      <button type="submit">save</button>
    </form>
  );
};

export default Validation;
