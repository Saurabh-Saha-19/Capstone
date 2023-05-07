import Image from "next/image";
function SidebarRow({ src, Icon, title }) {
  return (
    <div className="">
      <div className="flex py-4 items-center rounded-full cursor-pointer">
        {src && (
          <img className="ml-2 sm:ml-1 flex rounded-full border w-8 h-8 sm:w-11 sm:h-11" src={src} />
        )}

        {Icon && (
          <Icon className="ml-2 flex h-6 w-6 sm:ml-2 sm:h-7 sm:w-7 text-black-500 md:h-8 md:w-8 text-black-500" />
        )}
        <p className="hidden font-semibold mx-5 sm:inline-flex text-sm md:text-lg">
          {title}
        </p>
      </div>
    </div>
  );
}

export default SidebarRow;
