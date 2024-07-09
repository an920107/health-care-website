import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Button from "@/components/button";
import Card from "@/components/card";
import { IndexMenuUsecase } from "@/module/indexMenu/application/usecase/indexMenuUsecase";
import { IndexMenuViewModel } from "@/module/indexMenu/presenter/viewModel/indexMenuViewModel";

type Props = {
  className?: string;
};

export default function IndexMenu({ className }: Props) {

  const topicTrans = useTranslations("Topic");

  const indexMenuUsecase = new IndexMenuUsecase();
  const indexMenuViewModel = new IndexMenuViewModel(indexMenuUsecase);

  return (
    <div className={className}>
      <div className="flex flex-col gap-5">
        {
          indexMenuViewModel.getGroups().map((groupLabel) => (
            <SideMenuGroup
              key={groupLabel}
              group={groupLabel}
            />
          ))
        }
      </div>
    </div>
  )

  function SideMenuGroup({ group }: { group: string }) {
    return (
      <Card>
        <div className="flex flex-col items-center py-4 px-6 gap-2">
          <h4>{topicTrans(group)}</h4>
          <hr className="w-full" />
          {
            indexMenuViewModel.getTopicsInGroup(group).map((topicLabel) => (
              <Button key={topicLabel} className="text-yellow-900">
                <Link href={`/page/${topicLabel}`}>{topicTrans(topicLabel)}</Link>
              </Button>
            ))
          }
        </div>
      </Card>
    )
  }
}


