import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ProfilePosts from "./ProfilePosts";
import { useRecoilState } from "recoil";
import { postState } from "@/atoms/postAtom";
import { userState } from "@/atoms/userAtom";

function UserProfileInfo() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [click, setClick] = useRecoilState(postState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);

  if (user.length == 0) {
    return (
      <div className="max-w-4xl mx-5 p-10 xl:mx-auto">
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="flex col-span-4 items-center">
            <img
              className="rounded-full w-26 h-26 object-contain"
              src={session?.user?.image}
            />

            <div className="mx-8">
              <span className="text-gray-700 text-2xl mr-4">
                {session?.user?.username}
              </span>
              <div>
                <span className="font-semibold"></span> posts
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-500 my-10"></hr>
        <div className="flex justify-center">
          <button className="px-4 py-2 text-white rounded-full bg-indigo-500">
            Posts
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <ProfilePosts
              key={post.id}
              id={post.id}
              username={post.data().username}
              userImg={post.data().profileImg}
              img={post.data().image}
              caption={post.data().caption}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl mx-5 p-10 xl:mx-auto">
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="flex col-span-4 items-center">
            <img className="rounded-full w-26 h-26 object-contain" src={user} />

            <div className="mx-8">
              <span className="text-gray-700 text-2xl mr-4">{click}</span>
              <div>
                <span className="font-semibold">200</span> posts
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-500 my-10"></hr>
        <div className="flex justify-center">
          <button className="px-4 py-2 text-white rounded-full bg-indigo-500">
            Posts
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <ProfilePosts
              key={post.id}
              id={post.id}
              username={post.data().username}
              userImg={post.data().profileImg}
              img={post.data().image}
              caption={post.data().caption}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default UserProfileInfo;
