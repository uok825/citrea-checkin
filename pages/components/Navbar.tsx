"use client";
import { ConnectKitButton } from "connectkit";

function Navbar() {
  return (
    <header className="bg-black">
      <div className="flex text-white justify-between items-center ml-12 mr-12 p-2">
        <a className="hover:underline text-2xl font-bold" href="/">
          Citrea Devnet Daily Check In
        </a>
        <ConnectKitButton />
      </div>
    </header>
  );
}

export default Navbar;
