"use client";

import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ExpensionTile from "@/components/expension-tile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import ListTile from "@/components/list-tile";
import DropdownMenu from "@/components/dropdown-menu";
import { useSearchParams } from "next/navigation";
import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import IndexMenuViewModel from "@/module/indexMenu/presenter/indexMenuViewModel";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Drawer({ isOpen, onClose: closeCallback }: Props) {

  const homeTrans = useTranslations("Home");
  const topicTrans = useTranslations("Topic");

  const pathname = usePathname();
  const query = useSearchParams().toString();

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);

  const indexMenuUsecase = new IndexMenuUsecase();
  const indexMenuViewModel = new IndexMenuViewModel(indexMenuUsecase);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!document.getElementById("drawer")?.contains(event.target as Node))
        closeCallback?.();
    };

    if (isOpen)
      document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <>
      <div className={`fixed z-10 inset-0 bg-black ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-500 transition-opacity ease-in-out`}></div>
      <div id="drawer" className={`fixed z-10 top-0 left-0 buttom-0 h-screen bg-white w-72 rounded-r-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col pt-20 pb-8 h-full">
          <h2 className="mx-4">{homeTrans("menu")}</h2>
          <hr className="m-4" />
          <div className="flex flex-col flex-1 overflow-y-auto">
            {
              indexMenuViewModel.getGroups().map((groupLabel) => (
                <ExpensionTile key={groupLabel} title={topicTrans(groupLabel)} className="w-full" titleClassName="py-2 px-4">
                  {
                    indexMenuViewModel.getTopicsInGroup(groupLabel).map((topicLabel) => (
                      <ListTile key={topicLabel} className="py-2 px-4">
                        <Link href={indexMenuViewModel.getUri(topicLabel)} className="py-2">
                          {topicTrans(topicLabel)}
                        </Link>
                      </ListTile>
                    ))
                  }
                </ExpensionTile>
              ))
            }
          </div>
          <div id="drawer-bottom" className="flex flex-col h-fit mx-4">
            <hr className="my-4" />
            <ListTile className="py-2 px-4">
              <Link href="/" className="flex flex-row items-center">
                <FontAwesomeIcon icon={faHouse} className="size-5 me-4" />
                {homeTrans("homepage")}
              </Link>
            </ListTile>
            <ListTile className="py-2 px-4">
              <Link href="https://ncu.edu.tw/" className="flex flex-row items-center">
                <FontAwesomeIcon icon={faGraduationCap} className="size-5 me-4" />
                {homeTrans("ncu_homepage")}
              </Link>
            </ListTile>
            <ListTile className="flex flex-col" onClick={() => setIsLanguageDropdownOpen(true)}>
              <div className="flex flex-row items-center py-2 px-4 w-full">
                <FontAwesomeIcon icon={faGlobe} className="size-5 me-4" />
                {homeTrans("language")}
              </div>
              <DropdownMenu
                isOpen={isLanguageDropdownOpen}
                onCancel={() => setIsLanguageDropdownOpen(false)}
              >
                {
                  [["zh", "中文"], ["en", "English"]].map(([locale, label]) => (
                    <Link
                      key={locale} href={{ pathname, query }} locale={locale}
                      className="hover:bg-black hover:bg-opacity-5 px-2 py-1 rounded-md"
                    >
                      {label}
                    </Link>
                  ))
                }
              </DropdownMenu>
            </ListTile>
            <div className="flex flex-row gap-2 w-fit mt-2 ms-1.5">
              <Link href="https://www.instagram.com/ncu7270">
                <FontAwesomeIcon icon={faInstagram} className="size-5 p-2 border border-gray-300 rounded-full" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100057326145371">
                <FontAwesomeIcon icon={faFacebook} className="size-5 p-2 border border-gray-300 rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
