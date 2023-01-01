import { IoChatboxOutline, IoMoonOutline } from "react-icons/io5";
import IconButton from "../IconButton/IconButton";
import { useState } from "react";
import Chat from "../../controllers/Chat/Chat";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-end space-x-2 bg-level1 px-4 shadow-sm">
      <IconButton>
        <IoMoonOutline />
      </IconButton>
      <div>
        <Chat />
      </div>
      <div className="flex h-10 w-10 items-center justify-center">
        <img
          src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg"
          alt="avatar image"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </nav>
  );
}
