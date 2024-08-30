// TODO: make lables and messages translatable

"use client";

import Button from "@/components/button";
import Pager from "@/components/pager";
import BuildingUsecase from "@/module/building/application/buildingUsecase";
import BuildingRepoImpl from "@/module/building/presenter/buildingRepoImpl";
import DengueUsecase from "@/module/dengue/application/dengueUsecase";
import DengueRepoImpl from "@/module/dengue/presenter/dengueRepoImpl";
import DengueViewModel from "@/module/dengue/presenter/dengueViewModel";
import UserUsecase from "@/module/user/application/userUsecase";
import UserRepoImpl from "@/module/user/presenter/userRepoImpl";
import { Link } from "@/navigation";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function DenguePage() {
  const dangueUsecase = new DengueUsecase(new DengueRepoImpl());
  const userUsecase = new UserUsecase(new UserRepoImpl());

  const [dengues, setDengues] = useState<DengueViewModel[]>([]);
  const [buildingIdNameMap, setBuildingIdNameMap] = useState<Map<number, string>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  async function fetchAll() {
    const userId = (await userUsecase.getCurrentUser()).id;
    const [dengues, pager] = await dangueUsecase.getAllDengues({ page: currentPage, userId: userId });
    if (dengues.length === 0) {
      alert("你沒有權限");
      return;
    }
    setDengues(dengues.map((dengue) => new DengueViewModel(dengue)));
    setTotalPage(pager.totalPage);

    const buildingUsecase = new BuildingUsecase(new BuildingRepoImpl());
    for (const dengue of dengues) {
      const entity = await buildingUsecase.getBuildingById(dengue.buildingId);
      setBuildingIdNameMap((prev) => new Map(prev.set(dengue.buildingId, entity.name)));
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function handleDelete(id: number) {
    dangueUsecase.deleteDengue(id).then(() => fetchAll());
  }

  return (
    <>
      <h1>歷史填報紀錄</h1>
      <Table.Root className="mt-6" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>建物名稱</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>檢查月份</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>填表日期</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>刪除（立即生效）</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            dengues.map((dengue) => (
              <Table.Row key={dengue.id}>
                <Table.Cell>{buildingIdNameMap.get(dengue.buildingId)}</Table.Cell>
                <Table.Cell>{dengue.inspectionMonthString}</Table.Cell>
                <Table.Cell>{dengue.filledDateString}</Table.Cell>
                <Table.Cell>
                  <button onClick={() => handleDelete(dengue.id)}>
                    <FontAwesomeIcon icon={faTrash} className="size-4 text-red-600" />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        <Button className="border">
          <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
          <Link href={`/dengue/new`} className="py-1">建立登革熱報表</Link>
        </Button>
        <div className="flex flex-row justify-end mt-4">
          <Pager totalPage={totalPage} onChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}
