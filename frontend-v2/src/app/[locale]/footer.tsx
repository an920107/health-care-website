"use client";

import ViewCountUsecase from "@/module/view/application/viewCountUsecase";
import ViewCountRepoImpl from "@/module/view/presenter/viewCountRepoImpl";
import ViewCountViewModel from "@/module/view/presenter/viewCountViewModel";
import { faEnvelope, faEye, faFax, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const usecase = new ViewCountUsecase(new ViewCountRepoImpl());

export default function Footer() {
  const trans = useTranslations("Home");
  const symbol = useTranslations("Symbol");

  const [view, setView] = useState<number>(0);

  async function fetchAll() {
    const viewCount = new ViewCountViewModel(await usecase.getViewCount());
    setView(viewCount.view);
  }

  useEffect(() => {
    fetchAll().catch((_) => {});
  }, []);

  return (
    <div className="bg-amber-400 py-8 px-4">
      <div className="flex flex-col lg:flex-row lg:w-[50rem] lg:mx-auto gap-x-10 gap-y-5 lg:items-center justify-between">
        <div>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="size-4 me-2" />
            {trans("phone")}{symbol("colon")}<a href="tel:+88634227151#57270" className="link">03-4227151#57270</a>、<a href="tel:+88632804814" className="link">03-2804814</a>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faFax} className="size-4 me-2" />
            {trans("fax")}{symbol("colon")}03-4272405
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="size-4 me-2" />
            Email{symbol("colon")}<a href="mailto:ncu7270@ncu.edu.tw" className="link">ncu7270@ncu.edu.tw</a>
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="size-4 me-2" />
            {trans("address")}{symbol("colon")}320 桃園市中壢區中大路 300 號 中正圖書館 1 樓
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="size-4 me-2" />
            {trans("views")}{symbol("colon")}{view}
          </p>
        </div>
        <div>
          <p><Link href="/privacy" className="link">{trans("privacy")}</Link></p>
          <p>{trans("copyright")} © 國立中央大學衛生保健組</p>
          <p>National Central University - Health Center</p>
        </div>
      </div>
    </div>
  )
}