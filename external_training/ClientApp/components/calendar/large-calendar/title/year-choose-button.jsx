import DownSelectArrowIcon from "../icons/down-select-arrow-icon";

export default function YearChooseButton({ children }) {
  return (
    <button className="flex items-center gap-2 border border-[#2B2A29] rounded-lg text-[16px] h-8 px-2 hover:bg-[#FFEDCF]">
      {children}
      <DownSelectArrowIcon className={"-mb-1"} />
    </button>
  );
}
