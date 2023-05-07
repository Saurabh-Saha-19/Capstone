import { postState } from "@/atoms/postAtom";
import { userState } from "@/atoms/userAtom";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { ChatIcon as ChatIconFilled } from "@heroicons/react/solid";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Moment from "react-moment";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [click, setClick] = useRecoilState(postState);
  const [user, setUser] = useRecoilState(userState);
  const buttonHandler = () => {
    setHidden((current) => !current);
  };
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div
      className="bg-white my-7 border-b border-gray-400 
    hover:shadow-md 
    "
    >
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full 
          h-12 w-12 
          object-contain 
          p-1 mr-3 cursor-pointer"
          onClick={() => {
            setClick(username);
            setUser(userImg);
            router.push("/profile");
          }}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} className="object-cover w-full" alt="" />

      {/*Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled className="btn text-red-500" onClick={likePost} />
          ) : (
            <HeartIcon className="btn" onClick={likePost} />
          )}
          {hidden ? (
            <ChatIconFilled
              className="btn text-green-500"
              onClick={buttonHandler}
            />
          ) : (
            <ChatIcon className="btn" onClick={buttonHandler} />
          )}
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/*captions*/}

      <p className="p-5 truncate">
        {likes.length > 0 && <p>{likes.length} likes</p>}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/*Comments*/}
      {comments.length > 0 && (
        <div
          className="ml-10 mb-10 h-20 overflow-y-scroll
        scrollbar-thumb-black scrollbar-thin"
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center
            space-x-2 mb-3"
            >
              <img
                className="h-7 rounded-full"
                src={comment.data().userImg}
                alt=""
              />

              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/*input box */}

      {hidden && session ? (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
            className="border-none mx-2 flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Post;
