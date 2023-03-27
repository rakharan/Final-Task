import React, { useState, useEffect } from "react";
import Button from "../parts/Button";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import ModalManual from "../components/Modal/ModalManual";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const AddStation = () => {
  document.title = "LandTick | Admin Add Station";

  let { data: stationList, refetch } = useQuery("allStationCache", async () => {
    const response = await API.get("/stations");
    return response.data.data;
  });

  const [form, setForm] = useState({
    station_name: "",
    station_city: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  async function handleDelete(id) {
    await API.delete("/station/" + id);
    refetch();
  }
  const [stationDetail, setStationDetail] = useState([]);
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name", form.station_name);
      formData.set("city", form.station_city);

      const response = await API.post("/station", formData);
      if (response.status === 200) {
        Swal.fire({
          title: "New Station has been added!",
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
        setForm({
          station_name: "",
          station_city: "",
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    setForm({
      station_name: stationDetail[0]?.name,
      station_city: stationDetail[0]?.city,
    });
  }, [stationDetail]);
  const handleSubmitUpdate = useMutation(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", form.station_name);
    formData.set("city", form.station_city);

    const response = await API.patch(
      "/station/" + stationDetail[0].id,
      formData
    );
    if (response.status === 200) {
      Swal.fire({
        title: "Station has been updated!",
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
      setForm({
        station_name: "",
        station_city: "",
      });
      refetch();
    }
  });

  //   filtering station based on id for update
  const filterStation = (stationID) => {
    const filtered = stationList.stations.filter((e) => e.id === stationID);
    setStationDetail(filtered);
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const hideEditModal = () => {
    setShowEditModal(false);
  };
  return (
    <>
      <>
        {showEditModal && (
          <>
            <ModalManual onClick={hideEditModal}>
              <div className="p-4">
                <h1>Edit Station</h1>
                <form
                  action=""
                  className="flex flex-col gap-y-4"
                  onSubmit={(e) => {
                    handleSubmitUpdate.mutate(e);
                  }}
                >
                  <input
                    type="text"
                    name="station_name"
                    onChange={handleChange}
                    value={form?.station_name}
                    placeholder="station name"
                  />
                  <input
                    type="text"
                    name="station_city"
                    onChange={handleChange}
                    value={form?.station_city}
                    placeholder="station city"
                  />
                  <div className="flex justify-center">
                    <Button className="text-white bg-[#0ACF83] border-transparent">
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </ModalManual>
          </>
        )}
      </>
      <div className="flex mt-20 justify-center items-center ">
        <>
          <table className="h-[200px]">
            <thead className=" text-xs text-gray-700  bg-gray-50 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  No
                </th>
                <th scope="col" className="py-3 px-6">
                  Stasiun
                </th>
                <th scope="col" className="py-3 px-6">
                  Kota
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center odd:children:bg-slate-200 even:children:bg-white">
              {stationList?.stations.map((station, index) => {
                return (
                  <tr className="gap-x-4" key={station.id}>
                    <th className="py-4 px-6">{index + 1}</th>
                    <td className="py-4 px-6">{station.name}</td>
                    <td className="py-4 px-6">{station.city}</td>
                    <td className="py-4 px-6 flex gap-x-8">
                      <div className="cursor-pointer">
                        <LazyLoadImage
                          effect="blur"
                          src="/assets/edit.png"
                          alt="detail"
                          className="w-[25px] cursor-pointer"
                          onClick={() => {
                            setShowEditModal(true);
                            filterStation(station.id);
                          }}
                        />
                      </div>
                      <div>
                        <LazyLoadImage
                          effect="blur"
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
                                handleDelete(station.id);
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
      </div>

      <div className="container mx-auto  p-20 flex flex-col items-center min-h-screen justify-center">
        <div className="text-center w-full font-bold text-lg">
          <h2 className="">Add Ticket</h2>
        </div>
        <div className="formContainer w-[80%]">
          <form
            className="flex flex-col gap-y-2"
            onSubmit={(e) => {
              handleSubmit.mutate(e);
            }}
          >
            <input
              type="text"
              name="station_name"
              placeholder="Nama Stasiun"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.station_name}
            />
            <input
              type="text"
              name="station_city"
              placeholder="Nama Kota Stasiun"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.station_city}
            />

            <div className="flex justify-center mt-10 w-full">
              <Button className="text-white bg-[#0ACF83] border-transparent">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStation;
