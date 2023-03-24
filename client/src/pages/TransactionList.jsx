import React from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
const TransactionList = () => {
  let { data: transactionList } = useQuery("allTansactionCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  console.log(transactionList);
  return (
    <>
      <div className="w-full min-h-screen px-20 bg-zinc-100 flex flex-col justify-center items-center">
        <div className="w-full pt-10 font-bold text-4xl mb-5 text-center">
          List Transaksi
        </div>
        <div>
          {/* TABLE */}
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
                  <tr key={index} className="gap-x-4 ">
                    <th className="py-4 px-6">{index + 1}</th>
                    <td className="py-4 px-6">{data.user.name}</td>
                    <td className="py-4 px-6">
                      {data.ticket.start_station.name} -{" "}
                      {data.ticket.destination_station.name}
                    </td>
                    <td className="py-4 px-6">{data.status}</td>
                    <td className="py-4 px-6 flex gap-x-8">
                      <div>
                        <img
                          src="/assets/search.png"
                          alt="detail"
                          className="w-[25px]"
                        />
                      </div>
                      <div>
                        <img
                          src="/assets/edit.png"
                          alt="detail"
                          className="w-[25px]"
                        />
                      </div>
                      <div>
                        <img
                          src="/assets/trash.png"
                          alt="detail"
                          className="w-[25px]"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
