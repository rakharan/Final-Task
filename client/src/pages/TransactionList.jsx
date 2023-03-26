import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import ModalManual from "../components/Modal/ModalManual";
import { GlobalContext } from "../context/GlobalContext";
import moment from "moment";
import Swal from "sweetalert2";
const TransactionList = () => {
  const { functionHandlers } = useContext(GlobalContext);
  const { price } = functionHandlers;

  const [showDetail, setShowDetail] = useState(false);
  const hideModalHandler = () => {
    setShowDetail(false);
  };
  let { data: transactionList, refetch } = useQuery(
    "allTansactionCache",
    async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    }
  );

  const [transactionDetail, setTransactionDetail] = useState([]);
  const filterTx = (txID) => {
    const filtered = transactionList.filter((e) => e.id === txID);
    setTransactionDetail(filtered);
  };

  async function handleDelete(id) {
    await API.delete("/transaction/" + id);
    refetch();
  }
  return (
    <>
      <>
        {showDetail ? (
          <div>
            <ModalManual onClick={hideModalHandler}>
              <>
                <div className="w-[800px]">
                  <div className="header flex justify-between">
                    <div className="leftHeader pl-8 mt-4">
                      <h1 className="font-[Sen] font-extrabold text-5xl">
                        E-Ticket
                      </h1>
                      <span>Kode Invoice : #INV{transactionDetail[0].id}</span>
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
                                    transactionDetail[0].ticket.start_date
                                  ).format("LL")}
                                </time>
                              </div>
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {
                                    transactionDetail[0].ticket.start_station
                                      .city
                                  }
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {
                                    transactionDetail[0].ticket.start_station
                                      .name
                                  }
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
                                  {transactionDetail[0].ticket.arrival_time}
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {moment(
                                    transactionDetail[0].ticket.start_date
                                  ).format("LL")}
                                </time>
                              </div>
                              <div>
                                {" "}
                                <h3 class="text-lg font-semibold text-gray-900">
                                  {
                                    transactionDetail[0].ticket
                                      .destination_station.city
                                  }
                                </h3>
                                <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                                  {
                                    transactionDetail[0].ticket
                                      .destination_station.name
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
                        <img
                          src="/assets/qr.png"
                          className="w-[200px]"
                          alt="qr"
                        />
                      </div>
                      <span>{transactionDetail[0].id}</span>
                    </div>
                  </div>
                  <div className="flex px-8 py-2 justify-between text-center border-y-2">
                    <div>
                      <h1>No. Tanda Pengenal</h1>
                      <span className=" opacity-50">
                        {transactionDetail[0].user.id}
                      </span>
                    </div>
                    <div>
                      <h1>Nama Pemesan</h1>
                      <span className=" opacity-50">
                        {transactionDetail[0].user.name}
                      </span>
                    </div>
                    <div>
                      <h1>No. Handphone</h1>
                      <span className=" opacity-50">
                        {transactionDetail[0].user.phone}
                      </span>
                    </div>
                    <div>
                      <h1>Email</h1>
                      <span className=" opacity-50">
                        {transactionDetail[0].user.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between px-8 py-2 font-extrabold bg-slate-300 text-2xl">
                    <h1>Total</h1>
                    <span>
                      {price.format(transactionDetail[0].ticket.price)}
                    </span>
                  </div>
                </div>
              </>
            </ModalManual>
          </div>
        ) : (
          <></>
        )}
      </>
      <div className="w-full min-h-screen px-20 bg-zinc-100 flex flex-col justify-center items-center">
        <div className="w-full pt-10 font-bold text-4xl mb-5 text-center">
          List Transaksi
        </div>
        <div>
          {/* TABLE */}
          {transactionList?.length > 0 ? (
            <>
              <table>
                <thead className=" text-xs text-gray-700  bg-gray-50 ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      User
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tiket
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status Payment
                    </th>

                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center odd:children:bg-slate-200 even:children:bg-white">
                  {transactionList?.map((data, index) => {
                    return (
                      <tr key={data.id} className="gap-x-4 ">
                        <th className="py-4 px-6">{index + 1}</th>
                        <td className="py-4 px-6">{data.user.name}</td>
                        <td className="py-4 px-6">
                          {data.ticket.start_station.name} -{" "}
                          {data.ticket.destination_station.name}
                        </td>
                        <td className="py-4 px-6">{data.status}</td>
                        <td className="py-4 px-6 flex gap-x-8">
                          <div className="cursor-pointer">
                            <img
                              src="/assets/search.png"
                              alt="detail"
                              className="w-[25px] cursor-pointer"
                              onClick={() => {
                                setShowDetail(true);
                                filterTx(data.id);
                              }}
                            />
                          </div>
                          <div>
                            <img
                              src="/assets/trash.png"
                              alt="detail"
                              className="w-[25px] cursor-pointer"
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleDelete(data.id);
                                    Swal.fire(
                                      "Deleted!",
                                      "Your file has been deleted.",
                                      "success"
                                    );
                                  }
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div>
                <h1>There is no transaction data.</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
