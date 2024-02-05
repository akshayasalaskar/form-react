import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import "../index.css";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);

  return (
    <div className="p-4  rounded-lg w-[450px] h-[420px] ">
      <ul>
        <Accordion className="p-4 my-1 " />
      </ul>
    </div>
  );
};

export default UserList;
