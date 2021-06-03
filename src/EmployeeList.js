import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getData from "./utils/getData";
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

  useEffect(async () => {
    const data = await getData(`${apiUrl}/persons/`);
    setPersons(data);
  }, []);

  return (
    <div className="app-container">
      {persons.length ? (
        <Table
          apiUrl={apiUrl}
          persons={persons}
          setPersons={setPersons}
          setPersonId={setPersonId}
          setPersonFirstName={setPersonFirstName}
          setPersonLastName={setPersonLastName}
          setShowEditModal={setShowEditModal}
        />
      ) : null}
      <AddBtn setShowAddModal={setShowAddModal} />
      {showAddModal && (
        <AddPerson
          apiUrl={apiUrl}
          setPersons={setPersons}
          setShowAddModal={setShowAddModal}
        />
      )}
      {showEditModal && (
        <EditPerson
          apiUrl={apiUrl}
          setPersons={setPersons}
          id={personId}
          firstName={personFirstName}
          lastName={personLastName}
          setShowEditModal={setShowEditModal}
        />
      )}
      <ToastContainer transition={Flip} autoClose={3000} hideProgressBar />
    </div>
  );
};

export default EmployeeList;
