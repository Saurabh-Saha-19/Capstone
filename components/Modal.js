import { modalState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, use, useRef } from "react";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import { CameraIcon } from "@heroicons/react/outline";
import { MicrophoneIcon, XIcon, StopIcon } from "@heroicons/react/outline";
import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString, list } from "firebase/storage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Modal() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const captionRef = useRef(null);

  const [form, setForm] = useState({
    prompt: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, prompt: e.target.value });
  };
  useEffect(() => {
    setForm({ ...form, prompt: transcript });
  }, [transcript]);
  const handleClose = () => {
    setOpen(false);
    setForm({ photo: "", prompt: "" });
    resetTranscript();
  };
  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const configuration = new Configuration({
          organization: process.env.NEXT_PUBLIC_OPEN_AI_ORGANIZATION,
          apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const description = form.prompt;
        console.log(description);
        const aiResponse = await openai.createImage({
          prompt: description,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${image}`,
        });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  /* Upload Post Code */

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, form.photo, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setForm({ photo: "", prompt: "" });
  };

  // const handleSubmit = async (e) => {};
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto mt-4"
        onClose={handleClose}
      >
        <div
          className="flex items-end 
        justify-center 
        min-h-[800px] 
        sm:min-h-screen 
        pt-4 px-4 pb-20 
        text-center 
        sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block
            align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
            overflow-hidden shadow-xl transform-all sm:my-16 sm:align-middle sm:max-w-sm
            sm:w-full sm:p-6"
            >
              <div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="mb-2 text-lg leading-6 font-medium text-gray-900"
                    >
                      Generate Image
                    </Dialog.Title>

                    <div>
                      {form.photo ? (
                        <img
                          src={form.photo}
                          alt={form.prompt}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div
                          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100
                        cursor-pointer"
                        >
                          <CameraIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-full items-center my-2">
                      {transcript ? (
                        <input
                          className="border-none my-2
                        focus:ring-0 w-full text-center"
                          type="text"
                          value={transcript}
                          placeholder="Image Description"
                        />
                      ) : (
                        <input
                          className="border-none my-2
                        focus:ring-0 w-full text-center"
                          type="text"
                          value={form.prompt}
                          placeholder="Image Description"
                          onChange={handleChange}
                        />
                      )}
                      {listening ? (
                        <div className="flex mx-auto items-center justify-center">
                          <div
                            className="flex mx-2 items-center justify-center h-12 w-12 rounded-full bg-red-100
                        cursor-pointer"
                          >
                            <StopIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                              onClick={SpeechRecognition.stopListening}
                            />
                          </div>
                          <div
                            className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100
                      cursor-pointer"
                          >
                            <XIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                              onClick={resetTranscript}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100
                        cursor-pointer"
                        >
                          <MicrophoneIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                            onClick={SpeechRecognition.startListening}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={generateImg}
                        type="button"
                        disabled={generatingImg}
                        className="inline-flex justify-center w-full rounded-full
                    border border-transparent shadow-sm px-4 py-2 bg-green-600
                    text-base font-medium text-white hover:bg-green-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm
                    disabled:bg-green-700 disabled:cursor-not-allowed
                    hover:disabled:bg-gray-300"
                      >
                        {generatingImg ? "Generating ..." : "Generate"}
                      </button>
                    </div>

                    <div className="mt-5">
                      <input
                        className="border-none
                        focus:ring-0 w-full text-center"
                        type="text"
                        ref={captionRef}
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!form.photo}
                    className="inline-flex justify-center w-full rounded-full
                    border border-transparent shadow-sm px-4 py-2 bg-red-600
                    text-base font-medium text-white hover:bg-red-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                    hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Share with Community"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
