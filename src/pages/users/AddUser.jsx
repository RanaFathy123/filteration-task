import React, { useState } from "react";
import backgroundBg from "../../assets/background.jpeg";
import userPhoto from "../../assets/Contact item.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    picture:
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  });
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const navigate = useNavigate();

  const addUser = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://dummyapi.io/data/v1/user/create",
        data: userInputs,
        headers: {
          "app-id": "6612ff8c851ab1cf2bb6990d",
        },
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };
  const cancelAddUser = () => {
    navigate("/");
  };
  const resetInputs = () => {
    setCheckFirstName(false);
    setCheckLastName(false);
    setCheckPhone(false);
    setCheckEmail(false);
  };
  
  const validateInputs = () => {
    let emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userInputs.firstName == "") {
      setCheckFirstName(true);
      setFirstNameMessage("Please Enter First Name");
    } else if (userInputs.firstName.length <= 2) {
      setCheckFirstName(true);
      setFirstNameMessage("First Name Must Be More Than 2 Charcter");
    } else if (userInputs.lastName == "") {
      resetInputs();
      setCheckLastName(true);
      setLastNameMessage("Please Enter Last Name");
    } else if (userInputs.lastName.length <= 2) {
      resetInputs();
      setCheckLastName(true);
      setLastNameMessage("Last Name Must Be More Than 2 Charcter");
    } else if (userInputs.phoneNumber == "") {
      resetInputs();
      setCheckPhone(true);
      setPhoneMessage("Please Enter Phone Number");
    } else if (userInputs.email == "" || !emailRgx.test(userInputs.email)) {
      resetInputs();
      setCheckEmail(true);
      setEmailMessage("Please Enter a valid email");
    } else {
      resetInputs();
      addUser();
    }
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
      <div>
        <div className="card m-auto border-white p-3 " style={{ width: "90%" }}>
          <img
            alt="..."
            src={userPhoto}
            className="avatar avatar-sm rounded-circle m-auto"
          />
          <h4 className="text-center mb-5 mt-2">Upload Photo</h4>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                style={{ borderRadius: "20px" }}
                value={userInputs.firstName}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, firstName: e.target.value })
                }
              />
              {checkFirstName && (
                <div className="text-danger m-2">{firstNameMessage}</div>
              )}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                style={{ borderRadius: "20px" }}
                placeholder="Last name"
                value={userInputs.lastName}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, lastName: e.target.value })
                }
              />
              {checkLastName && (
                <div className="text-danger m-2">{lastNameMessage}</div>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                style={{ borderRadius: "20px" }}
                value={userInputs.phoneNumber}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, phoneNumber: e.target.value })
                }
              />
              {checkPhone && (
                <div className="text-danger m-2">{phoneMessage}</div>
              )}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="email"
                style={{ borderRadius: "20px" }}
                value={userInputs.email}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, email: e.target.value })
                }
              />
              {checkEmail && (
                <div className="text-danger m-2">{emailMessage}</div>
              )}
            </div>
            <div className="d-flex justify-content-between mt-5 mb-5">
              <button
                className="btn btn-secondary"
                style={{ borderRadius: "20px", width: "120px" }}
                onClick={cancelAddUser}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary "
                style={{ borderRadius: "20px", width: "120px" }}
                onClick={validateInputs}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
