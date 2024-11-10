import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Button from "@/components/button";
import Card from "@/components/card";
import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import TopicGroupEntity from "@/module/indexMenu/domain/topicGroupEntity";

type Props = {
  className?: string;
};

export default function IndexMenu({ className }: Props) {

  const topicTrans = useTranslations("Topic");

  const indexMenuUsecase = new IndexMenuUsecase();

  return (
    <div className={className}>
      <div className="flex flex-col gap-5">
        {
          indexMenuUsecase.getTopicGroups().map((group) => (
            <SideMenuGroup key={group.label} group={group} />
          ))
        }
      </div>
    </div>
  )

  function SideMenuGroup({ group }: { group: TopicGroupEntity }) {
    return (
      <Card>
        <div className="flex flex-col items-center py-4 px-6 gap-2">
          <h4>{topicTrans(group.label)}</h4>
          <hr className="w-full" />
          {
            group.topics.map((topic) => (
              <Button key={topic.label} className="text-yellow-900">
                <Link href={`/page/${topic.label}`}>{topicTrans(topic.label)}</Link>
              </Button>
            ))
          }
        </div>
      </Card>
    )
  }
}


