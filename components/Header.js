import Image from "next/image";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  //console.log(session);

  return (
    <div
      className="p-2 bg-white sticky top-0 z-50 
    text-slate-900 
    "
    >
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/*Left*/}
        <div
          onClick={() => router.push("/")}
          className="relative  hidden lg:inline-grid w-24 cursor-pointer"
        >
          <p className="font-greatVibes text-4xl font-medium mt-4 ">
            Creativegram
          </p>
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/*Middle*/}
        {/* <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black
            rounded-md font-montserrat"
              type="text"
              placeholder="Search"
            />
          </div>
        </div> */}

        {/*Right*/}
        <div className="flex items-center justify-end space-x-4">
          {session ? (
            <>
              <HomeIcon
                onClick={() => router.push("/")}
                className="navBtn h-7 text-red-500"
              />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn h-6 text-green-500"
              />

              <img
                onClick={() => router.push("/profile")}
                className="h-8 rounded-full cursor-pointer"
                src={session.user.image}
              />

              <button
                onClick={signOut}
                className="font-montserrat text-sm text-white rounded-full p-2 mt-2 bg-indigo-500 hover:bg-indigo-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={signIn} className="font-montserrat">
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
