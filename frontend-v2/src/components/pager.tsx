"use client";

import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "./button";
import PagerEntity from "@/module/pager/domain/pagerEntity";

type Props = {
  totalPage: number;
  onChange?(page: number): void;
};

export default function Pager({
  totalPage,
  onChange,
}: Props) {

  const [pagerEntity, setPagerEntity] = useState<PagerEntity>(
    new PagerEntity({ currentPage: 1, totalPage: totalPage }),
  );

  return (
    <div className="flex flex-row items-center">
      <Button
        title="-5" disabled={!pagerEntity.hasPrevious}
        onClick={() => setPagerEntity((v) => v.previous({ amount: 5 }))}
      >
        <FontAwesomeIcon icon={faAnglesLeft} className="size-4 py-2" />
      </Button>
      <Button
        title="-1" disabled={!pagerEntity.hasPrevious}
        onClick={() => setPagerEntity((v) => v.previous({ amount: 1 }))}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="size-4 py-2" />
      </Button>
      <span className="px-2">{`${pagerEntity.currentPage} / ${pagerEntity.totalPage}`}</span>
      <Button
        title="+1" disabled={!pagerEntity.hasNext}
        onClick={() => setPagerEntity((v) => v.next({ amount: 1 }))}
      >
        <FontAwesomeIcon icon={faAngleRight} className="size-4 py-2" />
      </Button>
      <Button
        title="+5" disabled={!pagerEntity.hasNext}
        onClick={() => setPagerEntity((v) => v.next({ amount: 5 }))}
      >
        <FontAwesomeIcon icon={faAnglesRight} className="size-4 py-2" />
      </Button>
    </div>
  );
}