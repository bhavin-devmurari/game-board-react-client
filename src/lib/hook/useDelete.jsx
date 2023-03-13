import React from "react";
import { Button, Heading, InputWrapper, Modal } from "../../components";
import { deleteResource } from "../../service/user";

const UseDelete = ({ resourceName, deleteId, closeModal, fetchData }) => {
  const handleDelete = async () => {
    await deleteResource(deleteId, resourceName);
    fetchData();
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <Heading>Are you sure to delete this record?</Heading>
      <InputWrapper>
        <Button classes="btn primary-btn" btnClick={handleDelete}>
          Yes
        </Button>
      </InputWrapper>
      <InputWrapper>
        <Button classes="btn secondary-btn" btnClick={closeModal}>
          No
        </Button>
      </InputWrapper>
    </Modal>
  );
};

export default UseDelete;
