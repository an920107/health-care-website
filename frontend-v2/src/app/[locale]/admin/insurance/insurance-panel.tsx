"use client";

import Pager from "@/components/pager";
import InsuranceUsecase from "@/module/insurance/application/insuranceUsecase";
import InsuranceRepoImpl from "@/module/insurance/presenter/insuranceRepoImpl";
import InsuranceViewModel from "@/module/insurance/presenter/insuranceViewModel";
import { Link } from "@/navigation";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  actions?: Readonly<React.ReactNode>;
};

export default function InsurancePanel({
  className,
  actions,
}: Props) {
  const trans = useTranslations("Insurance");

  const usecase = new InsuranceUsecase(new InsuranceRepoImpl());

  const [insurances, setInsurances] = useState<InsuranceViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    usecase.getAllInsurance({ page: currentPage }).then(([insurances, pager]) => {
      setInsurances(insurances.map((insurance) => new InsuranceViewModel(insurance)));
      setTotalPage(pager.totalPage);
    });
  }, []);

  return (
    <div className={className}>
      <InsuranceTable />
      <InsuranceButtom />
    </div>
  );

  function InsuranceTable() {
    return (
      <div className="overflow-x-auto">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-nowrap">編號</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">申請日期</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">事故日期</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">姓名</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">學號</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">類型</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">給付</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">地點</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">申請金額</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">理賠金額</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">理賠日期</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("table_edit")}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              insurances.map((insurance) => (
                <Table.Row key={insurance.id}>
                  <Table.Cell>{insurance.id}</Table.Cell>
                  <Table.Cell>{insurance.applicationDateString}</Table.Cell>
                  <Table.Cell>{insurance.incidentDateString}</Table.Cell>
                  <Table.Cell>{insurance.name}</Table.Cell>
                  <Table.Cell>{insurance.studentId}</Table.Cell>
                  <Table.Cell>{insurance.claimDetails}</Table.Cell>
                  <Table.Cell>{insurance.paymentType}</Table.Cell>
                  <Table.Cell>{insurance.location}</Table.Cell>
                  <Table.Cell>{insurance.applicationAmount}</Table.Cell>
                  <Table.Cell>{insurance.claimAmount}</Table.Cell>
                  <Table.Cell>{insurance.claimDateString}</Table.Cell>
                  <Table.Cell>
                    <Link href={`/admin/insurance/edit/${insurance.id}`}>
                      <FontAwesomeIcon icon={faPen} className="size-4" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </div>
    );
  }

  function InsuranceButtom() {
    return (
      <div className="flex flex-row justify-between items-start md:items-center mt-4">
        {actions ?? (<></>)}
        <div className="flex flex-row justify-end">
          <Pager totalPage={totalPage} onChange={setCurrentPage} />
        </div>
      </div>
    );
  }
}
