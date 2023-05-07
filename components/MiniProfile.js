import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MiniProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  return (
    <div>
      <div className="flex items-center justify-between mt-14 ml-8">
        <img
          className="rounded-full p-[2px] w-30 h-30 cursor-pointer"
          src={session?.user?.image}
          onClick={() => router.push("/profile")}
        />

        <div className="flex-1 mx-4">
          <h2
            className="font-bold cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            {" "}
            {session?.user?.username}{" "}
          </h2>
          <h3 className="font-greatVibes text-lg font-md tracking-wide">
            {" "}
            Welcome to Creativegram
          </h3>
          <button
            onClick={signOut}
            className="font-montserrat text-sm text-white rounded-full p-2 mt-2 bg-indigo-500 hover:bg-indigo-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniProfile;
