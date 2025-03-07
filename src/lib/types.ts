
export interface HelloWorld {
  message: string;
}

export type Role = "security" | "guest" | "staff" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar: string;
    dateCreated: string;
  }