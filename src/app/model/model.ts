export interface Customer{
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface Employee{
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  password: string;
  position: string;
}

export interface AcceptProduct {
  id: number;
  employeeName: string;
  date: Date;
  description: string;
  image: string;
  price: number;
}

