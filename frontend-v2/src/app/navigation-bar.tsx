import Button from "@/components/button"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faGraduationCap, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type Props = {}

export default function NavigationBar({ }: Props) {
  return (
    <div>
      {/* Social links */}
      <div className="flex items-center justify-end bg-amber-400 py-1 px-2 gap-2 text-gray-800">
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
      <div className="flex justify-between container mx-auto">
        <Link href="/" className="flex items-center h-32">
          <img alt="logo" src="/logo.png" className="h-32" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">衛生保健組</span>
            <span className="text-xl font-semibold">Health Center</span>
          </div>
        </Link>
        <div className="flex items-center">
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
    </div>
  )
}