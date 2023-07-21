import React from "react";

function Achievement() {
  return (
    <div className="widgetCard relative hidden md:flex col-span-2 px-6 py-4 text-center flex-col justify-between bg-cyan-700 text-slate-50">
      <div className="font-semibold text-slate-800 bg-white max-w-fit mx-auto pt-5 pb-2 px-6 absolute -top-3 rounded-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
        Sua Nota
      </div>
      <div className="font-semibold m-auto pt-4">
        <span className="text-lg lg:text-[80px]">5.0</span>
        <span className="text-[14px]"></span>★
      </div>
      <p className="text-sm font-semibold"></p>
      <p className="text-xs"></p>
    </div>
  );
}

export default Achievement;
