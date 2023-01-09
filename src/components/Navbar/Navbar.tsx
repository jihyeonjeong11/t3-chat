import { IoMoonOutline } from "react-icons/io5";
import IconButton from "../IconButton/IconButton";
import Chat from "../../controllers/Chat/Chat";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-end space-x-2 bg-level1 px-4 shadow-sm">
      {sessionData ? (
        <>
          <IconButton>
            <IoMoonOutline />
          </IconButton>
          <div>
            <Chat />
          </div>
          <div className="flex h-10 w-10 items-center justify-center">
            <img
              src={
                sessionData.user?.image ||
                "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
              }
              alt="avatar image"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </>
      ) : (
        <button onClick={() => signIn()}>sign in</button>
      )}
    </nav>
  );
}
