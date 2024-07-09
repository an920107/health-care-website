import TopicUseCase from "@/application/usecase/topic"
import { TopicEnum, TopicGroupEnum } from "@/domain/enum/topic";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Button from "@/app/components/button";
import Card from "@/app/components/card";

type Props = {
  className?: string;
};

export default function SideMenu({ className }: Props) {
  const topics = TopicUseCase.getTopics();

  return (
    <div className={className}>
      <div className="flex flex-col gap-5">
        {
          Object.entries(topics).map(([group, topic]) => (
            <SideMenuGroup
              key={group}
              group={group as TopicGroupEnum}
              topics={topic}
            />
          ))
        }
      </div>
    </div>
  )
}

function SideMenuGroup({
  group,
  topics,
}: {
  group: TopicGroupEnum,
  topics: TopicEnum[],
}) {
  const topicTrans = useTranslations("Topic");

  return (
    <Card>
      <div className="flex flex-col items-center py-4 px-6 gap-2">
        <h4>{topicTrans(group)}</h4>
        <hr className="w-full" />
        {
          topics.map((topic) => (
            <Button key={topic} className="text-yellow-900">
              <Link href={`/page/${topic}`}>{topicTrans(topic)}</Link>
            </Button>
          ))
        }
      </div>
    </Card>
  )
}
