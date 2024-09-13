"use client";

import Pager from "@/components/pager";
import SearchBar from "@/components/search-bar";
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

  const [searchText, setSearchText] = useState<string>("");
  const [insurances, setInsurances] = useState<InsuranceViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  function fetchAll() {
    usecase.getAllInsurance({ page: currentPage, search: searchText }).then(([insurances, pager]) => {
      setInsurances(insurances.map((insurance) => new InsuranceViewModel(insurance)));
      setTotalPage(pager.totalPage);
    });
  }

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [currentPage, searchText]);

  function handleSearchSubmit(text: string) {
    setCurrentPage(1);
    setSearchText(text);
  }

  return (
    <div className={className}>
      <SearchBar
        className="mt-6 mb-3"
        placeholder={trans("search")}
        onSubmit={handleSearchSubmit}
      />
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
              <Table.ColumnHeaderCell className="text-nowrap">{trans("id")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("application_date")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("incident_date")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("name")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("student_id")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("id_number")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("phone_number")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("address")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("email")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("claim_detail")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("payment_type")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("location")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("incident_cause")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("receipt")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("certificate")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("bankbook")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("x_ray")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("application_amount")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("claim_amount")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("claim_date")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("remarks")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("insurance_company_stamp")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("insurance_company_time")}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-nowrap">{trans("table_edit")}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              insurances.map((insurance) => (
                <Table.Row key={insurance.id}>
                  <Table.Cell className="text-nowrap">{insurance.id}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.applicationDateString}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.incidentDateString}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.name}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.studentId}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.idNumber}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.phoneNumber}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.address}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.email}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.claimDetails}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.paymentType}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.location}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.incidentCause}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.receipt}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.diagnosisCertificate}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.bankbook}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.xRay}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.applicationAmount}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.claimAmount}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.claimDateString}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.insuranceCompanyStamp}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.insuranceCompanyTimeString}</Table.Cell>
                  <Table.Cell className="text-nowrap">{insurance.remarks}</Table.Cell>
                  <Table.Cell className="text-nowrap">
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
