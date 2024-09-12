// TODO: make lables and messages translatable

"use client";

import Button from "@/components/button";
import DateField from "@/components/date-field";
import DropdownButton from "@/components/dropdown-button";
import TextField from "@/components/text-field";
import { InsuranceRequest } from "@/module/insurance/application/insuranceDto";
import InsuranceUsecase from "@/module/insurance/application/insuranceUsecase";
import ClaimDetailsEnum from "@/module/insurance/doamin/claimDetailsEnum";
import LocationEnum from "@/module/insurance/doamin/locationEnum";
import PaymentTypeEnum from "@/module/insurance/doamin/paymentTypeEnum";
import InsuranceRepoImpl from "@/module/insurance/presenter/insuranceRepoImpl";
import EmailValidationUsecase from "@/module/validation/application/emailValidationUsecase";
import NotEmptyValidationUsecase from "@/module/validation/application/notEmptyValidationUsecase";
import NumberValidationUsecase from "@/module/validation/application/numberValidationUsecase";
import { useRouter } from "@/navigation";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  updateId?: number;
  locale: string;
  defaultValues?: {
    applicationDate?: Date;
    incidentDate?: Date;
    name?: string;
    studentId?: string;
    idNumber?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    claimDetails?: ClaimDetailsEnum;
    paymentType?: PaymentTypeEnum;
    location?: LocationEnum;
    incidentCause?: string;
    receipt?: string;
    diagnosisCertificate?: string;
    bankbook?: number;
    xRay?: number;
    applicationAmount?: number;
    claimAmount?: number;
    claimDate?: Date;
    remarks?: string;
    insuranceCompanyStamp?: boolean;
    insuranceCompanyTime?: Date;
  };
};

