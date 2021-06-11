import React from "react";
import { toast } from "react-toastify";

const Table = ({
  apiUrl,
  persons,
  displayEditModal,
  setPersonId,
  setPersonFirstName,
  setPersonLastName,
  getPersons,
}) => {
  const removePerson = async (id) => {
    const fetchOptions = {
      method: "DELETE",
    };

    const response = await fetch(`${apiUrl}/person/${id}`, fetchOptions);

    if (response.status === 200) {
      toast.success("Сотрудник удален из списка.");
    } else if (response.status === 400) {
      toast.error("Неверный запрос.");
    } else if (response.status === 404) {
      toast.error("Сотрудник не найден.");
    } else if (response.status === 500) {
      toast.error("Ошибка сервера. Попробуйте позже.");
    }

    getPersons(`${apiUrl}/persons/`);
  };

  const editBtnHandler = (id, firstName, lastName) => {
    displayEditModal();
    setPersonId(id);
    setPersonFirstName(firstName);
    setPersonLastName(lastName);
  };

  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th aria-label="empty" />
          <th aria-label="empty" />
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td className="firstname-cell">{person.firstName}</td>
            <td className="lastname-cell">{person.lastName}</td>
            <td className="edit-btn-cell">
              <button
                className="edit-btn"
                type="button"
                onClick={() =>
                  editBtnHandler(person.id, person.firstName, person.lastName)
                }
              >
                ✎
              </button>
            </td>
            <td className="remove-btn-cell">
              <button
                className="remove-btn"
                type="button"
                onClick={() => removePerson(person.id)}
              >
                &times;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
