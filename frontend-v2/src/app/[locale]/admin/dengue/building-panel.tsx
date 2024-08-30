"use client";

import Button from "@/components/button";
import DateField from "@/components/date-field";
import { BuildingRequest } from "@/module/building/application/buildingDto";
import BuildingUsecase from "@/module/building/application/buildingUsecase";
import BuildingRepoImpl from "@/module/building/presenter/buildingRepoImpl";
import BuildingViewModel from "@/module/building/presenter/buildingViewModel";
import { BACKEND_HOST } from "@/module/config/config";
import { faAdd, faFileLines, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  locale?: string;
  className?: string;
};

export default function BuildingPanel({
  locale,
  className,
}: Props) {
  const trans = useTranslations("AdminDengue");

  const buildingUsecase = new BuildingUsecase(new BuildingRepoImpl());

  const [buildings, setBuildings] = useState<BuildingViewModel[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    const entities = await buildingUsecase.getAllBuildings();
    setBuildings(entities.map((entity) => new BuildingViewModel(entity)));
  }

  return (
    <div className={className}>
      <BuildingTable />
      <BuildingActions />
    </div>
  );

  function BuildingTable() {

    function handleEdit(index: number) {
      const newUserId = prompt(trans("prompt_edit_user"));
      if (newUserId === null) return;

      const request = new BuildingRequest({
        name: buildings[index].name,
        userId: newUserId,
      });

      buildingUsecase.updateBuilding(buildings[index].id, request).then(() => fetchAll());
    }

    function handleDelete(index: number) {
      buildingUsecase.deleteBuilding(buildings[index].id).then(() => fetchAll());
    }

    return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{trans("table_name")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_user")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_status")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{trans("table_delete")}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            buildings.map((building, index) => (
              <Table.Row key={building.id}>
                <Table.Cell>{building.name}</Table.Cell>
                <Table.Cell>
                  <span className="inline-block text-nowrap">
                    {building.userId}
                    <FontAwesomeIcon
                      icon={building.isEmptyUser ? faAdd : faPen}
                      className={`size-3 cursor-pointer ${building.isEmptyUser ? "" : "ms-3"}`}
                      onClick={() => handleEdit(index)}
                    />
                  </span>
                </Table.Cell>
                <Table.Cell>{"IN_DEVELOPMENT"}</Table.Cell>
                <Table.Cell>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="size-3 cursor-pointer text-red-600"
                    onClick={() => handleDelete(index)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    );
  }

  function BuildingActions() {

    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    function handleCreate() {
      const newBuildingName = prompt(trans("prompt_create"))?.trim();
      if (newBuildingName === undefined) return;
      if (newBuildingName.length === 0) {
        alert(trans("alert_empty"));
        return;
      }

      const request = new BuildingRequest({ name: newBuildingName });
      buildingUsecase.createBuilding(request).then(() => fetchAll());
    }

    function handleReport() {
      if (beginDate === undefined || endDate === undefined) {
        alert(trans("alert_empty"));
        return;
      }

      const url = new URL("/api/dengue/report", BACKEND_HOST);
      url.searchParams.append("from", formatDate(beginDate, "yyyy-MM"));
      url.searchParams.append("to", formatDate(endDate, "yyyy-MM"));

      window.open(url.href, "_blank");
    }

    return (
      <div className="flex flex-row mt-4 items-end justify-between">
        <Button className="border h-fit" onClick={handleCreate}>
          <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
          <span className="py-1">{trans("new")}</span>
        </Button>
        <div className="flex flex-row gap-2 items-end">
          <DateField
            locale={locale}
            label="begin_date"
            labelText={trans("begin_date")}
            value={beginDate}
            onChange={setBeginDate}
          />
          <DateField
            locale={locale}
            label="end_date"
            labelText={trans("end_date")}
            value={endDate}
            onChange={setEndDate}
          />
          <Button className="border h-fit" onClick={handleReport}>
            <FontAwesomeIcon icon={faFileLines} className="size-4 me-2" />
            <span className="py-1">{trans("report")}</span>
          </Button>
        </div>
      </div>
    );
  }
}
