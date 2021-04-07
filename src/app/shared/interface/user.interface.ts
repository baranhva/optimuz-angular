export type UserType = 'ADMIN' | 'CARETAKER' | 'PATIENT';
export const AdminType: UserType = 'ADMIN';
export const CaretakerType: UserType = 'CARETAKER';
export const PatientType: UserType = 'PATIENT';

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  type?: UserType;
  createdAt?: string;
  updatedAt?: string;
}
