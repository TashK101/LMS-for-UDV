import Image from "next/image";
import logoSrc from "./icons/logo.svg";
import BellIcon from "./icons/bell-icon";
import Avatar from "./avatar";

export default function Header() {
  return (
    <header className="flex items-center h-20 px-[50px] shadow-md">
      <Image src={logoSrc} alt="logo" />
      <div className="flex items-center gap-[22px] ml-auto">
        <button>
          <BellIcon />
        </button>
        <button>
          <Avatar>ВМ</Avatar>
        </button>
      </div>
    </header>
  );
}
