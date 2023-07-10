export interface Customer {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface Employee {
  id: number;
  username: string;
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
  Eid: number;
  Ename: string;
  productName: string;
  description: string;
  date: Date;
  price: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
