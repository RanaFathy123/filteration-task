import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = ({ users, setUsers }) => {
  const [num, setNum] = useState(1);

  const getUserPage = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://dummyapi.io/data/v1/user?limit=5&page=${num}`,
        headers: {
          "app-id": "6612ff8c851ab1cf2bb6990d",
        },
      });
      const data = response.data.data;
      setUsers(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserPage();
  }, [num]);

  const nextPage = async () => {
    if (users.length >= 5) {
      setNum(num + 1);
    }
  };
  const previousPage = () => {
    if (num >= 2) {
      setNum(num - 1);
    }
  };

  return (
    <div className="d-flex justify-content-end text-white">
      <div className="d-flex align-items-center justifty-content-between">
        <button
          className="btn btn-light text-white"
          style={{ background: "none", border: "none" }}
          onClick={previousPage}
        >
          <GrFormPrevious />
        </button>
        <div>{num}</div>
        <button
          className="btn btn-light text-white"
          style={{ background: "none", border: "none" }}
          onClick={nextPage}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
