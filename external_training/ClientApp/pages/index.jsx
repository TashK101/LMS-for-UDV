import { LargeCalendar } from "../components/calendar/large-calendar";
import { Header } from "../components/header";
import DropDownMenu from "../components/drop-down-menu/drop-down-menu";

export default function HomePage() {
  return (
    <div>
      <Header />
      <LargeCalendar />
    </div>
  );
}
