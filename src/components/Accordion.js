import React, { useState } from "react";
import UserItem from "./UserItem";
import "../index.css";

const Accordion = ({ users, searchTerm, setUsers, setSearchTerm }) => {
  const [editMode, setEditMode] = useState(null);

  const handleAccordionClick = (originalIndex) => {
    if (editMode !== null) return;

    setEditMode(null);
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => ({
        ...user,
        isOpen: i === originalIndex ? !user.isOpen : false,
      }))
    );
  };

  return (
    <div className="">
      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Search by celebrity name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-scroll no-scrollbar h-[400px]">
        <ul>
          {users
            .filter((user) =>
              user.first.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
              <UserItem
                key={index}
                user={user}
                index={index}
                editMode={editMode}
                setEditMode={setEditMode}
                handleAccordionClick={handleAccordionClick}
                setUsers={setUsers}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
