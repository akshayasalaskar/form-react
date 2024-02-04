import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import "../index.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetching the JSON file
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data.map((user) => ({ ...user, isOpen: false })));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-4 rounded-lg w-[450px] h-[520px]">
      <ul>
        <Accordion
          users={users}
          searchTerm={searchTerm}
          setUsers={setUsers}
          setSearchTerm={setSearchTerm}
        />
      </ul>
    </div>
  );
};

export default UserList;
