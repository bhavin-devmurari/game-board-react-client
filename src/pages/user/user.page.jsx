import React, { useState } from "react";
import WithGetResource from "../../lib/hoc/withGetResource";
import { createResource } from "../../service/user";
import { Button, Card, Heading, Modal, Toast } from "../../components";
import UserForm from "./user.form";
import { alertType, toastPosition } from "../../config";
import "./user.styles.css";

const user = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

const User = ({ refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState("");
  const closeModal = () => setShowModal(false);

  const handleSave = async (values) => {
    const id = Object.assign(values, { id: values._id })["_id"];
    delete values["_id"];
    const res = await createResource({ id, ...values }, "users");

    if (res.error && Object.keys(res).length) {
      if (res.error && res.message) {
        setIsError(res.message);
        setShowToast(true);
      } else {
        setIsError("Something went wrong.");
        setShowToast(true);
      }
    } else {
      setIsError("");
      refetch();
      setShowToast(true);
      closeModal();
    }
  };

  let toastType = alertType.SUCCESS;
  let toastTitle = "Success";
  let toastMessage = "User added successfully.";
  let toastPos = toastPosition.BOTTOM_RIGHT;

  if (isError !== "") {
    toastType = alertType.ERROR;
    toastTitle = "Failed";
    toastMessage = isError;
    toastPos = toastPosition.TOP_RIGHT;
  }

  return (
    <>
      <div className="main-container mx-auto">
        <Card classes="m-after-nav mx-3">
          <div className="pg-head-container">
            <Heading>Users</Heading>
            <Button
              classes="btn primary-btn pg-level-btn"
              btnClick={() => setShowModal(true)}
            >
              Add User
            </Button>
          </div>
        </Card>
        {showModal && (
          <>
            <Modal closeModal={closeModal}>
              <UserForm
                onSave={handleSave}
                {...{ user }}
                closeModal={closeModal}
              />
            </Modal>
          </>
        )}
        {showToast && (
          <Toast
            type={toastType}
            position={toastPos}
            title={toastTitle}
            message={toastMessage}
            setShowToast={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};

const UserPage = WithGetResource(User, "users", "User List");
export default UserPage;
