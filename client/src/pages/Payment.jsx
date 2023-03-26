import React, { useContext, useEffect } from "react";
import { Card, Table } from "flowbite-react";
import Button from "../parts/Button";
import { GlobalContext } from "../context/GlobalContext";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
const Payment = () => {
  const { functionHandlers, statesFromGlobalContext } =
    useContext(GlobalContext);
  const { tempId } = statesFromGlobalContext;
  const { price } = functionHandlers;

  let { data: currentTicketData, refetch } = useQuery(
    "currentTicket",
    async () => {
      const response = await API.get("get-idpayment/" + tempId);
      return response.data.data;
    }
  );

  const handlePay = useMutation(async (id) => {
    try {
      const response = await API.get(`/payments/` + id);
      const token = response.data.data.token;
      console.log(response);
      console.log(token);
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          console.log(result);
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-QgmV3utYY1T-l0NJ";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    console.log(myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <>
        {currentTicketData == undefined ? (
          <>
            <div className="min-h-screen flex justify-center items-center">
              <h1>There is no invoice to be paid</h1>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto mt-4 px-32">
              <h2 className="font-bold text-3xl mb-4">Invoice</h2>
              <div className="flex flex-col gap-y-4 ">
                <Card className="shadow-navbarShadow hover:shadow-none transition-all duration-300 p-5">
                  <div className="flex">
                    <div className="flex-[70%]">
                      <Card className="mb-5 bg-gray-400 flex text-center">
                        <div className="lefttopicon">
                          <img
                            src="/assets/Landticket.png"
                            alt="my ticket"
                            className="object-cover h-[34px] w-[150px] bg-gradient-to-r from-[#EC7AB7] to-[#EC7A7A] rounded-br-[50px] px-2"
                          />
                        </div>
                        <div className="flex justify-center">
                          <img
                            className="w-10 h-10"
                            src="/assets/error.png"
                            alt="error"
                          />
                        </div>
                        <h3 className="text-md font-medium text-black">
                          PAY YOUR BILL
                        </h3>
                      </Card>
                      <div className="mb-5 detailUser">
                        <Table className="text-center border-2">
                          <Table.Head>
                            <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                            <Table.HeadCell>Nama Pemesanan</Table.HeadCell>
                            <Table.HeadCell>No. Handphone</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                          </Table.Head>
                          <Table.Row>
                            <Table.Cell>
                              {currentTicketData?.user.id}
                            </Table.Cell>
                            <Table.Cell>
                              {currentTicketData?.user.name}
                            </Table.Cell>
                            <Table.Cell>
                              {currentTicketData?.user.phone}
                            </Table.Cell>
                            <Table.Cell>
                              {currentTicketData?.user.email}
                            </Table.Cell>
                          </Table.Row>
                        </Table>
                      </div>
                      <div>
                        <h1 className="font-bold text-2xl my-2">
                          Rincian Harga
                        </h1>
                      </div>
                      <div className="detailPrice">
                        <Card>
                          <div className="flex flex-col divide-y-2">
                            <div className="flex justify-between p-2">
                              <h5 className="font-bold">
                                {currentTicketData?.train_name} (Dewasa) x 1
                              </h5>
                              <span className="font-bold">
                                {price.format(currentTicketData?.ticket.price)}
                              </span>
                            </div>
                            <div className="flex justify-between p-2">
                              <h5 className="font-bold">
                                {currentTicketData?.train_name} (Anak - Anak) x
                                1
                              </h5>
                              <span className="font-bold">
                                {price.format(currentTicketData?.ticket.price)}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
                            <h5 className="font-semibold text-lg">Total</h5>
                            <h5 className="font-extrabold">
                              {price.format(currentTicketData?.ticket.price)}
                            </h5>
                          </div>
                        </Card>
                      </div>
                      <Button
                        onClick={() =>
                          handlePay.mutate(currentTicketData?.transaction_id)
                        }
                        gradientDuoTone="pinkToOrange"
                        className="w-full mt-3"
                      >
                        Pay Now
                      </Button>
                    </div>
                    <div className="flex-[30%] ml-6">
                      <Card className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h2 className="font-bold text-2xl">Kereta Api</h2>
                          </div>
                          <img
                            src="/assets/qr.png"
                            alt="qr"
                            className="w-[50px]"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            {currentTicketData?.train_name}
                          </h3>
                          <h6 className="text-sm">
                            {currentTicketData?.train_type}
                          </h6>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="date flex flex-col gap-y-4">
                            <div>
                              <h6 className="font-bold text-lg">
                                {currentTicketData?.ticket.start_time}
                              </h6>
                              <h6 className="text-sm">
                                {moment(
                                  currentTicketData?.ticket.start_date
                                ).format("LL")}
                              </h6>
                            </div>
                            <div>
                              <h6 className="font-bold text-lg">
                                {currentTicketData?.ticket.arrival_time}
                              </h6>
                              <h6 className="text-sm">
                                {" "}
                                {moment(
                                  currentTicketData?.ticket.start_date
                                ).format("LL")}
                              </h6>
                            </div>
                          </div>
                          <div className="station flex flex-col gap-y-4">
                            <div className="">
                              <h6 className="font-bold text-lg">
                                {currentTicketData?.ticket.start_station.city}
                              </h6>
                              <h6 className="text-sm">
                                {currentTicketData?.ticket.start_station.name}
                              </h6>
                            </div>
                            <div>
                              <h6 className="font-bold text-lg">
                                {
                                  currentTicketData?.ticket.destination_station
                                    .city
                                }
                              </h6>
                              <h6 className="text-sm">
                                {
                                  currentTicketData?.ticket.destination_station
                                    .name
                                }
                              </h6>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Payment;
