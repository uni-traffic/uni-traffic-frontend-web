import { faker } from "@faker-js/faker";

const generateUser = (): IUserDTO => ({
  id: faker.string.uuid(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: faker.helpers.arrayElement(["Admin", "User", "Moderator"])
});

export const generateViolation = (): IViolationDTO => ({
  id: faker.string.uuid(),
  category: faker.helpers.arrayElement(["Parking", "Speeding", "Illegal Turn"]),
  violationName: faker.lorem.words(2),
  penalty: faker.number.int({ min: 50, max: 500 })
});
export const generateViolationData = Array.from({ length: 10 }, generateViolation);

const generateVehicle = (): IVehicleDTO => ({
  id: faker.string.uuid(),
  ownerId: faker.string.uuid(),
  licensePlate: faker.vehicle.vrm(),
  make: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  series: faker.vehicle.model(),
  color: faker.vehicle.color(),
  type: faker.helpers.arrayElement(["Sedan", "SUV", "Truck", "Motorcycle"]),
  images: [faker.image.url(), faker.image.url()],
  isActive: faker.datatype.boolean(),
  stickerNumber: faker.string.alphanumeric(10),
  owner: generateUser()
});

export const generateViolationRecord = (): IViolationRecordDTO => {
  const user = generateUser();
  const reporter = generateUser();
  const violation = generateViolation();
  const vehicle = generateVehicle();

  return {
    id: faker.string.uuid(),
    userId: user.id,
    reportedById: reporter.id,
    violationId: violation.id,
    vehicleId: vehicle.id,
    status: faker.helpers.arrayElement(["UNPAID", "PAID"]),
    remarks: faker.lorem.sentence(),
    date: faker.date.past().toISOString(),
    user,
    reporter,
    violation,
    vehicle
  };
};
export const violationRecordData = Array.from({ length: 10 }, generateViolationRecord);
const generateViolationRecordAuditLog = (): IViolationRecordAuditLogDTO => {
  const actor = generateUser();
  const violationRecord = generateViolationRecord();

  return {
    id: faker.string.uuid(),
    actorId: actor.id,
    auditLogType: faker.helpers.arrayElement(["CREATE", "UPDATE", "DELETE"]),
    details: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    actor,
    violationRecord
  };
};

export const auditLogData = Array.from({ length: 5 }, generateViolationRecordAuditLog);

const generateSchoolMember = (): ISchoolMemberDTO => ({
  schoolId: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  type: faker.helpers.arrayElement(["STUDENT", "STAFF", "SECURITY"]),
  schoolCredential: faker.string.alphanumeric(8)
});

const generateDriver = (): IDriverDTO => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  licenseId: faker.string.alphanumeric(12),
  licenseImage: faker.image.urlLoremFlickr({ category: "people" })
});

const generateVehicleInfo = (): IVehicleInfoDTO => ({
  make: faker.vehicle.manufacturer(),
  series: faker.vehicle.model(),
  type: faker.helpers.arrayElement(["Sedan", "SUV", "Truck", "Motorcycle"]),
  model: faker.vehicle.model(),
  licensePlate: faker.vehicle.vrm(),
  certificateOfRegistration: faker.image.urlLoremFlickr({ category: "transportation" }),
  officialReceipt: faker.image.urlLoremFlickr({ category: "documents" }),
  frontImage: faker.image.urlLoremFlickr({ category: "transportation" }),
  sideImage: faker.image.urlLoremFlickr({ category: "transportation" }),
  backImage: faker.image.urlLoremFlickr({ category: "transportation" })
});

const generateVehicleApplication = (): IVehicleApplicationDTO => {
  const applicant = generateUser();
  return {
    id: faker.string.alphanumeric(12),
    stickerNumber: faker.datatype.boolean() ? faker.string.alphanumeric(10) : null,
    remarks: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    schoolMember: generateSchoolMember(),
    driver: generateDriver(),
    vehicle: generateVehicleInfo(),
    status: faker.helpers.arrayElement([
      "PENDING_FOR_STICKER",
      "PENDING_FOR_PAYMENT",
      "PENDING_FOR_SECURITY_APPROVAL",
      "APPROVED",
      "DENIED"
    ]),
    applicantId: applicant.id,
    applicant,
    payment: faker.datatype.boolean() ? generateMockVehicleApplicationPayment() : null
  };
};

const generateMockVehicleApplicationPayment = (): IVehicleApplicationPaymentDTO => {
  const totalAmount = faker.number.float({ min: 100, max: 1000 });
  const amountPaid = faker.number.float({ min: 50, max: totalAmount });
  const change = amountPaid > totalAmount ? amountPaid - totalAmount : 0;
  const amountDue = 0;

  return {
    id: faker.string.uuid(),
    //vehicleApplicationId: faker.string.uuid(),
    amountPaid,
    change,
    amountDue,
    timePaid: faker.date.past(),
    cashier: faker.datatype.boolean() ? generateUser() : null
  };
};

export const vehicleApplicationData = Array.from({ length: 10 }, generateVehicleApplication);

export interface IUserDTO {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IViolationRecordDTO {
  id: string;
  userId: string;
  reportedById: string;
  violationId: string;
  vehicleId: string;
  status: string;
  remarks: string;
  date: string;
  user: IUserDTO;
  reporter: IUserDTO;
  violation: IViolationDTO;
  vehicle: IVehicleDTO;
}

export interface IViolationDTO {
  id: string;
  category: string;
  violationName: string;
  penalty: number;
}

export interface IVehicleDTO {
  id: string;
  ownerId: string;
  licensePlate: string;
  make: string;
  model: string;
  series: string;
  color: string;
  type: string;
  images: string[];
  isActive: boolean;
  stickerNumber: string;
  owner: IUserDTO;
}

export interface IViolationRecordAuditLogDTO {
  id: string;
  actorId: string;
  auditLogType: string;
  details: string;
  createdAt: Date;
  actor: IUserDTO | null;
  violationRecord: IViolationRecordDTO | null;
}

export interface IVehicleApplicationDTO {
  id: string;
  stickerNumber: string | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  schoolMember: ISchoolMemberDTO;
  driver: IDriverDTO;
  vehicle: IVehicleInfoDTO;
  status: string;
  applicantId: string;
  applicant?: IUserDTO;
  payment?: IVehicleApplicationPaymentDTO | null;
}

export interface ISchoolMemberDTO {
  schoolId: string;
  firstName: string;
  lastName: string;
  type: string;
  schoolCredential: string;
}

export interface IDriverDTO {
  firstName: string;
  lastName: string;
  licenseId: string;
  licenseImage: string;
}

export interface IVehicleInfoDTO {
  make: string;
  series: string;
  type: string;
  model: string;
  licensePlate: string;
  certificateOfRegistration: string;
  officialReceipt: string;
  frontImage: string;
  sideImage: string;
  backImage: string;
}

export interface IVehicleApplicationPaymentDTO {
  id: string;
  // vehicleApplicationId: string;
  amountPaid: number;
  change: number;
  amountDue: number;
  timePaid: Date;
  cashier: IUserDTO | null;
}
