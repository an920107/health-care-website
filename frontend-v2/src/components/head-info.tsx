import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  view: number;
  datetime: string;
};

export default function HeadInfo({
  view,
  datetime,
}: Props) {
  return (
    <div className="flex flex-col text-sm">
      <span className="inline-flex items-center">
        <FontAwesomeIcon icon={faEye} className="size-4 me-2" />
        <span>{view}</span>
      </span>
      <span className="inline-flex items-center">
        <FontAwesomeIcon icon={faClock} className="size-4 me-2" />
        <span>{datetime}</span>
      </span>
    </div>
  );
}