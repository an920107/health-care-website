"use client";

import Button from "@/components/button"
import Logo from "@/components/logo";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faBars, faGlobe, faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Drawer from "./drawer";
import { useTranslations } from "next-intl";
import { getPageTopics } from "@/domain/usecase/staticPage.usecase";
import { Link, usePathname } from "@/navigation";
import DropdownMenu from "@/components/dropdown-menu";
import { useSearchParams } from "next/navigation";

export default function NavigationBar() {
  const homeTrans = useTranslations("Home");
  const pageTrans = useTranslations("Page");

  const pathname = usePathname();
  const query = useSearchParams().toString();

  const pageTopics = getPageTopics();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {/* Social links */}
      <div className="flex items-center justify-end bg-amber-400 py-1 px-2 gap-2 text-gray-800 max-md:hidden">
        <Link href="/">
          <Button>
            <FontAwesomeIcon icon={faHouse} className="size-5 me-2" />
            {homeTrans("homepage")}
          </Button>
        </Link>
        <Link href="https://ncu.edu.tw/">
          <Button>
            <FontAwesomeIcon icon={faGraduationCap} className="size-5 me-2" />
            {homeTrans("ncu_homepage")}
          </Button>
        </Link>
        <div>
          <Button onClick={() => setIsLanguageDropdownOpen(true)}>
            <FontAwesomeIcon icon={faGlobe} className="size-5 me-2" />
            {homeTrans("language")}
          </Button>
          <DropdownMenu
            isOpen={isLanguageDropdownOpen}
            onCancel={() => setIsLanguageDropdownOpen(false)}
          >
            {
              [["zh", "中文"], ["en", "English"]].map(([locale, label]) => (
                <Link
                  key={locale} href={{ pathname, query }} locale={locale}
                  className="hover:bg-black hover:bg-opacity-5 px-2 rounded-sm"
                >
                  {label}
                </Link>
              ))
            }
          </DropdownMenu>
        </div>
        <Link href="https://www.instagram.com/ncu7270">
          <Button>
            <FontAwesomeIcon icon={faInstagram} className="size-5 my-0.5" />
          </Button>
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=100057326145371">
          <Button>
            <FontAwesomeIcon icon={faFacebook} className="size-5 my-0.5" />
          </Button>
        </Link>
      </div>

      {/* Inner links */}
      <div className="flex justify-between items-center container mx-auto">
        <Button className="md:hidden" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} className="size-5 my-2" />
        </Button>
        <Logo />
        <div className="flex items-center max-md:hidden gap-2">
          <Link href="/page/workteam" className="text-yellow-900">
            <Button>{homeTrans("about_us")}</Button>
          </Link>
          <Link href="/page/campus_aed" className="text-yellow-900">
            <Button>{homeTrans("aed")}</Button>
          </Link>
          <Link href="/page/regulation" className="text-yellow-900">
            <Button>{homeTrans("regulation")}</Button>
          </Link>
          <Link href="/page/download_area" className="text-yellow-900">
            <Button>{homeTrans("download_area")}</Button>
          </Link>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <div className="mx-4 mt-20">
          <h2>{homeTrans("menu")}</h2>
          <hr className="my-4" />
          {
            Object.entries(pageTopics).map(([k, v]) => (
              <Link href={`/page/${k}`} key={k}>
                <Button>{pageTrans(k)}</Button>
              </Link>
            ))
          }
        </div>
      </Drawer>
    </div>
  )
}