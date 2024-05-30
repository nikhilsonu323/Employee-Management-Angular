import { Role } from "./Role";

export interface Employee{
    empNo: string;
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    roleId: number;
    role: Role;
    managerId: string | null;
    manager: Employee | null;
    mobileNUmber: string | null;
    project: string | null;
    dateOfBirth: Date | null;
    joiningDate: Date;
  }