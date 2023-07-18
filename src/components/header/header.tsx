import {
  Bars3Icon,
  BellIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { FunctionComponent, useEffect, useState } from "react";

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ isAdmin, setIsAdmin }) => {
  const session = useSession();

  const isAuthentificated = () => {
    if (session.status === "authenticated") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    console.log("session ", session);
  }, [session]);

  return (
    <header className=" flex h-20 w-full items-center justify-between border border-b-2 p-8 pl-8 pr-8">
      <Bars3Icon className="h-6 w-6" />
      <button
        className="rounded-xl border-2 border-orange-400 bg-orange-400 p-2 text-white"
        type="button"
        onClick={() => setIsAdmin(!isAdmin)}
      >
        Open Admin
      </button>

      <div>Logo</div>
      <div className="flex cursor-pointer items-center justify-center space-x-6">
        <BellIcon className="h-6 w-6" />
        <div className=" h-8 w-8 cursor-pointer rounded-full bg-gray-300"></div>
        <div className="flex cursor-pointer rounded-xl border-2 border-gray-400 p-2">
          {isAuthentificated() ? (
            <button className="flex" onClick={() => signOut()}>
              <PencilSquareIcon className="h-6 w-6" />
              <div>Sign Out</div>
            </button>
          ) : (
            <button onClick={() => signIn()} className="flex">
              <UserIcon className="h-6 w-6" />
              <div>Sign In</div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
