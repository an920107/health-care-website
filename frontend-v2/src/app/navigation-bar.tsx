"use client";

import Button from "@/components/button"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faBars, faGlobe, faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

type Props = {}

export default function NavigationBar({ }: Props) {
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
            首頁
          </Button>
        </Link>
        <Link href="https://ncu.edu.tw/">
          <Button>
            <FontAwesomeIcon icon={faGraduationCap} className="size-5 me-2" />
            中大首頁
          </Button>
        </Link>
        <Link href="/">
          <Button>
            <FontAwesomeIcon icon={faGlobe} className="size-5 me-2" />
            English
          </Button>
        </Link>
        <Link href="/">
          <Button>
            <FontAwesomeIcon icon={faInstagram} className="size-5 my-0.5" />
          </Button>
        </Link>
        <Link href="/">
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
        <Link href="/" className="flex items-center h-32">
          <img alt="logo" src="/logo.png" className="h-32" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">衛生保健組</span>
            <span className="text-xl font-semibold">Health Center</span>
          </div>
        </Link>
        <div className="flex items-center max-md:hidden gap-2">
          <Link href="/" className="text-yellow-900">
            <Button>關於我們</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>校園 AED</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>相關法規</Button>
          </Link>
          <Link href="/" className="text-yellow-900">
            <Button>下載專區</Button>
          </Link>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} closeCallback={toggleDrawer}>
        <></>
      </Drawer>
    </div>
  )
}

type DrawerProps = {
  children: Readonly<React.ReactNode>;
  isOpen: boolean;
  closeCallback?: () => void;
}

function Drawer({ children, isOpen, closeCallback }: DrawerProps) {
  return (
    <>
      <button
        className={`fixed inset-0 bg-black transform ${isOpen ? "translate-x-0" : "-translate-x-full"} ${isOpen ? "opacity-50" : "opacity-0"} duration-500 transition-opacity ease-in-out`}
        onClick={closeCallback}
      ></button>
      <div className={`fixed top-0 left-0 h-full bg-white w-72 rounded-r-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        {children}
      </div>
    </>
  )
}
