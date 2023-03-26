import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const Ticket = ({ filteredTickets, onClickShow }) => {
  const { statesFromGlobalContext, functionHandlers } =
    useContext(GlobalContext);
  const { setShowTicketSuccess } = statesFromGlobalContext;
  const [state] = useContext(UserContext);
  const { price } = functionHandlers;

  let { data: stations, refetch } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    return response.data.data.stations;
  });

  const HandleBuy = async (id) => {
    try {
      const response = await API.post(`/create-trans/${id}`);
      setShowTicketSuccess(true);
      console.log("ini beli", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [stations]);

  let { data: tickets } = useQuery("ticketCache", async () => {
    const response = await API.get("/tickets");

    return response.data.data;
  });

  function toMinutes(time) {
    time = /^(\d{1,2}):(\d{2})$/.exec(time);
    return time[1] * 60 + +time[2];
  }

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " Jam " + rminutes + " menit";
  }

  if (filteredTickets !== undefined && filteredTickets.length > 0) {
    // return filtered tickets
    return (
      <>
        {filteredTickets?.map((ticket, index) => (
          <div
            key={index}
            className="flex flex-col mt-5 gap-y-8 "
            onClick={() => {
              {
                if (state.isLogin === false) {
                  onClickShow(true);
                } else if (state.user.role === "admin") {
                  Swal.fire({
                    title: "You are an admin!",
                    icon: "error",
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
                } else {
                  Swal.fire({
                    title: "Are you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, proceed to buy!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      HandleBuy(ticket?.id);
                      Swal.fire(
                        "Ticket added",
                        "Ticket has been added to your profile.",
                        "success"
                      );
                    }
                  });
                }
              }
            }}
          >
            <div className="flex justify-center cursor-pointer">
              <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex justify-around items-center">
                <div className="trainName flex flex-col">
                  <span className="font-[Sen] font-black text-lg">
                    {ticket?.train_name}
                  </span>
                  <span>{ticket?.train_type}</span>
                </div>
                <div className="start flex items-center">
                  <div className="flex flex-col">
                    <span className="font-[Sen] font-black text-lg">
                      {ticket?.start_time}
                    </span>
                    <span>{ticket?.StartStation.name}</span>
                  </div>
                </div>
                <div>
                  <img src="/assets/arrow.png" alt="test" />
                </div>
                <div className="arrival flex flex-col">
                  <span className="font-[Sen] font-black text-lg">
                    {ticket?.arrival_time}
                  </span>
                  <span>{ticket?.EndStation.name}</span>
                </div>
                <div className="duration">
                  <span>
                    {timeConvert(
                      toMinutes(ticket?.start_time, ticket?.arrival_time)
                    )}
                  </span>
                </div>
                <div>
                  <span>{price.format(ticket?.price)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    {
      // return all tickets
    }
    return (
      <>
        {tickets?.map((ticket, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-5 gap-y-8 "
              onClick={() => {
                {
                  if (state.isLogin === false) {
                    onClickShow(true);
                  } else {
                    Swal.fire({
                      title: "Are you sure?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, proceed to buy!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        HandleBuy(ticket?.id);
                        Swal.fire(
                          "Ticket added",
                          "Ticket has been added to your profile.",
                          "success"
                        );
                      }
                    });
                  }
                }
              }}
            >
              <div className="flex justify-center ">
                <div className="w-[90%] h-[100px] bg-white shadow-navbarShadow hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex justify-around items-center">
                  <div className="trainName flex flex-col">
                    <span className="font-[Sen] font-black text-lg">
                      {ticket?.train_name}
                    </span>
                    <span>{ticket?.train_type}</span>
                  </div>
                  <div className="start flex items-center">
                    <div className="flex flex-col">
                      <span className="font-[Sen] font-black text-lg">
                        {ticket?.start_time}
                      </span>
                      <span>{ticket?.StartStation.name}</span>
                    </div>
                  </div>
                  <div>
                    <img src="/assets/arrow.png" alt="test" />
                  </div>
                  <div className="arrival flex flex-col">
                    <span className="font-[Sen] font-black text-lg">
                      {ticket?.arrival_time}
                    </span>
                    <span>{ticket?.EndStation.name}</span>
                  </div>
                  <div className="duration">
                    <span>
                      {timeConvert(
                        toMinutes(ticket?.start_time, ticket?.arrival_time)
                      )}
                    </span>
                  </div>
                  <div>
                    <span>{price.format(ticket?.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
};

export default Ticket;
