import React, { useContext, useState, useEffect } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import ModalManual from "../components/Modal/ModalManual";
import Button from "../parts/Button";
import { Checkbox, Modal } from "flowbite-react";
import { GlobalContext } from "../context/GlobalContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket/Ticket";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  document.title = "LandTick | Home";

  const navigate = useNavigate();
  const { statesFromGlobalContext } = useContext(GlobalContext);
  const {
    isModalVisible,
    setIsModalVisible,
    isLoginModal,
    setIsLoginModal,
    isSignUpModal,
    setIsSignUpModal,
    showTicketModal,
    setShowTicketModal,
    showTicketSuccess,
    setShowTicketSuccess,
  } = statesFromGlobalContext;

  const [formSearch, setFormSearch] = useState({
    start_station_id: "",
    destination_station_id: "",
    start_date: "",
    qty: "",
  });

  const handleChange = (e) => {
    setFormSearch({
      ...formSearch,
      [e.target.name]: e.target.value,
    });
  };

  let { data: stations, refetch } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    return response.data.data.stations;
  });

  useEffect(() => {
    refetch();
  }, [stations]);

  const hideModalHandler = () => {
    setIsModalVisible(false);
    setIsSignUpModal(false);
    setIsLoginModal(false);
    setShowTicketModal(false);
    setShowTicketSuccess(false);
  };

  let { data: tickets } = useQuery("ticketCache", async () => {
    const response = await API.get("/tickets");

    return response.data.data;
  });

  const [filteredTicket, setFilteredTicket] = useState([]);
  const handleFilter = (e) => {
    e.preventDefault();
    const filtered = tickets?.filter(
      (ticket) =>
        (formSearch.start_station_id == "" ||
          ticket.StartStationID == formSearch.start_station_id) &&
        (formSearch.destination_station_id == "" ||
          ticket.EndStationID == formSearch.destination_station_id)
    );
    setFilteredTicket(filtered);
    console.log("this is filtered data", filtered);
  };

  const resetFilter = () => {
    setFilteredTicket([]);
    setFormSearch({
      start_station_id: "",
      destination_station_id: "",
      start_date: "",
      qty: "",
    });
  };

  const showTicketModalHandler = () => {
    setShowTicketModal(true);
  };

  return (
    <>
      {isModalVisible && (
        <ModalManual onClick={hideModalHandler}>
          {isLoginModal ? <Login /> : <></>}
          {isSignUpModal ? <SignUp /> : <></>}
        </ModalManual>
      )}
      {showTicketModal && (
        <>
          <ModalManual onClick={hideModalHandler}>
            <Login />
          </ModalManual>
        </>
      )}
      {showTicketSuccess && (
        <>
          <ModalManual onClick={hideModalHandler}>
            <div className="p-4 text-center">
              Tiket anda berhasil di tambahkan silakan segera melakukan
              pembayaran <br />{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  navigate("/myTicket");
                  hideModalHandler();
                }}
              >
                Klik disini
              </span>
            </div>
          </ModalManual>
        </>
      )}

      <div className="min-h-screen mb-20">
        <div className="jumbotron h-[300px] bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] flex justify-around">
          <div className="leftContentJumbotron flex justify-center items-center">
            <div className="Lefttext flex flex-col justify-center">
              <span className="font-[Sen] font-black text-4xl text-white mb-[17px]">
                Selamat Pagi, Ticket Seekers!
              </span>
              <div className="flex flex-col gap-y-1">
                <span className="font-[Sen] font-normal text-2xl text-white">
                  Ingin Pulkam dengan Good Deal?
                </span>
                <span className="font-[Sen] font-normal text-2xl text-white">
                  Masuk atau Daftar Sekarang!
                </span>
              </div>
            </div>
          </div>
          <div className="rightContentJumbotron w-[562px] flex items-center justify-center">
            <LazyLoadImage effect="blur" src="/assets/Iklan.png" alt="iklan" />
          </div>
        </div>
        <div className="relative top-[-2rem] flex mx-40 rounded-md shadow-xl">
          <div className="bg-slate-300 flex-[20%] rounded-l-md">
            <div className="flex items-center bg-white mt-6 border-l-[9px] border-[#E67E22]">
              <LazyLoadImage
                effect="blur"
                src="/assets/smallTrain.png"
                alt="train"
                className="w-[30px] h-[30px]"
              />
              <div className="font-bold">
                <h6>Tiket Kereta Api</h6>
              </div>
            </div>
          </div>
          <div className="flex-[80%] bg-white p-3 rounded-r-md">
            <form>
              <div className="flex justify-between">
                <h4 className="font-semibold">Tiket Kereta Api</h4>

                <span
                  className="cursor-pointer"
                  onClick={() => {
                    resetFilter();
                  }}
                >
                  Reset Filter
                </span>
              </div>
              <div className="flex">
                <div className="flex-[50%]">
                  <div>
                    <label
                      htmlFor="start_station_id"
                      className="block mb-2 text-sm font-bold text-gray-900"
                    >
                      Asal
                    </label>
                    <select
                      name="start_station_id"
                      id="start_station_id"
                      onChange={handleChange}
                      className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      value={formSearch.start_station_id}
                    >
                      {stations?.map((item) => (
                        <option key={item.id} value={item?.id}>
                          {item.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex">
                    <div className="mt-3">
                      <label
                        htmlFor="start_date"
                        className="block mb-2 text-sm font-bold text-gray-900"
                      >
                        Tanggal Berangkat
                      </label>
                      <input
                        onChange={handleChange}
                        value={formSearch.start_date}
                        type="date"
                        id="start_date"
                        name="start_date"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                      />
                    </div>
                    <div className="flex-[50%] w-auto">
                      <div className="flex items-center justify-center mt-3.5">
                        <Checkbox id="pp" name="checkbox" />
                        <label
                          htmlFor="pp"
                          className="ml-2 block text-sm font-bold text-gray-900"
                        >
                          Pulang Pergi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start mt-7 mx-10">
                  <LazyLoadImage
                    effect="blur"
                    className="w-12 h-10"
                    src="/assets/Rounded.png"
                    alt="twoway"
                  />
                </div>
                <div className="flex-[50%]">
                  <div>
                    <label
                      htmlFor="destination"
                      className="block mb-2 text-sm font-bold text-gray-900"
                    >
                      Tujuan
                    </label>
                    <select
                      name="destination_station_id"
                      id="destination"
                      onChange={handleChange}
                      className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      value={formSearch.destination_station_id}
                    >
                      {stations?.map((item) => (
                        <option key={item.id} value={item?.id}>
                          {item.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <label
                        htmlFor="qty"
                        className="block my-1 text-sm text-center font-bold text-gray-900"
                      >
                        Dewasa
                      </label>
                      <select
                        type="text"
                        name="qty"
                        id="qty"
                        className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                        onChange={handleChange}
                        value={formSearch.qty}
                      >
                        <optgroup
                          label="
                          Dewasa ≥ 3 Tahun"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="mr-2">
                      <label
                        htmlFor="anak"
                        className="block my-1 text-center text-sm font-bold text-gray-900"
                      >
                        Bayi
                      </label>
                      <select
                        type="text"
                        name="anak"
                        id="anak"
                        className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                        onChange={handleChange}
                      >
                        <optgroup label="Anak - Anak ≤ 3 Tahun">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </optgroup>
                      </select>
                    </div>
                    <Button
                      onClick={(e) => handleFilter(e)}
                      gradientDuoTone="pinkToOrange"
                      type="submit"
                      className="w-full text-white mt-6 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]"
                    >
                      Cari Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container mx-auto mt-5 ">
          <div className="w-[90%]  mx-auto">
            <div className="flex justify-around font-bold">
              <h2 className="font-bold mr-14">Nama Kereta</h2>
              <h2 className="font-bold">Berangkat</h2>
              <h2 className="font-bold opacity-0  ">Tiba</h2>
              <h2 className="font-bold">Tiba</h2>
              <h2 className="font-bold">Durasi</h2>
              <h2 className="font-bold">Harga Per Orang</h2>
            </div>
          </div>

          <Ticket
            filteredTickets={filteredTicket}
            onClickHide={hideModalHandler}
            onClickShow={showTicketModalHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
