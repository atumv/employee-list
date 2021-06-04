import React from "react";
import { toast } from "react-toastify";

const Table = ({
  apiUrl,
  persons,
  setShowEditModal,
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

  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>
              <button
                className="edit-btn"
                type="button"
                onClick={() => {
                  setShowEditModal(true);
                  setPersonId(person.id);
                  setPersonFirstName(person.firstName);
                  setPersonLastName(person.lastName);
                }}
              >
                ✎
              </button>
            </td>
            <td>
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
