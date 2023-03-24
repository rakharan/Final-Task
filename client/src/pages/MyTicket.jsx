import React, { useContext, useState } from "react";
import { Card, Table } from "flowbite-react";
import Button from "../parts/Button";
import Modal from "../components/Modal/Modal";
import TicketDetail from "../components/ticketDetail/TicketDetail";
import { GlobalContext } from "../context/GlobalContext";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
const MyTicket = () => {
  const [state] = useContext(UserContext);
  const { statesFromGlobalContext } = useContext(GlobalContext);
  const [showDetail, setShowDetail] = useState(true);
  const handleClose = () => {
    setShowDetail(false);
  };
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/user/" + state.user.id);
    return response.data.data;
  });
  let { data: myTicket } = useQuery("myTicketCache", async () => {
    const response = await API.get("/order-user");
    return response.data.data;
  });
  console.log(myTicket);
  return (
    <>
      {showDetail ? (
        <Modal onClick={handleClose}>
          <TicketDetail />
        </Modal>
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
            <div className="flex justify-center items-center">
              <img src={ticket} alt="" className="w-60 h-52" />
            </div>
          </div>
        ) : (
          <div className="mx-[90px] mt-7">
            {myTicket?.map((item, index) => (
              <Card className="mb-5 pb-4" key={index}>
                <div className="flex">
                  <div className="flex-[80%]">
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
                      onClick={() => handlePayment(item?.id)}
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
