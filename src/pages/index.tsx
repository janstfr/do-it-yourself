/* eslint-disable @typescript-eslint/no-unsafe-call */
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FollowProfile from "~/components/follow-profile";
import { useEffect, useState } from "react";
import BlogElement from "~/components/blog-element";
import { api } from "../utils/api";
import AdminPanel from "~/components/admin-panel/admin-panel";
import Header from "~/components/header/header";

export default function Home() {
  const twTopicClass =
    "bg-gray-100 rounded p-4 flex items-center rounded-2xl cursor-pointer hover:bg-gray-200";
  const twH3 = "text-xl font-bold mb-2";

  const [userInput, setUserInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const widgetMutation = api.dbAuth.createWidget.useMutation();
  const widgetQuery = api.dbAuth.findWidgets.useQuery();
  const userQuery = api.user.findUser.useQuery({
    id: userInput,
  });

  return (
    <div className=" h-screen">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className=" grid h-full w-full grid-cols-12 p-8 pt-0">
        <main className="  col-span-8 h-full w-full border-r-2 pl-8 pr-8">
          <div className=" mt-12 flex h-8 justify-between">
            <div className="flex w-1/4 items-center rounded border-2">
              <MagnifyingGlassIcon className="absolute h-6 w-6 pl-2" />
              <input className="w-full rounded-xl border-2 border-gray-300 p-2 pl-10" />
            </div>

            <div className="flex w-2/4 items-center justify-end ">
              <div className="whitespace-nowrap; pr-8">My topics:</div>
              <div className="flex justify-end space-x-4 text-xs">
                <div className={twTopicClass}>Design</div>
                <div className={twTopicClass}>Development</div>
                <div className={twTopicClass}>UX</div>
                <div className={twTopicClass}>Marketing</div>
              </div>
            </div>
          </div>
          {isAdmin && (
            <AdminPanel
              userInput={userInput}
              setUserInput={setUserInput}
            ></AdminPanel>
          )}
          <div>
            <div className="mt-12 flex w-full items-center justify-between border-b-2 border-gray-100 pb-4">
              <div>Articles</div>
              <select
                className="rounded-xl border-2 border-gray-100 p-2 "
                name="cars"
                id="cars"
              >
                <option value="Following">Following</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div id="blog-dropper">
              {Array.from({ length: 10 }).map((_, i) => (
                <BlogElement key={i} />
              ))}
            </div>
          </div>
        </main>
        <aside className="  col-span-4 mt-12 grid h-full pl-8 pr-8">
          <div className=" space-y-12">
            <div className="flex h-56 w-full rounded-xl bg-gray-100 p-4">
              <div className="  w-3/5">
                <h3 className={twH3}>
                  Get unlimited access to everything on reader
                </h3>
                <p className=" text-gray-500">
                  Activate now for the ultimate power
                </p>
                <button className="mt-8 w-3/4 rounded-xl bg-gray-200 p-4 hover:bg-gray-300">
                  Get unlimited access
                </button>
              </div>
              <div className="h-full w-2/5 p-8">
                <div className=" h-full w-full bg-green-400"></div>
              </div>
            </div>
            <div>
              <h3 className={twH3}>People you might be interested</h3>
              <div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <FollowProfile key={i} />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
