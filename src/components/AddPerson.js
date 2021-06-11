import React, { createRef, useEffect } from "react";
import { toast } from "react-toastify";

const AddPerson = ({ apiUrl, closeAddModal, getPersons }) => {
  const firstNameInput = createRef();

  useEffect(() => {
    firstNameInput.current.focus();
  });

  const addPerson = async (e) => {
    e.preventDefault();

    const firstNameInputValue = e.target.elements.firstName.value.trim();
    const lastNameInputValue = e.target.elements.lastName.value.trim();

    if (firstNameInputValue.length > 0 && lastNameInputValue.length > 0) {
      const fetchOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now(),
          firstName: firstNameInputValue,
          lastName: lastNameInputValue,
        }),
      };

      const response = await fetch(`${apiUrl}/person/`, fetchOptions);

      if (response.status === 200) {
        toast.success("Сотрудник добавлен в список.");
      } else if (response.status === 201) {
        toast.success("Сотрудник добавлен в список.");
      } else if (response.status === 400) {
        toast.error("Неверный запрос.");
      } else if (response.status === 404) {
        toast.error("Сотрудник не найден.");
      } else if (response.status === 500) {
        toast.error("Ошибка сервера. Попробуйте позже.");
      }

      getPersons(`${apiUrl}/persons/`);
      closeAddModal();
    }

    if (firstNameInputValue.length === 0 || lastNameInputValue.length === 0) {
      closeAddModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-fade" />
      <div className="modal-window">
        <form className="form" onSubmit={addPerson}>
          <button
            className="form-close-btn"
            type="button"
            onClick={closeAddModal}
          >
            &times;
          </button>
          <input
            className="form-input"
            type="text"
            name="firstName"
            placeholder="Имя"
            ref={firstNameInput}
          />
          <input
            className="form-input lastname-input"
            type="text"
            name="lastName"
            placeholder="Фамилия"
          />
          <button className="form-submit-btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPerson;
