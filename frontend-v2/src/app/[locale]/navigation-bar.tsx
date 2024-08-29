"use client";

import Button from "@/components/button"
import Logo from "@/components/logo";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faBars, faGlobe, faGraduationCap, faHouse, faMosquito, faScrewdriverWrench, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Drawer from "./drawer";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import DropdownMenu from "@/components/dropdown-menu";
import { useSearchParams } from "next/navigation";
import UserRoleEnum from "@/module/user/domain/userRoleEnum";
import UserUsecase from "@/module/user/application/userUsecase";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";

const userUsecase = new UserUsecase(new UserRepoImpl());

export default function NavigationBar() {
  const homeTrans = useTranslations("Home");

  const pathname = usePathname();
  const query = useSearchParams().toString();
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRoleEnum>(UserRoleEnum.None);

  function clearUserRole() {
    setUserRole(UserRoleEnum.None);
  }

  useEffect(() => {
    userUsecase.getCurrentUser()
      .then((user) => setUserRole(user.role));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end bg-amber-400 py-1 px-2 gap-2 text-gray-800 max-md:hidden">
        {/* Admin links */}
        {
          userRole <= UserRoleEnum.Normal &&
          <Link href="/dengue">
            <Button>
              <FontAwesomeIcon icon={faMosquito} className="size-5 me-2" />
              {homeTrans("dengue")}
            </Button>
          </Link>
        }
        {
          userRole <= UserRoleEnum.StudentB &&
          <Link href="/admin">
            <Button>
              <FontAwesomeIcon icon={faScrewdriverWrench} className="size-5 me-2" />
              {homeTrans("admin")}
            </Button>
          </Link>
        }
        {
          userRole <= UserRoleEnum.Normal &&
          <Link href="/logout" onClick={clearUserRole}>
            <Button>
              <FontAwesomeIcon icon={faSignOut} className="size-5 me-2" />
              {homeTrans("logout")}
            </Button>
          </Link>
        }
        {/* Social links */}
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
                  className="hover:bg-black hover:bg-opacity-5 px-2 py-1 rounded-md"
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
      <div className="flex flex-row justify-between items-center container mx-auto">
        <div className="md:hidden" onClick={() => setIsDrawerOpen(true)}>
          <FontAwesomeIcon icon={faBars} className="size-5" />
        </div>
        <div className="flex flex-row w-full justify-center md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-row items-center max-md:hidden gap-2">
          <Link href="/page/workteam" className="text-yellow-900 text-nowrap">
            <Button>{homeTrans("about_us")}</Button>
          </Link>
          <Link href="/page/campus_aed" className="text-yellow-900 text-nowrap">
            <Button>{homeTrans("aed")}</Button>
          </Link>
          <Link href="/page/regulation" className="text-yellow-900 text-nowrap">
            <Button>{homeTrans("regulation")}</Button>
          </Link>
          <Link href="/page/download_area" className="text-yellow-900 text-nowrap">
            <Button>{homeTrans("download_area")}</Button>
          </Link>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}