export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  isManager: boolean;
  isTranslator: boolean;
  isBanned: boolean;
  isProfileComplete: boolean;
  city: string;
  state: string;
  languages: string[];
}
