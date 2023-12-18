import LeftArrowIcon from "../icons/left-arrow-icon";
import MonthChooseButton from "./month-choose-button";
import YearChooseButton from "./year-choose-button";

export default function CalendarTitle() {
  return (
    <div className="flex items-center w-screen justify-between gap-[61px] py-[33px] pr-[67px] pl-[50px]">
      <div className="flex items-center gap-[61px]">
        <LeftArrowIcon />
        <div className="flex items-center gap-[25px]">
          <MonthChooseButton>Январь</MonthChooseButton>
          <YearChooseButton>2024</YearChooseButton>
        </div>
      </div>
      <div className="flex items-center gap-[40px]">
        <div className="h-8 flex items-center gap-[10px]">
          <div className="w-[25px] h-[25px] bg-[#FFBB4B] rounded"></div>
          <div>- курс утверждён</div>
        </div>
        <div className="h-8 flex items-center gap-[10px]">
          <div className="w-[25px] h-[25px] bg-[#C9C9C7] rounded"></div>
          <div>- курс ждёт оплату или договор</div>
        </div>
      </div>
    </div>
  );
}
