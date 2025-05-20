export interface HelloWorld {
  message: string;
}

export type Role =
  | "ADMIN"
  | "CASHIER"
  | "SECURITY"
  | "STUDENT"
  | "STAFF"
  | "GUEST"
  | "UNVERIFIED"
  | "SUPERADMIN";

export type VehicleApplicationStatus =
  | "APPROVED"
  | "PENDING_FOR_STICKER"
  | "PENDING_FOR_PAYMENT"
  | "PENDING_FOR_SECURITY_APPROVAL"
  | "REJECTED";

export type VehicleApplicationUserType = "STUDENT" | "STAFF";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  appKey: string;
  accessToken: string;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  licensePlate: string;
  make: string;
  model: string;
  series: string;
  color: string;
  driver: Driver;
  schoolMember: SchoolMember;
  images: VehicleImages;
  type: string;
  status: string;
  stickerNumber: string;
  owner: User | null;
}

export interface Driver {
  licenseId: string;
  firstName: string;
  lastName: string;
  licenseImage: string;
  selfiePicture: string;
}

export interface SchoolMember {
  schoolId: string;
  firstName: string;
  lastName: string;
  type: string;
  schoolCredential: string;
}

export interface VehicleImages {
  front: string;
  back: string;
  side: string;
  receipt: string;
  registration: string;
}

export interface Violation {
  id: string;
  category: string;
  violationName: string;
  penalty: number;
  isDeleted: boolean;
}

export interface ViolationRecord {
  id: string;
  userId: string;
  reportedById: string;
  violationId: string;
  vehicleId: string;
  status: string;
  remarks: string;
  evidence: string[];
  date: string;
  user: User | null;
  reporter: User | null;
  violation: Violation | null;
  vehicle: Vehicle | null;
  payment: ViolationRecordPayment | null;
}

export interface ViolationRecordAuditLog {
  id: string;
  actorId: string;
  auditLogType: string;
  violationRecordId: string;
  details: string;
  createdAt: Date;
  actor: User | null;
  violationRecord: ViolationRecord | null;
}

export interface ViolationRecordPayment {
  id: string;
  cashierId: string;
  violationRecordId: string;
  amountDue: number;
  cashTendered: number;
  change: number;
  totalAmountPaid: number;
  timePaid: string;
  cashier: User | null;
  violationRecord: ViolationRecord | null;
}

export interface VehicleApplication {
  id: string;
  stickerNumber: string | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  schoolMember: SchoolMember;
  driver: Driver;
  vehicle: {
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
  };
  status: string;
  applicantId: string;
  applicant?: User;
  payment: StickerApplicationPayment | null;
}

export interface ImageLink {
  url: string;
  alt: string;
}

export interface StickerApplicationPayment {
  id: string;

  amountDue: number;
  cashTendered: number;
  change: number;
  totalAmountPaid: number;

  date: Date;

  cashierId: string;
  cashier: User | null;

  vehicleApplicationId: string;
  vehicleApplication: VehicleApplication | null;
}

export interface AuditLog {
  id: string;
  actionType: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  actorId: string;
  actor?: User | null;
  objectId: string;
}

export interface GetViolationResponse {
  violation: Violation[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  isDeleted: boolean;
}

export interface UserLoginResponse {
  user: User;
  appKey: string;
  accessToken: string;
}

export interface GetVehicleResponse {
  vehicles: Vehicle[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
