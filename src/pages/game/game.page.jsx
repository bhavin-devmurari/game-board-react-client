import React, { useState } from "react";
import WithGetResource from "../../lib/hoc/withGetResource";
import { Button, Card, Heading, Modal, Toast } from "../../components";
import { alertType, toastPosition } from "../../config";
import GameForm from "./game.form";
import { createResource } from "../../service/user";

const game = {
  gameName: "",
  gameCategory: "",
  releaseYear: "",
  publisher: "",
};

const Game = ({ refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const closeModal = () => setShowModal(false);

  const handleSave = async (values) => {
    const id = Object.assign(values, { id: values._id })["_id"];
    delete values["_id"];
    await createResource({ id, ...values }, "games");
    refetch();
    setShowToast(true);
    closeModal();
  };
  return (
    <>
      <div className="main-container mx-auto">
        <Card classes="m-after-nav mx-3">
          <div className="pg-head-container">
            <Heading>Games</Heading>
            <Button
              classes="btn primary-btn pg-level-btn"
              btnClick={() => setShowModal(true)}
            >
              Add Game
            </Button>
          </div>
        </Card>
        {showModal && (
          <Modal closeModal={closeModal}>
            <GameForm
              onSave={handleSave}
              {...{ game }}
              closeModal={closeModal}
            />
          </Modal>
        )}
        {showToast && (
          <Toast
            type={alertType.SUCCESS}
            position={toastPosition.BOTTOM_RIGHT}
            title={"Success"}
            message={"Game added successfully."}
            setShowToast={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};

const GamePage = WithGetResource(Game, "games", "Game List");
export default GamePage;
