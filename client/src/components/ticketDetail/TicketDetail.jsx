import React from "react";

const TicketDetail = () => {
  return (
    <div className="w-[800px] pb-4 ">
      <div className="header flex justify-between">
        <div className="leftHeader pl-8 mt-4">
          <h1 className="font-[Sen] font-extrabold text-5xl">E-Ticket</h1>
          <span>Kode Invoice : INV0101</span>
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
            <h1 className="font-[Sen] text-4xl font-semibold">Kereta Api</h1>
            <p>
              <span>Saturday, </span>
              21 Februari 2020
            </p>
          </div>
          <div className="leftTrain mt-9">
            <h1 className="font-[Sen] text-2xl font-extrabold">Argo Wilis</h1>
            <span>Eksekutif(H)</span>
          </div>
          <div>
            <ol class="relative border-l border-gray-200">
              <li class="mb-10 ml-4">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                <div className="flex gap-x-10">
                  <div>
                    {" "}
                    <h3 class="text-lg font-semibold text-gray-900">05:00</h3>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      21 March 2022
                    </time>
                  </div>
                  <div>
                    {" "}
                    <h3 class="text-lg font-semibold text-gray-900">
                      Jakarta (GMR)
                    </h3>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      Stasiun Gambir
                    </time>
                  </div>
                </div>
              </li>
              <li class="mb-10 ml-4">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                <div className="flex gap-x-10">
                  <div>
                    {" "}
                    <h3 class="text-lg font-semibold text-gray-900">05:00</h3>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      21 March 2022
                    </time>
                  </div>
                  <div>
                    {" "}
                    <h3 class="text-lg font-semibold text-gray-900">
                      Surabaya (SBY)
                    </h3>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      Stasiun Surabaya
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
              Tunjukkan e-ticket dan identitas para penumpang saat checkin
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
          <span className=" opacity-50">31175033003970001</span>
        </div>
        <div>
          <h1>Nama Pemesan</h1>
          <span className=" opacity-50">Anto</span>
        </div>
        <div>
          <h1>No. Handphone</h1>
          <span className=" opacity-50">089697832017</span>
        </div>
        <div>
          <h1>Email</h1>
          <span className=" opacity-50">anto@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
