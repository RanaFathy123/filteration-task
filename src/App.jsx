import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import EditUser from "./pages/users/EditUser";
import AddUser from "./pages/users/AddUser";

const App = () => {

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UsersList  />
          }
        />
        <Route
          path="/add/user"
          element={
            <AddUser
             
            />
          }
        />
        <Route path="/edit/:userId" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default App;
