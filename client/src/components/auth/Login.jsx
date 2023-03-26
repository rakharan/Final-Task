import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../../parts/Button";
import { API, setAuthToken } from "../../config/api";
``;
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isOnSignUp, setIsOnSignUp] = useState(false);
  const { functionHandlers, statesFromGlobalContext } =
    useContext(GlobalContext);
  const {
    loginData,
    setLoginData,
    setIsModalVisible,
    setCurrentUser,
    setPreview,
    setIsLoginModal,
    setIsSignUpModal,
    setShowTicketModal,
  } = statesFromGlobalContext;
  const hideModal = () => {
    setIsModalVisible(false);
    setIsSignUpModal(false);
    setIsLoginModal(false);
    setShowTicketModal(false);
  };
  const { handleInput } = functionHandlers;
  const [input, setInput] = useState({
    name: "",
    password: "",
    username: "",
    email: "",
    image: "",
    role: "",
    phone: "",
  });
  const handleInputRegister = (event) => {
    setInput({
      ...input,
      [event.target.name]:
        event.target.type === "file" ? event.target.files : event.target.value,
    });
    if (event.target.type === "file") {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
  };

  let [errorMessage, setErrorMessage] = useState("");

  const handleLogin = useMutation(async (event) => {
    try {
      event.preventDefault();
      const response = await API.post("/login", loginData);

      setCurrentUser(response.data.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      setAuthToken(response.data.data.token);
      Swal.fire({
        title: "Login Success",
        icon: "success",
        timer: 1500,
        width: 600,
        padding: "3em",
        color: "#c23a63",
        background: "#fff)",
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
      });
      hideModal();
      setLoginData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  });

  useEffect(() => {
    console.log("this is error login message", errorMessage);
  }, [errorMessage]);

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.set("name", input.name);
      formData.set("username", input.username);
      formData.set("email", input.email);
      formData.set("password", input.password);
      formData.set("phone", input.phone);
      formData.set("image", input.image[0], input.image[0].name);

      await API.post("/user", formData, config);

      Swal.fire({
        title: "Register Success",
        icon: "success",
        timer: 1500,
        width: 600,
        padding: "3em",
        color: "#c23a63",
        background: "#fff)",
        backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
      });
      navigate("/");
      hideModal();
      setInput({
        name: "",
        password: "",
        email: "",
        image: "",
        phone: "",
        username: "",
      });
      setPreview(null);
      return;
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      {isOnSignUp ? (
        <>
          <div className="flex justify-center flex-col items-center">
            <div className="loginFormCard px-[33px] max-w-[500px]">
              <div className="header mb-10 text-center">
                <h1 className=" leading-[49px] text-transparent font-normal text-4xl bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                  Register
                </h1>
              </div>
              <div className="form flex flex-col">
                <form
                  className="flex flex-col gap-y-2"
                  onSubmit={(e) => handleRegister.mutate(e)}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleInputRegister}
                    value={input.name}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputRegister}
                    value={input.username}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputRegister}
                    value={input.email}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleInputRegister}
                    value={input.phone}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputRegister}
                    value={input.password}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                    required
                  />
                  <input
                    type="file"
                    id="upload"
                    name="image"
                    onChange={handleInputRegister}
                    required
                  />
                  <Button className="mt-5 bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] text-white w-full rounded-[50px]">
                    Register
                  </Button>
                </form>
                <p className="mt-5 text-center flex justify-center gap-x-4">
                  Sudah Punya Akun?
                  <span
                    className="cursor-pointer "
                    onClick={() => {
                      setIsOnSignUp(false);
                    }}
                  >
                    Klik Disini
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center flex-col items-center py-5">
            <div className="loginFormCard px-[33px] max-w-[500px]">
              <div className="header mb-10 text-center">
                <h1 className=" leading-[49px] text-transparent font-normal text-4xl bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                  Login
                </h1>
              </div>
              <div className="form flex flex-col">
                {errorMessage !== "" && (
                  <>
                    <span className="bg-red-200 text-center mb-2">
                      {errorMessage}
                    </span>
                  </>
                )}
                <form
                  className="flex flex-col gap-y-2"
                  onSubmit={(e) => handleLogin.mutate(e)}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    value={loginData.email}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    value={loginData.password}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                  />
                  <Button
                    className="mt-5 bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] text-white w-full rounded-[50px]"
                    onClick={() => {
                      setErrorMessage("");
                    }}
                  >
                    Login
                  </Button>
                </form>
                <p className="mt-5 text-center flex justify-center gap-x-4">
                  Belum Punya Akun?
                  <span
                    className="cursor-pointer "
                    onClick={() => {
                      setIsOnSignUp(true);
                    }}
                  >
                    Klik Disini
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
