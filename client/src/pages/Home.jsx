import React, { useContext, useState, useEffect } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Modal from "../components/Modal/Modal";
import Button from "../parts/Button";
import { Checkbox } from "flowbite-react";
import { GlobalContext } from "../context/GlobalContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { statesFromGlobalContext, functionHandlers } =
    useContext(GlobalContext);
  const {
    isModalVisible,
    setIsModalVisible,
    isLoginModal,
    setIsLoginModal,
    isSignUpModal,
    setIsSignUpModal,
  } = statesFromGlobalContext;

  const { price } = functionHandlers;

  const [showTicketModal, setShowTicketModal] = useState(false);
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
  };

  let { data: tickets } = useQuery("ticketCache", async () => {
    const response = await API.get("/tickets");

    return response.data.data;
  });

  const HandleBuy = async (id) => {
    try {
      const response = await API.post(`/create-trans/${id}`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isModalVisible ? (
        <Modal onClick={hideModalHandler}>
          {isLoginModal ? <Login /> : <></>}
          {isSignUpModal ? <SignUp /> : <></>}
        </Modal>
      ) : (
        <></>
      )}

      {showTicketModal ? (
        <div>
          <Modal onClick={hideModalHandler}>
            <p>
              Tiket anda berhasil ditambahkan silakan segera melakukan
              pembayaran
            </p>{" "}
            <br />
            <p>
              Klik{" "}
              <span
                onClick={() => {
                  navigate("/myTicket");
                }}
              >
                disini
              </span>
            </p>
          </Modal>
        </div>
      ) : (
        <></>
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
            <img src="/assets/Iklan.png" alt="" />
          </div>
        </div>
        <div className="relative top-[-2rem] flex mx-40 rounded-md shadow-xl">
          <div className="bg-slate-300 flex-[20%] rounded-l-md">
            <div className="flex items-center bg-white mt-6 border-l-[9px] border-[#E67E22]">
              <img
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
              <h4 className="font-semibold">Tiket Kereta Api</h4>
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
                      // onChange={handleChange}
                      className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <option hidden>Jakarta</option>
                      {stations?.map((item, index) => (
                        <option key={index} value={item?.id}>
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
                        // onChange={handleChange}
                        // value={formSearch.start_date}
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
                  <img
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
                      // onChange={handleChange}
                      className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <option hidden>Cirebon</option>
                      {stations?.map((item, index) => (
                        <option key={index} value={item?.id}>
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
                        // onChange={handleChange}
                        // value={formSearch.qty}
                      >
                        <option value="" disabled>
                          Dewasa ≥ 3 Tahun
                        </option>
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
                        // onChange={handleChange}
                      >
                        <option value="" disabled>
                          Anak - Anak ≤ 3 Tahun
                        </option>
                      </select>
                    </div>
                    <Button
                      onClick={(e) => handleSearch(e)}
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
              <h2 className="font-bold mr-28">Nama Kereta</h2>
              <h2 className="font-bold">Berangkat</h2>
              <h2 className="font-bold ">Tiba</h2>
              <h2 className="font-bold">Durasi</h2>
              <h2 className="font-bold">Harga Per Orang</h2>
            </div>
          </div>
          {tickets?.map((ticket, index) => {
            return (
              <div
                key={index}
                className="flex flex-col mt-5 gap-y-8"
                onClick={() => {
                  setShowTicketModal(true);
                  HandleBuy(ticket.id);
                }}
              >
                <div className="flex justify-center">
                  <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow rounded-lg overflow-hidden flex justify-around items-center">
                    <div className="trainName flex flex-col">
                      <span className="font-[Sen] font-black text-lg">
                        {ticket.train_name}
                      </span>
                      <span>{ticket.train_type}</span>
                    </div>
                    <div className="start flex items-center">
                      <div className="flex flex-col">
                        <span className="font-[Sen] font-black text-lg">
                          {ticket.start_time}
                        </span>
                        <span>{ticket.StartStation.name}</span>
                      </div>
                    </div>
                    <div className="arrival flex flex-col">
                      <span className="font-[Sen] font-black text-lg">
                        {ticket.arrival_time}
                      </span>
                      <span>{ticket.EndStation.name}</span>
                    </div>
                    <div className="duration">
                      <span>5j 0m</span>
                    </div>
                    <div>
                      <span>{price.format(ticket.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="sort flex justify-center -mt-5">
          <div className="w-[90%] shadow-navbarShadow bg-white flex rounded-xl overflow-hidden">
            <div className="leftContentSort bg-[#F2F2F2] flex-[1_1_0%]">
              <div className="border-l-[9px] border-[#E67E22] flex h-[53px] gap-x-2 items-center just mt-3">
                <img
                  src="/assets/smallTrain.png"
                  alt="smallTrain"
                  className="w-[30px] h-[30px]"
                />
                <span className="font-[Sen] text-lg font-light">
                  Tiket Kereta Api
                </span>
              </div>
            </div>
            <div className="rightContentSort flex-[4_1_0%]  px-[30px] py-2 h-[236px]">
              <span>Tiket Kereta Api</span>
              <div className="flex justify-between items-center py-2 h-full">
                <div className="leftContent w-full flex flex-col justify-around flex-1">
                  <div className="flex flex-col">
                    <span>Asal</span>
                    <input
                      type="text"
                      placeholder="Jakarta"
                      className="border-2 w-full"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <span>Tanggal Berangkat</span>
                      <input
                        type="date"
                        name="startDate"
                        id=""
                        className="border-2"
                      />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="twoway"
                        id="twoway"
                        className="border-2"
                      />
                      <label htmlFor="twoway">Pulang Pergi</label>
                    </div>
                  </div>
                </div>
                <div className="midImage w-[50px]">
                  <img
                    src="/assets/Rounded.png"
                    alt="rounded"
                    className="w-full"
                  />
                </div>
                <div className="rightContent w-full flex flex-col justify-around flex-1">
                  <div className="flex flex-col">
                    <span>Tujuan</span>
                    <input
                      type="text"
                      placeholder="Surabaya"
                      className="border-2 w-full"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="">
                      <label htmlFor="dewasa">Dewasa</label>
                      <input
                        type="number"
                        name="dewasa"
                        id=""
                        className="border-2 h-[30px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>Dewasa</span>
                      <input
                        type="number"
                        name="dewasa"
                        id=""
                        className="border-2 h-[30px]"
                      />
                    </div>
                    <div>
                      <Button className=" h-[30px]">Cari Tiket</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContent mt-20">
          <div className="flex justify-center">
            <div className=" w-[90%] header flex justify-around text-center ">
              <span>Nama Kereta</span>
              <span>Berangkat</span>
              <span>Tiba</span>
              <span>Durasi</span>
              <span>Harga Per Orang</span>
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-y-8">
            <div className="flex justify-center">
              <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow rounded-lg overflow-hidden flex justify-around items-center">
                <div className="trainName flex flex-col">
                  <span className="font-[Sen] font-black text-lg">
                    Argo Wilis
                  </span>
                  <span>Eksekutif</span>
                </div>
                <div className="start flex items-center">
                  <div className="flex flex-col">
                    <span className="font-[Sen] font-black text-lg">05:00</span>
                    <span>Gambir</span>
                  </div>
                </div>
                <div className="arrival flex flex-col">
                  <span className="font-[Sen] font-black text-lg">10:05</span>
                  <span>Surabaya</span>
                </div>
                <div className="duration">
                  <span>5j 0m</span>
                </div>
                <div>
                  <span>Rp. 250.000</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow rounded-lg overflow-hidden flex justify-around items-center">
                <div className="trainName flex flex-col">
                  <span className="font-[Sen] font-black text-lg">
                    Argo Wilis
                  </span>
                  <span>Eksekutif</span>
                </div>
                <div className="start flex items-center">
                  <div className="flex flex-col">
                    <span className="font-[Sen] font-black text-lg">05:00</span>
                    <span>Gambir</span>
                  </div>
                </div>
                <div className="arrival flex flex-col">
                  <span className="font-[Sen] font-black text-lg">10:05</span>
                  <span>Surabaya</span>
                </div>
                <div className="duration">
                  <span>5j 0m</span>
                </div>
                <div>
                  <span>Rp. 250.000</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow rounded-lg overflow-hidden flex justify-around items-center">
                <div className="trainName flex flex-col">
                  <span className="font-[Sen] font-black text-lg">
                    Argo Wilis
                  </span>
                  <span>Eksekutif</span>
                </div>
                <div className="start flex items-center">
                  <div className="flex flex-col">
                    <span className="font-[Sen] font-black text-lg">05:00</span>
                    <span>Gambir</span>
                  </div>
                </div>
                <div className="arrival flex flex-col">
                  <span className="font-[Sen] font-black text-lg">10:05</span>
                  <span>Surabaya</span>
                </div>
                <div className="duration">
                  <span>5j 0m</span>
                </div>
                <div>
                  <span>Rp. 250.000</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
