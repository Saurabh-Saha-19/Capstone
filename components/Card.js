const Card = ({ id, key, username, userImg, img, caption }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={img}
      alt={caption}
    />
    <div className="opacity-75 group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="font-montserrat text-white text-sm overflow-y-auto prompt">
        {caption}
      </p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
            <img className="rounded-full" src={userImg} />
          </div>
          <p className="font-montserrat text-sm text-white font-medium">
            {username}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
