import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "./components/Table";
import AddBtn from "./components/AddBtn";
import AddPerson from "./components/AddPerson";
import EditPerson from "./components/EditPerson";

const EmployeeList = () => {
  const [apiUrl] = useState("http://localhost:3000/api/v1");
  const [persons, setPersons] = useState([]);
  const [personId, setPersonId] = useState(undefined);
  const [personFirstName, setPersonFirstName] = useState(undefined);
  const [personLastName, setPersonLastName] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const getPersons = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPersons(data);
  };

  useEffect(() => {
    getPersons(`${apiUrl}/persons/`);
  }, []);

  const displayAddModal = () => setShowAddModal(true);
  const displayEditModal = () => setShowEditModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const closeEditModal = () => setShowEditModal(false);

  return (
    <div className="app-container">
      {persons.length ? (
        <Table
          apiUrl={apiUrl}
          persons={persons}
          getPersons={getPersons}
          setPersonId={setPersonId}
          setPersonFirstName={setPersonFirstName}
          setPersonLastName={setPersonLastName}
          displayEditModal={displayEditModal}
        />
      ) : null}
      <AddBtn displayAddModal={displayAddModal} />
      {showAddModal && (
        <AddPerson
          apiUrl={apiUrl}
          getPersons={getPersons}
          closeAddModal={closeAddModal}
        />
      )}
      {showEditModal && (
        <EditPerson
          apiUrl={apiUrl}
          getPersons={getPersons}
          id={personId}
          firstName={personFirstName}
          lastName={personLastName}
          closeEditModal={closeEditModal}
        />
      )}
      <ToastContainer transition={Flip} autoClose={3000} hideProgressBar />
    </div>
  );
};

export default EmployeeList;
