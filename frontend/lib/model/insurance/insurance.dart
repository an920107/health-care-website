import 'dart:convert' as convert;

import 'package:health_care_website/extension/boolean_extension.dart';

class Insurance {
  String id;
  String name;
  String studentNumber;
  String email;
  String address;
  String phone;
  String identityNumber;
  String accidentReason;
  AccidentType accidentType;
  DateTime accidentDate;
  AccidentLocation accidentLocation;
  ClaimType claimType;
  int applyAmount;
  int claimAmount;
  List<Map<String, int>> receipt;
  List<Map<String, int>> certificate;
  bool depositBook;
  bool xRay;
  String sign;
  DateTime claimDate;
  String applicationScanId;
  String note;
  DateTime createTime;
  DateTime updateTime;

  Insurance({
    required this.id,
    required this.name,
    required this.studentNumber,
    required this.email,
    required this.address,
    required this.phone,
    required this.identityNumber,
    required this.accidentReason,
    required this.accidentType,
    required this.accidentDate,
    required this.accidentLocation,
    required this.claimType,
    required this.applyAmount,
    required this.claimAmount,
    required this.receipt,
    required this.certificate,
    required this.depositBook,
    required this.xRay,
    required this.sign,
    required this.claimDate,
    required this.applicationScanId,
    required this.note,
    required this.createTime,
    required this.updateTime,
  });

  factory Insurance.fromJson(Map<String, dynamic> json) => Insurance(
        id: json["id"],
        name: json["name"],
        studentNumber: json["student_number"],
        email: json["email"],
        address: json["address"],
        phone: json["phone"],
        identityNumber: json["identity_number"],
        accidentReason: json["accident_reason"],
        accidentType: AccidentType.values
            .firstWhere((e) => e.name == json["accident_type"]),
        accidentDate: DateTime.parse(json["accident_date"]),
        accidentLocation: json["accident_location"],
        claimType:
            ClaimType.values.firstWhere((e) => e.name == json["claim_type"]),
        applyAmount: int.parse(json["apply_amount"]),
        claimAmount: int.parse(json["claim_amount"]),
        receipt: convert.json.decode(json["receipt"]),
        certificate: convert.json.decode(json["certificate"]),
        depositBook: json["deposit"] == 1,
        xRay: json["xray"] == 1,
        sign: json["sign"],
        claimDate: DateTime.parse(json["claim_date"]),
        applicationScanId: json["application_scan_id"],
        note: json["note"],
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "student_number": studentNumber,
        "email": email,
        "address": address,
        "phone": phone,
        "identity_number": identityNumber,
        "accident_reason": accidentReason,
        "accident_type": accidentType.name,
        "accident_date": accidentDate.toIso8601String(),
        "accident_location": accidentLocation,
        "claim_type": claimType.name,
        "apply_amount": applyAmount.toString(),
        "claim_amount": claimAmount.toString(),
        "receipt": convert.json.encode(receipt),
        "certificate": convert.json.encode(certificate),
        "deposit_book": depositBook.toZeroOne(),
        "x_ray": xRay.toZeroOne(),
        "sign": sign,
        "claim_date": claimDate.toIso8601String(),
        "application_scan_id": applicationScanId,
        "note": note,
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}

enum AccidentType {
  accident("意外"),
  disease("疾病"),
  others("其他");

  final String label;
  const AccidentType(this.label);
}

enum AccidentLocation {
  insideSchool("校內"),
  outsideSchool("校外");

  final String label;
  const AccidentLocation(this.label);
}

enum ClaimType {
  medical("醫療"),
  dead("身故"),
  others("其他");

  final String label;
  const ClaimType(this.label);
}
