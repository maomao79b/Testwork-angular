export interface Customer {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  username: string;
  password: string;
}

export interface Employee {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  username: string;
  password: string;
  position: string;
}

export interface AcceptProduct {
  id: number;
  Eid: number;
  Ename: string;
  brand: string;
  model: string;
  description: string;
  date: Date;
  price: number;
  image: string;
}

export interface Product {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  image: string;
}
