import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../../parts/Button";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const Login = () => {
  const [isOnSignUp, setIsOnSignUp] = useState(false);
  const { functionHandlers, statesFromGlobalContext } =
    useContext(GlobalContext);
  const {
    loginData,
    setLoginData,
    setIsModalVisible,
    input,
    setCurrentUser,
    setPreview,
    preview,
  } = statesFromGlobalContext;
  const [state, dispatch] = useContext(UserContext);
  const { handleInput, handleInputRegister } = functionHandlers;
  const handleLogin = useMutation(async (event) => {
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
    setIsModalVisible(false);
    setLoginData({
      name: "",
      email: "",
      password: "",
    });
    setPreview(null);
    setIsModalVisible(false);
    // {
    //   response.data.data.role === "admin" ? (
    //     navigate("/admin")
    //   ) : response.data.data.role === "user" ? (
    //     navigate("/")
    //   ) : (
    //     <></>
    //   );
    // }
    console.log(state);
  });
  return (
    <>
      {isOnSignUp ? (
        <>
          <div className="flex justify-center flex-col items-center py-10 ">
            <div className="loginFormCard px-[33px] max-w-[500px]">
              <div className="header mb-10 text-center">
                <h1 className=" leading-[49px] text-transparent font-normal text-4xl bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                  Register
                </h1>
              </div>
              <div className="form flex flex-col">
                <form
                  className="flex flex-col gap-y-5"
                  onSubmit={(e) => handleLogin.mutate(e)}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                    value={loginData.email}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInput}
                    value={loginData.email}
                    className="w-[350px] h-[50px] border-2 border-[#B1B1B1] p-4"
                  />
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
          <div className="flex justify-center flex-col items-center py-10 ">
            <div className="loginFormCard px-[33px] max-w-[500px]">
              <div className="header mb-10 text-center">
                <h1 className=" leading-[49px] text-transparent font-normal text-4xl bg-clip-text bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]">
                  Login
                </h1>
              </div>
              <div className="form flex flex-col">
                <form
                  className="flex flex-col gap-y-5"
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
                  <Button className="mt-5 bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] text-white w-full rounded-[50px]">
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
