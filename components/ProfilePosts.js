import { postState } from "@/atoms/postAtom";

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";

function ProfilePosts({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [click, setClick] = useRecoilState(postState);
  if (click.length == 0) {
    if (username == session.user.username) {
      return (
        <div className="bg-white my-7 rounded-sm">
          {/* img */}
          <img src={img} className="object-cover w-full" alt="" />

          {/*Buttons */}
          {/* <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
              <HeartIcon className="btn w-5 h-5" />
              <ChatIcon className="btn w-5 h-5" />
              <PaperAirplaneIcon className="btn w-5 h-5" />
            </div>
            <BookmarkIcon className="btn w-5 h-5" />
          </div> */}
          <p className="px-2 py-4 pb-5 font-montserrat truncate text-md">
            {caption}
          </p>
        </div>
      );
    }
  } else {
    if (username == click) {
      return (
        <div className="bg-white my-7 rounded-sm ">
          {/* img */}
          <img src={img} className="object-cover w-full" alt="" />

          {/*Buttons */}
          <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
              <HeartIcon className="btn w-5 h-5" />
              <ChatIcon className="btn w-5 h-5" />
              <PaperAirplaneIcon className="btn w-5 h-5" />
            </div>
            <BookmarkIcon className="btn w-5 h-5" />
          </div>

          {/*captions*/}
          {/* <p className="p-5 truncate text-sm">
                        <span className="font-bold mr-1">{username}</span>
    
                    </p> */}
          <p className="px-5 py-5 pb-5 truncate text-sm">{caption}</p>
        </div>
      );
    }
  }
}

export default ProfilePosts;
