"use client";

import Button from "@/components/button"
import Logo from "@/components/logo";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faBars, faGlobe, faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import Drawer from "./drawer";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type Props = {}

export default function NavigationBar({ }: Props) {
  const trans = useTranslations("Home");

  const pathname = usePathname();
  const currentLanguage = pathname.split("/")[1];

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
            {trans("homepage")}
          </Button>
        </Link>
        <Link href="https://ncu.edu.tw/">
          <Button>
            <FontAwesomeIcon icon={faGraduationCap} className="size-5 me-2" />
            {trans("ncuHomepage")}
          </Button>
        </Link>
        <Link href={`${currentLanguage === "zh" ? "en" : "zh"}`}>
          <Button>
            <FontAwesomeIcon icon={faGlobe} className="size-5 me-2" />
            {trans("language")}
          </Button>
        </Link>
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
          <Link href="/" className="text-yellow-900">
            <Button>{trans("aboutUs")}</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>{trans("aed")}</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>{trans("restriction")}</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>{trans("downloadArea")}</Button>
          </Link>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} closeCallback={toggleDrawer}>
        <div className="mx-4 mt-20">
          <h2>選單</h2>
          <hr className="my-4" />

        </div>
      </Drawer>
    </div>
  )
}

export function getStaticProps({
  locale
}: {
  locale: string;
}) {
  return {
    props: {
      messages: {
        ...require(`../../../messages/${locale}.json`),
      }
    }
  }
}