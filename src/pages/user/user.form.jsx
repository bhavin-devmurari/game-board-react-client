import React, { useState } from "react";
import { Button, Heading, InputWrapper } from "../../components";

const UserForm = ({
  onSave,
  data = {},
  closeModal,
  formTitle = "Add User",
}) => {
  const [userData, setUserData] = useState(data);
  const [errors, setErrors] = useState({});
  const { firstName, lastName, userName, email } = userData;

  const validateData = () => {
    let errors = {};

    if (!firstName) errors.firstName = "First name is required.";
    if (!userName) errors.userName = "User name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email))
      errors.email = "Email is not valid.";

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});
    onSave(userData);
  };
  return (
    <>
      <Heading addonClass="mt-2">{formTitle}</Heading>
      <div className="form">
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="form-input"
            placeholder="first name"
            aria-label="first name"
          />
          <div style={{ color: "white" }}>{errors.firstName}</div>
        </div>
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="form-input"
            placeholder="last name"
            aria-label="last name"
          />
        </div>
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            className="form-input"
            placeholder="user name"
            aria-label="user name"
          />
          <div style={{ color: "white" }}>{errors.userName}</div>
        </div>
        <div className="form-item input-wrapper">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-input"
            placeholder="email"
            aria-label="email"
          />
          <div style={{ color: "white" }}>{errors.email}</div>
        </div>
      </div>
      <InputWrapper>
        <Button classes="btn primary-btn" btnClick={handleSave}>
          Save
        </Button>
      </InputWrapper>
      <InputWrapper>
        <Button classes="btn secondary-btn" btnClick={closeModal}>
          Cancel
        </Button>
      </InputWrapper>
    </>
  );
};
export default UserForm;
