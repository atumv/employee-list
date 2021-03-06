import React, { createRef, useEffect } from "react";
import { toast } from "react-toastify";

const EditPerson = ({
  id,
  firstName,
  lastName,
  apiUrl,
  closeEditModal,
  getPersons,
}) => {
  const firstNameInput = createRef();

  useEffect(() => {
    firstNameInput.current.focus();
  });

  const editPerson = async (e) => {
    e.preventDefault();

    const firstNameInputValue = e.target.elements.firstName.value.trim();
    const lastNameInputValue = e.target.elements.lastName.value.trim();

    if (firstNameInputValue.length === 0 || lastNameInputValue.length === 0) {
      closeEditModal();
    }

    if (firstNameInputValue.length > 0 && lastNameInputValue.length > 0) {
      const fetchOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: null,
          firstName: firstNameInputValue,
          lastName: lastNameInputValue,
        }),
      };

      const response = await fetch(`${apiUrl}/person/${id}`, fetchOptions);

      if (response.status === 200) {
        toast.success("Данные успешно изменены.");
      } else if (response.status === 400) {
        toast.error("Неверный запрос.");
      } else if (response.status === 404) {
        toast.error("Сотрудник не найден.");
      } else if (response.status === 500) {
        toast.error("Ошибка сервера. Попробуйте позже.");
      }

      getPersons(`${apiUrl}/persons/`);
      closeEditModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-fade" />
      <div className="modal-window">
        <form className="form" onSubmit={editPerson}>
          <button
            className="form-close-btn"
            type="button"
            onClick={closeEditModal}
          >
            &times;
          </button>
          <input
            className="form-input"
            type="text"
            name="firstName"
            defaultValue={firstName}
            ref={firstNameInput}
          />
          <input
            className="form-input lastname-input"
            type="text"
            name="lastName"
            defaultValue={lastName}
          />
          <button className="form-submit-btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPerson;
