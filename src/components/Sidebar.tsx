import Link from "next/link";

import { FaUserCog } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { FaChevronLeft } from "react-icons/fa";

import { ImStatsBars } from "react-icons/im";
import { Tooltip } from "./Tooltip";
import { Logo } from "./Logo";

import IconFlagUK from "../assets/svgs/FlagUK.svg";
import IconFlagAUS from "../assets/svgs/FlagAUS.svg";
import IconFlagUSA from "../assets/svgs/FlagUSA.svg";
import IconGCyan from "../assets/svgs/IconGreyhoundCyan.svg";
import { useState } from "react";
import { MiniLogo } from "./MiniLogo";

export function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  function isVisibleSidebar() {
    return setIsOpenSidebar(!isOpenSidebar);
  }

  return (
    <aside className={`absolute flex h-screen w-64 flex-col bg-zinc-700 pt-4 lg:static ${isOpenSidebar ? "" : "lg:w-16"} ease-in-out duration-500`}>
      
      <Link href={"/"}>
        <div className="ml-2 items-center">{isOpenSidebar ? <Logo /> : <MiniLogo />}</div>
      </Link>

      <hr className="mt-12 h-px border-0 bg-zinc-500" />

      <div className={`ml-2 mt-12 ${!isOpenSidebar && "text-center"}`}>
        <Tooltip strTooltip="Estatísticas dos Galgos">
          {isOpenSidebar ? (
            <>
              <ImStatsBars className="inline text-zinc-400" fontSize={20} />
              <span translate="no" className="text-md ml-2 font-bold text-white hover:text-cyan-300 lg:text-lg">
                Stats Greyhounds
              </span>
              <IconGCyan className="ml-2 inline h-6 w-6" />
            </>
          ) : (
            <ImStatsBars className="inline text-zinc-400" fontSize={28} />
          )}
        </Tooltip>
      </div>

      <div className="mt-8 space-y-4">
        <div className={`ml-4`}>
          <Tooltip strTooltip="Reino Unido &amp; Irlanda">
            {isOpenSidebar ? (
              <>
                <Link className="flex cursor-pointer items-center" href={"/"}>
                  <IconFlagUK />
                  <span className="lg:text-md ml-2 text-sm text-white hover:text-cyan-300 hover:underline lg:font-medium lg:tracking-wider">
                    UK &amp; Ireland
                  </span>
                </Link>
              </>
            ) : (
              <IconFlagUK className="mx-2 h-6 w-6" />
            )}
          </Tooltip>
        </div>

        <div className={`ml-4`}>
          <Tooltip strTooltip="Austrália &amp; Nova Zelândia">
            {isOpenSidebar ? (
              <>
                <div className="flex items-center">
                  <IconFlagAUS />
                  <span className="lg:text-md ml-2 text-sm text-white hover:text-cyan-300 hover:underline lg:font-medium lg:tracking-wider">
                    Australia &amp; New Zealand
                  </span>
                </div>
              </>
            ) : (
              <IconFlagAUS className="mx-2 h-6 w-6" />
            )}
          </Tooltip>
        </div>

        <div className={`ml-4`}>
          <Tooltip strTooltip="América do Norte">
            {isOpenSidebar ? (
              <>
                <div className="flex items-center">
                  <IconFlagUSA />
                  <span className="lg:text-md ml-2 text-sm text-white hover:text-cyan-300 hover:underline lg:font-medium lg:tracking-wider">
                    North America
                  </span>
                </div>
              </>
            ) : (
              <IconFlagUSA className="mx-2 h-6 w-6" />
            )}
          </Tooltip>
        </div>
      </div>

      <hr className="mt-28 h-px border-0 bg-zinc-500" />

      <div className="ml-4 space-y-4">
        <div className="mt-8">
          <Link className="flex cursor-pointer items-center" href={"/"}>
            {isOpenSidebar ? (
              <>
                <FaUserCog className="text-zinc-400 ease-in-out duration-500" fontSize={20} />
                <span className="lg:text-md ml-2 text-sm  leading-3 text-white hover:text-cyan-300 hover:underline lg:font-medium lg:tracking-wider ease-in-out duration-500">
                  Pedro Aguiar
                </span>
              </>
            ) : (
              <FaUserCog className="text-zinc-400 ease-in-out duration-500" fontSize={28} />
            )}
          </Link>
        </div>

        <div className="mt-8">
          <Link className="flex cursor-pointer items-center" href={"/"}>
            {isOpenSidebar ? (
              <>
                <GoSignOut className="rotate-180 text-zinc-400 ease-in-out duration-500" fontSize={20} />
                <span className="lg:text-md ml-2 text-sm leading-3 text-white hover:text-cyan-300 hover:underline lg:font-medium lg:tracking-wider ease-in-out duration-500">
              Sign Out
            </span>
              </>
            ) : (
              <GoSignOut className="rotate-180 text-zinc-400 ease-in-out duration-500" fontSize={28} />
            )}
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-end lg:justify-end lg:p-4">
        <FaChevronLeft className={`cursor-pointer text-white ${!isOpenSidebar && "rotate-180"} ease-in-out duration-500`} onClick={isVisibleSidebar} />
      </div>
    </aside>
  );
}
