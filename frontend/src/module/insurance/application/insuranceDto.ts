import ClaimDetailsEnum from "../doamin/claimDetailsEnum";
import InsuranceEntity from "../doamin/insuranceEntity";
import LocationEnum from "../doamin/locationEnum";
import PaymentTypeEnum from "../doamin/paymentTypeEnum";

export class InsuranceRequest implements Partial<InsuranceEntity> {
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
    claimAmount?: number;
    claimDate?: Date;
    remarks: string;
    insuranceCompanyStamp: boolean;
    insuranceCompanyTime?: Date;

    constructor(params: Omit<InsuranceRequest, "toJson">) {
        this.applicationDate = params.applicationDate;
        this.incidentDate = params.incidentDate;
        this.name = params.name;
        this.studentId = params.studentId;
        this.idNumber = params.idNumber;
        this.address = params.address;
        this.phoneNumber = params.phoneNumber;
        this.email = params.email;
        this.claimDetails = params.claimDetails;
        this.paymentType = params.paymentType;
        this.location = params.location;
        this.incidentCause = params.incidentCause;
        this.receipt = params.receipt;
        this.diagnosisCertificate = params.diagnosisCertificate;
        this.bankbook = params.bankbook;
        this.xRay = params.xRay;
        this.applicationAmount = params.applicationAmount;
        this.claimAmount = params.claimAmount;
        this.claimDate = params.claimDate;
        this.remarks = params.remarks;
        this.insuranceCompanyStamp = params.insuranceCompanyStamp;
        this.insuranceCompanyTime = params.insuranceCompanyTime;
    }

    toJson(): any {
        return {
            application_date: this.applicationDate.toISOString(),
            incident_date: this.incidentDate.toISOString(),
            name: this.name,
            student_id: this.studentId,
            id_number: this.idNumber,
            address: this.address,
            phone_number: this.phoneNumber,
            email: this.email,
            claim_details: this.claimDetails,
            payment_type: this.paymentType,
            location: this.location,
            incident_cause: this.incidentCause,
            receipt: this.receipt,
            diagnosis_certificate: this.diagnosisCertificate,
            bankbook: this.bankbook,
            x_ray: this.xRay,
            application_amount: this.applicationAmount,
            claim_amount: this.claimAmount,
            claim_date: this.claimDate?.toISOString(),
            remarks: this.remarks,
            insurance_company_stamp: this.insuranceCompanyStamp,
            insurance_company_timestamp: this.insuranceCompanyTime?.toISOString(),
        }
    }
}

export class InsuranceResponse extends InsuranceEntity {
    constructor(json: any) {
        super({
            id: json.id,
            applicationDate: new Date(json.application_date),
            incidentDate: new Date(json.incident_date),
            name: json.name,
            studentId: json.student_id,
            idNumber: json.id_number,
            address: json.address,
            phoneNumber: json.phone_number,
            email: json.email,
            claimDetails: json.claim_details,
            paymentType: json.payment_type,
            location: json.location,
            incidentCause: json.incident_cause,
            receipt: json.receipt,
            diagnosisCertificate: json.diagnosis_certificate,
            bankbook: json.bankbook,
            xRay: json.x_ray,
            applicationAmount: json.application_amount,
            claimAmount: json.claim_amount,
            claimDate: json.claim_date ? new Date(json.claim_date) : undefined,
            remarks: json.remarks,
            insuranceCompanyStamp: json.insurance_company_stamp,
            insuranceCompanyTime: json.insurance_company_timestamp ? new Date(json.insurance_company_timestamp) : undefined,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        })
    }
}
