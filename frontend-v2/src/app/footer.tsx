import { faEnvelope, faEye, faFax, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {}

export default function Footer({ }: Props) {
  const views = 1234;

  return (
    <div className="bg-amber-400 py-8 px-4">
      <div className="flex flex-col lg:flex-row lg:w-[50rem] lg:mx-auto gap-x-10 gap-y-5 lg:items-center justify-between">
        <div>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="size-4 me-2" />
            電話：<a href="tel:+88634227151#57270" className="link">03-4227151#57270</a>、<a href="tel:+88632804814" className="link">03-2804814</a>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faFax} className="size-4 me-2" />
            傳真：03-4272405
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="size-4 me-2" />
            Email：<a href="mailto:ncu7270@ncu.edu.tw" className="link">ncu7270@ncu.edu.tw</a>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="size-4 me-2" />
            地址：320 桃園市中壢區中大路 300 號 中正圖書館 1 樓
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="size-4 me-2" />
            瀏覽人次：{views}
          </p>
        </div>
        <div>
          <p><Link href="/" className="link">隱私權政策聲明</Link></p>
          <p>版權所有 © 國立中央大學衛生保健組</p>
          <p>National Central University - Health Center</p>
        </div>
      </div>
    </div>
  )
}