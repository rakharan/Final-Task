import React, { useState, useEffect } from "react";
import Button from "../parts/Button";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
const AddTicket = () => {
  const [form, setForm] = useState({
    train_name: "",
    train_type: "",
    start_date: "",
    start_station_id: "",
    start_time: "",
    destination_station_id: "",
    arrival_time: "",
    price: "",
    qty: "",
  });

  let { data: stations, refetch } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    return response.data.data.stations;
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("train_name", form.train_name);
      formData.set("train_type", form.train_type);
      formData.set("start_date", form.start_date);
      formData.set("start_time", form.start_time);
      formData.set("start_station_id", form.start_station_id);
      formData.set("destination_station_id", form.destination_station_id);
      formData.set("arrival_time", form.arrival_time);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      const response = await API.post("/ticket", formData);
      if (response.status === 200) {
        Swal.fire({
          title: "New product has been added!",
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
          train_name: "",
          train_type: "",
          start_date: "",
          start_station_id: "",
          start_time: "",
          destination_station_id: "",
          arrival_time: "",
          price: "",
          qty: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    refetch();
  }, [stations]);
  return (
    <>
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
              name="train_name"
              placeholder="Nama Kereta"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.train_name}
            />
            <label htmlFor="trainType">Jenis Kereta</label>
            <select
              name="train_type"
              id="trainType"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              required={true}
              value={form.train_type}
            >
              <option hidden>Type of Train</option>
              <option value="Eksekutif Class">Eksekutif Class</option>
              <option value="Bisnis A">Bisnis A</option>
              <option value="Bisnis B">Bisnis B</option>
              <option value="Bisnis C">Bisnis C</option>
              <option value="Ekonomi A">Ekonomi A</option>
              <option value="Ekonomi B">Ekonomi B</option>
              <option value="Ekonomi C">Ekonomi C</option>
            </select>
            <label htmlFor="startDate">Tanggal Keberangkatan</label>
            <input
              type="date"
              name="start_date"
              id="startDate"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.start_date}
            />
            <label htmlFor="startStation">Stasiun Keberangkatan</label>
            <select
              name="start_station_id"
              id="startStation"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.start_station_id}
            >
              {stations?.map((element, index) => (
                <option key={index} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
            <label htmlFor="startTime">Jam Keberangkatan</label>
            <input
              type="time"
              name="start_time"
              id="startTime"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.start_time}
            />
            <label htmlFor="destination_station_id">Stasiun Tujuan</label>
            <select
              onChange={handleChange}
              name="destination_station_id"
              id="destination_station_id"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              value={form.destination_station_id}
            >
              {stations?.map((element, index) => (
                <option key={index} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
            <label htmlFor="endTime">Jam Tiba</label>
            <input
              type="time"
              name="arrival_time"
              id="endTime"
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.arrival_time}
            />
            <label htmlFor="price">Harga Tiket</label>
            <input
              type="number"
              id="price"
              name="price"
              min={0}
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.price}
            />
            <label htmlFor="qty">Quantity</label>
            <input
              type="number"
              id="qty"
              name="qty"
              min={0}
              className="h-[50px] p-2 rounded-lg border-2 border-[#B1B1B1]"
              onChange={handleChange}
              value={form.qty}
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

export default AddTicket;