export default function InsuranceEditor({
  updateId,
  locale,
  defaultValues,
}: Props) {
  const trans = useTranslations("Insurance");

  const router = useRouter();

  const [applicationDate, setApplicationDate] = useState<Date | undefined>(defaultValues?.applicationDate);
  const [incidentDate, setIncidentDate] = useState<Date | undefined>(defaultValues?.incidentDate);
  const [name, setName] = useState<string>(defaultValues?.name ?? "");
  const [studentId, setStudentId] = useState<string>(defaultValues?.studentId ?? "");
  const [idNumber, setIdNumber] = useState<string>(defaultValues?.idNumber ?? "");
  const [address, setAddress] = useState<string>(defaultValues?.address ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultValues?.phoneNumber ?? "");
  const [email, setEmail] = useState<string>(defaultValues?.email ?? "");
  const [claimDetails, setClaimDetails] = useState<ClaimDetailsEnum>(defaultValues?.claimDetails ?? ClaimDetailsEnum.Accident);
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(defaultValues?.paymentType ?? PaymentTypeEnum.Medical);
  const [location, setLocation] = useState<LocationEnum>(defaultValues?.location ?? LocationEnum.OnCampus);
  const [incidentCause, setIncidentCause] = useState<string>(defaultValues?.incidentCause ?? "");
  const [receipt, setReceipt] = useState<string>(defaultValues?.receipt ?? "");
  const [diagnosisCertificate, setDiagnosisCertificate] = useState<string>(defaultValues?.diagnosisCertificate ?? "");
  const [bankbook, setBankbook] = useState<number>(defaultValues?.bankbook ?? 0);
  const [xRay, setXRay] = useState<number>(defaultValues?.xRay ?? 0);
  const [applicationAmount, setApplicationAmount] = useState<string>(defaultValues?.applicationAmount?.toString() ?? "0");
  const [remarks, setRemarks] = useState<string>(defaultValues?.remarks ?? "");

  const [claimAmount, setClaimAmount] = useState<string | undefined>(defaultValues?.claimAmount?.toString());
  const [claimDate, setClaimDate] = useState<Date | undefined>(defaultValues?.claimDate);
  const [insuranceCompanyStamp, setInsuranceCompanyStamp] = useState<boolean>(defaultValues?.insuranceCompanyStamp ?? false);
  const [insuranceCompanyTime, setInsuranceCompanyTime] = useState<Date | undefined>(defaultValues?.insuranceCompanyTime);

  const [toValidate, setToValidate] = useState<boolean>(false);
  const [isValidationPassed, setIsValidationPassed] = useState<boolean[]>([]);

  const usecase = new InsuranceUsecase(new InsuranceRepoImpl());

  function handleValidate(result: boolean) {
    setToValidate(false);
    setIsValidationPassed((prev) => [...prev, result]);
  }

  function handleDelete() {
    if (updateId === undefined) return;

    usecase.deleteInsurance(updateId)
      .then(() => router.push("/admin/insurance"));
  }

  function handleSave() {
    setIsValidationPassed([]);
    setToValidate(true);
  }

  useEffect(() => {
    if (isValidationPassed.length < 13 ||
      isValidationPassed.some((result) => !result)) return;

    const request = new InsuranceRequest({
      applicationDate: applicationDate!,
      incidentDate: incidentDate!,
      name,
      studentId,
      idNumber,
      address,
      phoneNumber,
      email,
      claimDetails,
      paymentType,
      location,
      incidentCause,
      receipt,
      diagnosisCertificate,
      bankbook,
      xRay,
      applicationAmount: parseInt(applicationAmount),
      remarks,
      claimAmount: claimAmount !== undefined && claimAmount !== "" ? parseInt(claimAmount) : undefined,
      claimDate,
      insuranceCompanyStamp,
      insuranceCompanyTime,
    });

    (updateId === undefined
      ? usecase.createInsurance(request)
      : usecase.updateInsurance(updateId, request)
    ).then(() => router.push("/admin/insurance"));
  }, [isValidationPassed]);

  return (
    <>
      <h1>{updateId === undefined ? trans("new") : trans("edit")}</h1>
      <form className="mt-6 flex flex-col gap-4">
        <DateField
          label="申請日期"
          locale={locale}
          value={applicationDate}
          onChange={setApplicationDate}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <DateField
          label="事故日期"
          locale={locale}
          value={incidentDate}
          onChange={setIncidentDate}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="姓名"
          value={name}
          onChange={setName}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="學號"
          value={studentId}
          onChange={setStudentId}
          onValidate={handleValidate}
          validations={numberValidations}
          toValidate={toValidate}
        />
        <TextField
          label="身份證字號"
          value={idNumber}
          onChange={setIdNumber}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="地址"
          value={address}
          onChange={setAddress}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="電話"
          value={phoneNumber}
          onChange={setPhoneNumber}
          onValidate={handleValidate}
          validations={numberValidations}
          toValidate={toValidate}
        />
        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          onValidate={handleValidate}
          validations={emailValidations}
          toValidate={toValidate}
        />
        <DropdownButton
          label="理賠內容"
          options={claimDetailsOptions}
          className="h-10"
          onChange={(index) => setClaimDetails(claimDetailsOptions[index])}
          index={claimDetailsOptions.indexOf(claimDetails)}
        />
        <DropdownButton
          label="給付類別"
          options={paymentTypeOptions}
          className="h-10"
          onChange={(index) => setPaymentType(paymentTypeOptions[index])}
          index={paymentTypeOptions.indexOf(paymentType)}
        />
        <DropdownButton
          label="地點"
          options={locationOptions}
          className="h-10"
          onChange={(index) => setLocation(locationOptions[index])}
          index={locationOptions.indexOf(location)}
        />
        <TextField
          label="事故原因（簡述）"
          value={incidentCause}
          onChange={setIncidentCause}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="收據（醫院名稱 + 份數）"
          value={receipt}
          onChange={setReceipt}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <TextField
          label="診斷書（醫院名稱 + 份數）"
          value={diagnosisCertificate}
          onChange={setDiagnosisCertificate}
          onValidate={handleValidate}
          validations={generalValidations}
          toValidate={toValidate}
        />
        <DropdownButton
          label="存摺"
          options={numberOptions}
          className="h-10"
          onChange={(index) => setBankbook(numberOptions[index])}
          index={numberOptions.indexOf(bankbook)}
        />
        <DropdownButton
          label="X 光"
          options={numberOptions}
          className="h-10"
          onChange={(index) => setXRay(numberOptions[index])}
          index={numberOptions.indexOf(xRay)}
        />
        <TextField
          label="申請金額"
          value={applicationAmount}
          onChange={setApplicationAmount}
          onValidate={handleValidate}
          validations={numberValidations}
          toValidate={toValidate}
        />
        <TextField
          label="理賠金額"
          value={claimAmount}
          onChange={setClaimAmount}
          onValidate={handleValidate}
          validations={optionalNumberValidations}
          toValidate={toValidate}
        />
        <DateField
          label="理賠日期"
          locale={locale}
          value={claimDate}
          onChange={setClaimDate}
        />
        <TextField
          label="備註"
          value={remarks}
          onChange={setRemarks}
        />
        <div>
          <label htmlFor="保險公司收件核章" className="label">保險公司收件核章</label>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="checkbox"
              className="size-4 my-1"
              defaultChecked={insuranceCompanyStamp}
              onChange={() => setInsuranceCompanyStamp((prev) => {
                if (prev) setInsuranceCompanyTime(undefined);
                else setInsuranceCompanyTime(new Date());
                return !prev;
              })}
            />
            <span>{insuranceCompanyTime && formatDate(insuranceCompanyTime, "yyyy-MM-dd")}</span>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          {
            updateId !== undefined &&
            <Button className="border" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="me-2 size-4" />
              <span className="py-1">{trans("delete")}</span>
            </Button>
          }
          <Button className="border" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} className="me-2 size-4" />
            <span className="py-1">{trans("save")}</span>
          </Button>
        </div>
      </form>
    </>
  );
}

const generalValidations = [
  new NotEmptyValidationUsecase("欄位不可為空"),
];

const numberValidations = [
  ...generalValidations,
  new NumberValidationUsecase("請輸入數字"),
];

const optionalNumberValidations = [
  new NumberValidationUsecase("請輸入數字"),
];

const emailValidations = [
  ...generalValidations,
  new EmailValidationUsecase("Email 格式不正確"),
];

const claimDetailsOptions = [
  ClaimDetailsEnum.Accident,
  ClaimDetailsEnum.Illness,
];

const paymentTypeOptions = [
  PaymentTypeEnum.Medical,
  PaymentTypeEnum.Disablement,
  PaymentTypeEnum.Cancer,
  PaymentTypeEnum.Death,
];

const locationOptions = [
  LocationEnum.OnCampus,
  LocationEnum.OffCampus,
];

const numberOptions = [0, 1, 2, 3];
