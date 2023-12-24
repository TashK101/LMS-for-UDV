import Image from "next/image";
import logoSrc from "./icons/logo.svg";
import BellIcon from "./icons/bell-icon";
import Avatar from "../drop-down-menu/avatar";
import {useState} from "react";
import DropDownMenu from "../drop-down-menu/drop-down-menu";

export default function Header() {
    return (
        <header className="flex items-center h-20 px-[50px] shadow-md">
          <Image src={logoSrc} alt="logo" />
          <div className="flex items-center gap-[22px] ml-auto">
            <button>
              <BellIcon/>
            </button>
              <Avatar/>
          </div>
        </header>
  );
}
