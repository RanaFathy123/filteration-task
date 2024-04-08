import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import EditUser from "./pages/users/EditUser";
import AddUser from "./pages/users/AddUser";

const App = () => {
  const [users, setUsers] = useState([]);
  const [ifUserChanged, setIfUserChanged] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://dummyapi.io/data/v1/user?limit=5&page=1`,
        headers: {
          "app-id": "6612ff8c851ab1cf2bb6990d",
        },
      });
      const data = response.data.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [ifUserChanged]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UsersList users={users} setUsers={setUsers} getUsers={getUsers} />
          }
        />
        <Route
          path="/add/user"
          element={
            <AddUser
              ifUserChanged={ifUserChanged}
              setIfUserChanged={setIfUserChanged}
            />
          }
        />
        <Route path="/edit/:userId" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default App;
