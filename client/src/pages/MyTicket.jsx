import React, { useContext, useEffect, useState } from "react";
import { Card, Table } from "flowbite-react";
import Button from "../parts/Button";
import ModalManual from "../components/Modal/ModalManual";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
const MyTicket = () => {
  const navigate = useNavigate();
  const { statesFromGlobalContext } = useContext(GlobalContext);
  const { setCurrentTicket, tempId, setTempId } = statesFromGlobalContext;
  const [state] = useContext(UserContext);
  const [showDetail, setShowDetail] = useState(false);
  const handleClose = () => {
    setShowDetail(false);
  };

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/user/" + state.user.id);
    return response.data.data;
  });

  const [transactionDetail, setTransactionDetail] = useState([]);

  let { data: myTicket } = useQuery("myTicketCache", async () => {
    const response = await API.get("/order-user");
    return response.data.data;
  });

  const filterTx = (txID) => {
    const filtered = myTicket.filter((e) => e.id === txID);
    setTransactionDetail(filtered);
  };

  return (
    <>
      {showDetail ? (
        <ModalManual onClick={handleClose}>
          <>
            <div className="w-[800px] pb-4 ">
              <div className="header flex justify-between">
                <div className="leftHeader pl-8 mt-4">
                  <h1 className="font-[Sen] font-extrabold text-5xl">
                    E-Ticket
                  </h1>
                  <span>Kode Invoice : #INV{transactionDetail[0]?.id}</span>
                </div>
                <div className="rightHeader">
                  <div className="lefttopicon">
                    <img
                      src="/assets/Landticket.png"
                      alt="my ticket"
                      className="object-cover h-[61px] w-[300px] bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] rounded-bl-[50px] px-14"
                    />
                  </div>
                </div>
              </div>
              <div className="mid flex justify-between mt-20 px-8">
                <div className="leftContent">
                  <div className="leftHeader">
                    <h1 className="font-[Sen] text-4xl font-semibold">
                      Kereta Api
                    </h1>
                    <p>{moment().format("dddd, MMMM Do YYYY")}</p>
                  </div>
                  <div className="leftTrain mt-9">
                    <h1 className="font-[Sen] text-2xl font-extrabold">
                      {transactionDetail[0]?.ticket.train_name}
                    </h1>
                    <span>{transactionDetail[0]?.ticket.train_type}</span>
                  </div>
                  <div>
                    <ol class="relative border-l border-gray-200">
                      <li class="mb-10 ml-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                        <div className="flex gap-x-10">
                          <div>
                            {" "}
                            <h3 class="text-lg font-semibold text-gray-900">
                              {transactionDetail[0]?.ticket.start_time}
                            </h3>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                              {moment(
                                transactionDetail[0]?.ticket.start_date
                              ).format("LL")}
                            </time>
                          </div>
                          <div>
                            {" "}
                            <h3 class="text-lg font-semibold text-gray-900">
                              {transactionDetail[0]?.ticket.start_station.city}
                            </h3>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                              {transactionDetail[0]?.ticket.start_station.name}
                            </time>
                          </div>
                        </div>
                      </li>
                      <li class="mb-10 ml-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                        <div className="flex gap-x-10">
                          <div>
                            {" "}
                            <h3 class="text-lg font-semibold text-gray-900">
                              {transactionDetail[0]?.ticket.arrival_time}
                            </h3>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                              {moment(
                                transactionDetail[0]?.ticket.start_date
                              ).format("LL")}
                            </time>
                          </div>
                          <div>
                            {" "}
                            <h3 class="text-lg font-semibold text-gray-900">
                              {
                                transactionDetail[0]?.ticket.destination_station
                                  .city
                              }
                            </h3>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                              {
                                transactionDetail[0]?.ticket.destination_station
                                  .name
                              }
                            </time>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="rightContent flex flex-col items-center mt-10">
                  <div className="image">
                    <img src="/assets/qr.png" className="w-[200px]" alt="qr" />
                  </div>
                  <span>TCK0101</span>
                </div>
              </div>
              <div className="flex border-y-2 px-8 py-5">
                <div className="flex gap-x-4 ">
                  <img src="/assets/pass.png" alt="" className="w-10" />
                  <div className="flex">
                    <span className="font-[Sen] text-xs">
                      Tunjukkan e-ticket dan identitas para penumpang saat
                      checkin
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <img src="/assets/clock.png" alt="" className="w-10" />
                  <div className="flex">
                    <span className="font-[Sen] text-xs">
                      Check-in paling lambat 90 menit sebelum keberangkatan
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <img src="/assets/warning.png" alt="" className="w-10" />
                  <div className="flex">
                    <span className="font-[Sen] text-xs">
                      Waktu tertera adalah waktu stasiun setempat
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex px-8 py-2 justify-between">
                <div>
                  <h1>No. Tanda Pengenal</h1>
                  <span className=" opacity-50">
                    {transactionDetail[0]?.user.id}
                  </span>
                </div>
                <div>
                  <h1>Nama Pemesan</h1>
                  <span className=" opacity-50">
                    {transactionDetail[0]?.user.name}
                  </span>
                </div>
                <div>
                  <h1>No. Handphone</h1>
                  <span className=" opacity-50">
                    {transactionDetail[0]?.user.phone}
                  </span>
                </div>
                <div>
                  <h1>Email</h1>
                  <span className=" opacity-50">
                    {transactionDetail[0]?.user.email}
                  </span>
                </div>
              </div>
            </div>
          </>
        </ModalManual>
      ) : (
        <></>
      )}
      <Card className="mt-10 rounded-none shadow-none border-0 ml-20">
        <h3 className="font-bold text-xl">My-Ticket</h3>
        {myTicket === null ? (
          <div>
            <h2 className="text-center text-red-600 font-semibold text-2xl mb-5">
              Tiket Not Found.
            </h2>
          </div>
        ) : (
          <div className="mx-[90px] mt-7">
            {myTicket?.map((item) => (
              <Card className="mb-5 pb-4 cursor-pointer" key={item.id}>
                <div className="flex">
                  <div
                    className="flex-[80%]"
                    onClick={() => {
                      setShowDetail(true);
                      filterTx(item.id);
                    }}
                  >
                    <div className="lefttopicon">
                      <img
                        src="/assets/Landticket.png"
                        alt="my ticket"
                        className="object-cover h-[34px] w-[150px] bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] rounded-br-[50px] px-2"
                      />
                    </div>
                    <div className="flex px-4 gap-x-11 mt-5">
                      <div className="flex flex-col gap-y-2 items-start">
                        <h3 className="font-bold text-lg">
                          {item?.ticket.train_name}
                        </h3>
                        <h6 className="text-sm">{item?.ticket.train_type}</h6>
                        <span className="bg-yellow-100 px-2 py-1 mt-2 text-center rounded-sm w-[70px]">
                          Pending
                        </span>
                      </div>
                      <div>
                        <ol class="relative border-l border-gray-200">
                          <li class="mb-10 ml-4">
                            <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                            <div className="flex justify-between gap-x-4">
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {item?.ticket.start_time}
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {moment(item?.ticket.start_date).format("LL")}
                                </time>
                              </div>
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {item?.ticket.start_station.city}
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {item?.ticket.start_station.name}
                                </time>
                              </div>
                            </div>
                          </li>
                          <li class="mb-10 ml-4">
                            <div class="absolute w-3 h-3 bg-red-600 rounded-full -left-1.5 border border-white"></div>
                            <div className="flex justify-between gap-x-4">
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {item?.ticket.arrival_time}
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {moment(item?.ticket.start_date).format("LL")}
                                </time>
                              </div>
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {item?.ticket.destination_station.city}
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {item?.ticket.destination_station.name}
                                </time>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <Table className="mt-3 text-center">
                      <Table.Head>
                        <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                        <Table.HeadCell>Nama Pemesan</Table.HeadCell>
                        <Table.HeadCell>No. Hp</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                      </Table.Head>
                      <Table.Row>
                        <Table.Cell>{item?.user.id}</Table.Cell>
                        <Table.Cell>{item?.user.name}</Table.Cell>
                        <Table.Cell>{item?.user.phone}</Table.Cell>
                        <Table.Cell>{item?.user.email}</Table.Cell>
                      </Table.Row>
                    </Table>
                  </div>
                  <div className="flex flex-col flex-[20%] text-center justify-between">
                    <span className="mt-4">
                      <h3 className="font-bold text-3xl">Kereta API</h3>
                      <h6 className="text-md font-semibold">
                        {moment().format("MMMM Do YYYY")}
                      </h6>
                    </span>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setTempId(item?.id);
                        navigate("/payment");
                      }}
                      className="w-[80%] mx-auto text-white mt-6 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A]"
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </>
  );
};

export default MyTicket;
