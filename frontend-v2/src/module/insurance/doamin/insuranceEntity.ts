import ClaimDetailsEnum from "./claimDetailsEnum";
import LocationEnum from "./locationEnum";
import PaymentTypeEnum from "./paymentTypeEnum";

export default class InsuranceEntity {
    id: number;
    applicationDate: Date;
    incidentDate: Date;
    name: string;
    studentId: string;
    idNumber: string;
    address: string;
    phoneNumber: string;
    email: string;
    claimDetails: ClaimDetailsEnum;
    paymentType: PaymentTypeEnum;
    location: LocationEnum;
    incidentCause: string;
    receipt: string;
    diagnosisCertificate: string;
    bankbook: number;
    xRay: number;
    applicationAmount: number;
    claimAmount: number;
    claimDate?: Date;
    remarks: string;
    insuranceCompanyStamp: boolean;
    insuranceCompanyTime?: Date;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        applicationDate,
        incidentDate,
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
        applicationAmount,
        claimAmount,
        claimDate,
        remarks,
        insuranceCompanyStamp,
        insuranceCompanyTime,
        createdTime,
        updatedTime,
    }: InsuranceEntity) {
        this.id = id;
        this.applicationDate = applicationDate;
        this.incidentDate = incidentDate;
        this.name = name;
        this.studentId = studentId;
        this.idNumber = idNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.claimDetails = claimDetails;
        this.paymentType = paymentType;
        this.location = location;
        this.incidentCause = incidentCause;
        this.receipt = receipt;
        this.diagnosisCertificate = diagnosisCertificate;
        this.bankbook = bankbook;
        this.xRay = xRay;
        this.applicationAmount = applicationAmount;
        this.claimAmount = claimAmount;
        this.claimDate = claimDate;
        this.remarks = remarks;
        this.insuranceCompanyStamp = insuranceCompanyStamp;
        this.insuranceCompanyTime = insuranceCompanyTime;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
