export interface User {
  uid: string;
  email: string;
  name: string;
}

export interface UserData {
  ign: string;
  name: string;
  phone: string;
}

export interface UserWithId extends UserData {
  id: string;
  photo?: string;
}
