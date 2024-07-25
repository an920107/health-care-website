import IndexMenuUsecase from "@/module/indexMenu/application/indexMenuUsecase";
import TopicEnum from "@/module/indexMenu/domain/topicEnum";
import { Link } from "@/navigation";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export default function AdminStaticPostPage() {
  const topicTrans = useTranslations("Topic");
  const staticTrans = useTranslations("Static");

  const indexMenuUsecase = new IndexMenuUsecase();
  const groups = indexMenuUsecase.getTopicGroupsExcept([
    TopicEnum.DownloadArea,
    TopicEnum.DiseasePrevension,
  ]);

  return (
    <>
      <h1>{staticTrans("title")}</h1>
      <Table.Root className="mt-6" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{staticTrans("table_group")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{staticTrans("table_topic")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{staticTrans("table_edit")}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            groups.map((group) => (
              group.topics.map((topic) => (
                <Table.Row key={topic.label}>
                  <Table.Cell>{topicTrans(group.label)}</Table.Cell>
                  <Table.Cell>
                    <Link href={`/page/${topic.label}`} className="link">
                      {topicTrans(topic.label)}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/admin/page/edit/${topic.label}`}>
                      <FontAwesomeIcon icon={faPen} className="size-4" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            ))
          }
        </Table.Body>
      </Table.Root>
    </>
  );
}