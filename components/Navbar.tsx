"use client";
import { ConnectKitButton } from "connectkit";

function Navbar() {
  return (
    <header className="bg-black">
      <div className="flex text-white justify-between items-center ml-12 mr-12 p-2">
        <a
          className="hover:underline text-2xl font-bold items-start justify-start"
          href="/"
        >
          Citrea Devnet Daily Check In
        </a>
        <div className="flex items-end">
          <a
            className="hover:underline text-xl font-bold mr-4 mb-[5px]"
            href="https://citrea.xyz/bridge"
            target="_blank"
          >
            {" "}
            Bridge BTC
          </a>
          <ConnectKitButton />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
