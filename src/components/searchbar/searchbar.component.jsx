import React from "react";

const Searchbar = ({ returnToParent }) => {
  return (
    <div className="search-form">
      <div className="form-item search-input-wrapper">
        <input
          type="text"
          className="form-input search-input"
          placeholder="Search"
          onChange={(e) => returnToParent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Searchbar;
