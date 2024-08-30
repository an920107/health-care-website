import ClaimDetailsEnum from "../doamin/claimDetailsEnum";
import InsuranceEntity from "../doamin/insuranceEntity";
import LocationEnum from "../doamin/locationEnum";
import PaymentTypeEnum from "../doamin/paymentTypeEnum";

export class InsuranceRequest extends InsuranceEntity {
    constructor(attrs: {
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
        claimDate: Date;
        remarks: string;
        insuranceCompanyStamp: boolean;
    }) {
        super({
            ...attrs,
            id: -1,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson() {
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
            claim_date: this.claimDate.toISOString(),
            remarks: this.remarks,
            insurance_company_stamp: this.insuranceCompanyStamp,
        }
    }
}

export class InsuranceResponse extends InsuranceEntity {
    constructor(json: any) {
        super({
            id: json.id,
            applicationDate: json.application_date,
            incidentDate: json.incident_date,
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
            claimDate: json.claim_date,
            remarks: json.remarks,
            insuranceCompanyStamp: json.insurance_company_stamp,
            createdTime: json.created_time,
            updatedTime: json.updated_time
        })
    }
}
