import React, { useEffect, useState } from "react";
import backgroundBg from "../../assets/background.jpeg";
import userPhoto from "../../assets/Contact item.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    picture: "",
  });
  const [userInputsMessage, setUserInputsMessage] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    picture: "",
  });
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://dummyapi.io/data/v1/user/${userId}`,
        headers: {
          "app-id": "6612ff8c851ab1cf2bb6990d",
        },
      });
      console.log(response.data);
      const data = response.data;

      setUserInputs({
        ...userInputs,
        firstName: data.firstName,
        lastName: data.lastName,
        picture: data.picture,
        phoneNumber: "01288234519",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const cancelEditUser = () => {
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
      setUserInputsMessage({...userInputsMessage,firstName:'Please Fill First Name'});
    } else if (userInputs.firstName.length <= 2) {
      setCheckFirstName(true);
      setUserInputsMessage({...userInputsMessage,firstName:'First Name Must Be More Than 2 Charcter'});
    } else if (userInputs.lastName == "") {
      resetInputs();
      setCheckLastName(true);
      setUserInputsMessage({...userInputsMessage,lastName:'Please Fill Last Name'});
    } else if (userInputs.lastName.length <= 2) {
      resetInputs();
      setCheckLastName(true);
      setUserInputsMessage({...userInputsMessage,lastName:'Last Name Must Be More Than 2 Charcter'});
  
    } else if (userInputs.phoneNumber == "") {
      resetInputs();
      setCheckPhone(true);
      setUserInputsMessage({...userInputsMessage,phoneNumber:'Please Enter Phone Number'});
    } else if (userInputs.email == "" && !emailRgx.test(userInputs.email)) {
      resetInputs();
      setCheckEmail(true);
      setUserInputsMessage({...userInputsMessage,email:'Please Enter a valid email'});
    } else {
      resetInputs();
      editUser();
    }
  };

  const editUser = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `https://dummyapi.io/data/v1/user/${userId}`,
        data: {
          ...userInputs,
          firstName: userInputs.firstName,
          lastName: userInputs.lastName,
          picture: userInputs.picture,
          phoneNumber: "01288234519",
        },
        headers: {
          "app-id": "6612ff8c851ab1cf2bb6990d",
        },
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
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
                <div className="text-danger m-2">{userInputsMessage.firstName}</div>
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
                <div className="text-danger m-2">{userInputsMessage.lastName}</div>
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
                <div className="text-danger m-2">{userInputsMessage.phoneNumber}</div>
              )}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Photo Url"
                style={{ borderRadius: "20px" }}
                value={userInputs.picture}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, picture: e.target.value })
                }
              />
                 {checkEmail && (
                <div className="text-danger m-2">{userInputsMessage.email}</div>
              )}
            </div>
            <div className="d-flex justify-content-between mt-5 mb-5">
              <button
                className="btn btn-secondary"
                style={{ borderRadius: "20px", width: "120px" }}
                onClick={cancelEditUser}
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

export default EditUser;
