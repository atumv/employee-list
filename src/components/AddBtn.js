import React from "react";

const AddBtn = ({ displayAddModal }) => (
  <button className="add-btn" type="button" onClick={displayAddModal}>
    + Добавить сотрудника
  </button>
);

export default AddBtn;
