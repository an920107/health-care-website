"use client";

import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";
import PagerEntity from "@/module/pager/domain/pagerEntity";

type Props = {
  entity: PagerEntity;
  onChange?(entity: PagerEntity): void;
};

export default function Pager({
  entity,
  onChange,
}: Props) {
  return (
    <div className="flex flex-row items-center">
      <Button
        title="-5" disabled={!entity.hasPrevious}
        onClick={() => onChange?.(entity.previous({ amount: 5 }))}
      >
        <FontAwesomeIcon icon={faAnglesLeft} className="size-4 py-2" />
      </Button>
      <Button
        title="-1" disabled={!entity.hasPrevious}
        onClick={() => onChange?.(entity.previous({ amount: 1 }))}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="size-4 py-2" />
      </Button>
      <span className="px-2">{`${entity.currentPage} / ${entity.totalPage}`}</span>
      <Button
        title="+1" disabled={!entity.hasNext}
        onClick={() => onChange?.(entity.next({ amount: 1 }))}
      >
        <FontAwesomeIcon icon={faAngleRight} className="size-4 py-2" />
      </Button>
      <Button
        title="+5" disabled={!entity.hasNext}
        onClick={() => onChange?.(entity.next({ amount: 5 }))}
      >
        <FontAwesomeIcon icon={faAnglesRight} className="size-4 py-2" />
      </Button>
    </div>
  );
}