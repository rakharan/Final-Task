import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [ticketList, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState([]);
  const [tempId, setTempId] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showTicketSuccess, setShowTicketSuccess] = useState(false);

  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
    image: "",
    role: "",
  });

  const handleInput = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]:
        event.target.type === "file" ? event.target.files : event.target.value,
    });
    if (event.target.type === "file") {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
  };

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
  let price = new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  });
  let statesFromGlobalContext = {
    isModalVisible,
    setIsModalVisible,
    isLoginModal,
    setIsLoginModal,
    isSignUpModal,
    setIsSignUpModal,
    preview,
    setPreview,
    loginData,
    setLoginData,
    input,
    setInput,
    currentUser,
    setCurrentUser,
    ticketList,
    setTickets,
    currentTicket,
    setCurrentTicket,
    tempId,
    setTempId,
    showTicketModal,
    setShowTicketModal,
    showTicketSuccess,
    setShowTicketSuccess,
  };

  let functionHandlers = {
    handleInput,
    handleInputRegister,
    price,
  };
  return (
    <GlobalContext.Provider
      value={{ statesFromGlobalContext, functionHandlers }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
