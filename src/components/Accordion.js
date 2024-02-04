import React, { useState, useEffect } from "react";
import "../index.css";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

const Accordion = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);

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
  console.log("users", users);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    return currentDate.getFullYear() - birthDate.getFullYear();
  };

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
  const handleEditClick = (index) => {
    setEditMode(index);
  };

  const handleSaveClick = (index) => {
    setEditMode(null);
  };

  const handleCancelClick = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index && editMode === index ? { ...user, isOpen: false } : user
      )
    );
    setEditMode(null);
  };

  const handleDeleteClick = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((user, i) => i !== index));
      setEditMode(null);
    }
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
      <div className=" overflow-y-scroll no-scrollbar h-[400px]">
        <ul>
          {users
            .filter((user) =>
              user.first.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
              <div className="my-1">
                <li key={index}>
                  <div
                    className={`rounded-lg bg-pink-50 ${
                      user.isOpen ? "rounded-bl-none rounded-br-none" : ""
                    }`}
                  >
                    <button className=" flex justify-center rounded-lg w-[420px]  bg-pink-50  scroll-auto">
                      <div onClick={() => handleAccordionClick(index)}>
                        <div className=" flex justify-between rounded-lg w-[400px] items-center bg-pink-50">
                          <div className="flex ml-2 items-center">
                            <img
                              className="m-2 w-12 h-12 rounded-full"
                              src={user.picture}
                              alt={`User ${user.first} ${user.last}`}
                            />
                            <span className="ml-4">
                              {user.first} {user.last}
                            </span>{" "}
                          </div>
                          <span className="m-5">
                            <svg
                              className="fill-indigo-500 shrink-0 ml-8"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${
                                  user.isOpen && "!rotate-180"
                                }`}
                              />
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                  user.isOpen && "!rotate-180"
                                }`}
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                  {user.isOpen && (
                    <div className="overflow-hidden rounded-lg rounded-tl-none rounded-tr-none bg-pink-50 transition-all w-[420px] duration-300 ease-in-out  text-sm">
                      <div className="overflow-hidden flex-row justify-center items-center ">
                        <div className="flex justify-center">
                          <div className="flex-row w-[380px] justify-between items-center">
                            <div className="flex justify-between">
                              <div className="m-1">
                                Age:
                                {editMode === index ? (
                                  <input
                                    type="text"
                                    value={user.age}
                                    onChange={(e) =>
                                      setUsers((prevUsers) => {
                                        const updatedUsers = [...prevUsers];
                                        updatedUsers[index] = {
                                          ...updatedUsers[index],
                                          age: e.target.value,
                                        };
                                        return updatedUsers;
                                      })
                                    }
                                  />
                                ) : (
                                  <span>{calculateAge(user.dob)} years </span>
                                )}
                              </div>
                              <label className="m-1">
                                Gender:
                                {editMode === index ? (
                                  <select
                                    value={user.gender}
                                    onChange={(e) =>
                                      setUsers((prevUsers) => {
                                        const updatedUsers = [...prevUsers];
                                        updatedUsers[index] = {
                                          ...updatedUsers[index],
                                          gender: e.target.value,
                                        };
                                        return updatedUsers;
                                      })
                                    }
                                  >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">
                                      Transgender
                                    </option>
                                    <option value="Rather not say">
                                      Rather not say
                                    </option>
                                    <option value="Other">Other</option>
                                  </select>
                                ) : (
                                  <span>{user.gender}</span>
                                )}
                              </label>
                              <label className="m-1">
                                Country:
                                {editMode === index ? (
                                  <input
                                    type="text"
                                    value={user.country}
                                    onChange={(e) =>
                                      setUsers((prevUsers) => {
                                        const updatedUsers = [...prevUsers];
                                        updatedUsers[index] = {
                                          ...updatedUsers[index],
                                          country: e.target.value,
                                        };
                                        return updatedUsers;
                                      })
                                    }
                                  />
                                ) : (
                                  <span>{user.country}</span>
                                )}
                              </label>
                            </div>

                            <div className="">
                              <div className="flex w-[380px] justify-center">
                                <label className=" flex-column m-1 ">
                                  Description:
                                  {editMode === index ? (
                                    <textarea
                                      value={user.description}
                                      onChange={(e) =>
                                        setUsers((prevUsers) => {
                                          const updatedUsers = [...prevUsers];
                                          updatedUsers[index] = {
                                            ...updatedUsers[index],
                                            description: e.target.value,
                                          };
                                          return updatedUsers;
                                        })
                                      }
                                    />
                                  ) : (
                                    <div className="m-1">
                                      {user.description}
                                    </div>
                                  )}
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              {editMode === index ? (
                                <>
                                  <button
                                    className="m-2 mb-1 w-3"
                                    onClick={handleCancelClick}
                                  >
                                    <MdOutlineCancel />
                                  </button>
                                  <button
                                    className="m-2 mb-1 w-3"
                                    onClick={() => handleSaveClick(index)}
                                  >
                                    <MdOutlineCheckCircle />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="m-2 mb-1 "
                                    onClick={() => handleDeleteClick(index)}
                                  >
                                    <FaTrashAlt />
                                  </button>

                                  <button
                                    className="m-2 mb-1"
                                    onClick={() => handleEditClick(index)}
                                  >
                                    <FaPencil />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
