import { Link } from "react-router-dom";
import backgroundBg from "../../assets/background.jpeg";
import { FaRegEdit, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const UsersList = () => {
  const [searchFilter, setSerachFilter] = useState("");
  const [users, setUsers] = useState([]);

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
  const handleSerach = async (event) => {
    const searchValue = event.target.value;
    setSerachFilter(searchValue);
    const serchFilterResult = users.filter((user) => {
      return (
        user.firstName.includes(searchValue) ||
        user.lastName.includes(searchValue)
      );
    });
    if (searchValue != "") {
      setUsers(serchFilterResult);
    } else {
      let usersResults = await getUsers();
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteUser = (user) => {
    Swal.fire({
      title: `Do you want to Delete ${user.firstName}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `https://dummyapi.io/data/v1/user/${user.id}`,
          headers: {
            "app-id": "6612ff8c851ab1cf2bb6990d",
          },
        })
          .then((response) => {
            console.log(response);
            getUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div
      className="p-5 overflow-auto"
      style={{
        backgroundImage: `url(${backgroundBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="card m-auto border-white  p-3"
        style={{ width: "90%", backgroundColor: "transparent" }}
      >
        <div className="d-flex flex-column align-items-center">
          <input
            className="form-control mb-5"
            type="search"
            placeholder="Search By Name"
            aria-label="Search"
            style={{ width: "80%", borderRadius: "20px" }}
            value={searchFilter}
            onChange={(e) => handleSerach(e)}
          />
          <div className="mt-auto ">
            <Link
              to="/add/user"
              className="btn btn-primary"
              style={{ borderRadius: "20px" }}
            >
              <div>
                <FaPlus className="ml-2" /> Add New User
              </div>
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table mx-auto"
            style={{ width: "80%", backgroundColor: "transparent" }}
          >
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td
                    className="text-center"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="d-flex">
                      <img
                        alt="..."
                        src={user.picture}
                        width={"50em"}
                        className="avatar avatar-sm rounded-circle ms-2"
                      />
                      <div className="text-light m-3">{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                  </td>

                  <td
                    className="text-end"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-sm btn-light"
                    >
                      <FaRegEdit style={{ color: "blue" }} />
                    </Link>
                  </td>
                  <td style={{ backgroundColor: "transparent" }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-light mx-2"
                      onClick={() => deleteUser(user)}
                    >
                      <FaRegTrashAlt style={{ color: "red" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination setUsers={setUsers} users={users} />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
