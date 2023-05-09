import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-6 
      sm:grid-cols-6
      sm: max-w-2xl
      md:grid-cols-8 
      md:max-w-6xl 
      mx-auto ${!session && "!grid-cols-1 !max-w-2xl"}`}
    >
      {session && (
        <section className="col-span-1 sm:col-span-2 md:col-span-2">
          <div className="fixed">
            <Sidebar />
          </div>
        </section>
      )}
      <section className="col-span-5 px-2 sm:col-span-4 md:col-span-4">
        {/* Posts */}

        <Posts />
      </section>
      {session && (
        <section className="hidden md:inline-flex col-span-2">
          <div className="fixed top-20">
            <MiniProfile />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
