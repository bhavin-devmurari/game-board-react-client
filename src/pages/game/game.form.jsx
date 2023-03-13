import React, { useState } from "react";
import { Button, Heading, InputWrapper } from "../../components";

const GameForm = ({
  onSave,
  data = {},
  closeModal,
  formTitle = "Add Game",
}) => {
  const [gameData, setGameData] = useState(data);
  const [errors, setErrors] = useState({});
  const { gameName, gameCategory, releaseYear, publisher } = gameData;

  const validateData = () => {
    let errors = {};

    if (!gameName) errors.gameName = "Game name is required.";
    if (!gameCategory) errors.gameCategory = "Game category is required.";

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    setErrors({});
    onSave(gameData);
  };
  return (
    <>
      <Heading addonClass="mt-2">{formTitle}</Heading>
      <div className="form">
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="gameName"
            value={gameName}
            onChange={handleChange}
            className="form-input"
            placeholder="game name"
            aria-label="game name"
          />
          <div style={{ color: "white" }}>{errors.gameName}</div>
        </div>
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="gameCategory"
            value={gameCategory}
            onChange={handleChange}
            className="form-input"
            placeholder="game category"
            aria-label="game category"
          />
          <div style={{ color: "white" }}>{errors.gameCategory}</div>
        </div>
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="releaseYear"
            value={releaseYear}
            onChange={handleChange}
            className="form-input"
            placeholder="release year"
            aria-label="release year"
          />
        </div>
        <div className="form-item input-wrapper">
          <input
            type="text"
            name="publisher"
            value={publisher}
            onChange={handleChange}
            className="form-input"
            placeholder="publisher"
            aria-label="publisher"
          />
        </div>
      </div>
      <InputWrapper>
        <Button classes="btn primary-btn" btnClick={handleSave}>
          Save
        </Button>
      </InputWrapper>
      {/* <div className="input-wrapper">
        <button className="btn primary-btn" onClick={handleSave}>
          Save
        </button>
      </div> */}
      <InputWrapper>
        <Button classes="btn secondary-btn" btnClick={closeModal}>
          Cancel
        </Button>
      </InputWrapper>
      {/* <div className="input-wrapper">
        <button className="btn secondary-btn" onClick={closeModal}>
          Cancel
        </button>
      </div> */}
    </>
  );
};
export default GameForm;
