import React from "react";

const AddBtn = ({ setShowAddModal }) => (
  <button
    className="add-btn"
    type="button"
    onClick={() => setShowAddModal(true)}
  >
    + Добавить сотрудника
  </button>
);

export default AddBtn;
