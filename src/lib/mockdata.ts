import { faker } from "@faker-js/faker";

const generateUser = (): IUserDTO => ({
  id: faker.string.uuid(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: faker.helpers.arrayElement(["Admin", "User", "Moderator"])
});

const generateViolation = (): IViolationDTO => ({
  id: faker.string.uuid(),
  category: faker.helpers.arrayElement(["Parking", "Speeding", "Illegal Turn"]),
  violationName: faker.lorem.words(2),
  penalty: faker.number.int({ min: 50, max: 500 })
});

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
    status: faker.helpers.arrayElement(["Pending", "Resolved", "Dismissed"]),
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
