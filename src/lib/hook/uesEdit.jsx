import React, { useState } from "react";
import { useQuery } from "react-query";
import { Loader, Modal, Toast } from "../../components";
import { alertType, toastPosition } from "../../config";
import GameForm from "../../pages/game/game.form";
import UserForm from "../../pages/user/user.form";
import { getResourceById, editResource } from "../../service/user";

const UseEdit = ({ resourceName, editId, closeModal, fetchData }) => {
  const [showToast, setShowToast] = useState(false);
  const [isBckError, setIsBckError] = useState("");
  const { isLoading, isError, error, data, refetch } = useQuery(
    [`edit-${resourceName}`, editId],
    () => getResourceById(editId, resourceName),
    { keepPreviousData: true }
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <>
        <h3>Error : </h3> <p> {error.message} </p>
      </>
    );

  const handleSave = async (values) => {
    const res = await editResource(values, resourceName);

    if (res.error && Object.keys(res).length) {
      if (res.error && res.message) {
        setIsBckError(res.message);
        setShowToast(true);
      } else {
        setIsBckError("Something went wrong.");
        setShowToast(true);
      }
    } else {
      setIsBckError("");
      setShowToast(false);
      fetchData();
      refetch();
      closeModal();
    }
    // fetchData();
    // refetch();
    // closeModal();
  };

  const gameForm = (
    <GameForm
      onSave={handleSave}
      {...{ data }}
      closeModal={closeModal}
      formTitle="Edit Game"
    />
  );

  const userForm = (
    <UserForm
      onSave={handleSave}
      {...{ data }}
      closeModal={closeModal}
      formTitle="Edit User"
    />
  );

  return (
    <>
      <Modal closeModal={closeModal}>
        {resourceName === "users" ? userForm : gameForm}
      </Modal>
      {showToast && isBckError !== "" && (
        <Toast
          type={alertType.ERROR}
          position={toastPosition.TOP_RIGHT}
          title={"Failed"}
          message={isBckError}
          setShowToast={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default UseEdit;
