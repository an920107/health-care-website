import Button from "@/components/button";
import CarouselUsecase from "@/module/carousel/application/carouselUsecase";
import CarouselRepoImpl from "@/module/carousel/presenter/carouselRepoImpl";
import CarouselViewModel from "@/module/carousel/presenter/carouselViewModel";
import { Link } from "@/navigation";
import { faAdd, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type Props = {
  params: { locale: string };
}

export default async function AdminCarouselPage({ params }: Props) {
  const trans = await getTranslations("Carousel");

  const usecase = new CarouselUsecase(new CarouselRepoImpl());
  const entities = await usecase.getAllCarousels({ visibility: true });
  const viewModels = entities.map((entity) => (new CarouselViewModel(entity)));

  return (
    <>
      <h1>{trans("title")}</h1>
      <div className="overflow-x-scroll">
        <Table.Root className="mt-6" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{trans("table_id")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_image")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{trans("table_edit")}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              viewModels.map((viewModel) => (
                <Table.Row key={viewModel.id}>
                  <Table.Cell>
                    <Link href={`/carousel/${viewModel.id}`} className="link">{viewModel.id}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Image
                      src={viewModel.imageUrl}
                      alt={viewModel.id.toString()}
                      width={320}
                      height={180}
                      style={{ objectFit: "cover" }}
                      className="w-[320px] h-[180px] min-w-[320px] min-h-[180px]"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/admin/carousel/edit/${viewModel.id}`}>
                      <FontAwesomeIcon icon={faPen} className="size-4" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </div>
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <Button className="border">
          <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
          <Link href="/admin/carousel/new" className="py-1">{trans("new")}</Link>
        </Button>
      </div>
    </>
  );
}
