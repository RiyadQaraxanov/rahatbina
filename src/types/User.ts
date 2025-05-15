export type User = {
  id: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  serialNumber: string;
  serialType: string;
  finCode: string;
  gender: string;
  cityOrDistrict: string;
  email: string;
  phoneNumber: string;
  status: string;
  password: string;
  imageUrl: string | undefined;
  educationLevel: string;
  createdAt: Date;
  updatedAt: Date;
};