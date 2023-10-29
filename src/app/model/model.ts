export interface Customer {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  username: string;
  password: string;
  image: string;
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
  image: string;
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
  amount: number;
  status: string;
  product: string;
  image: string;
}
export interface Login {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  amount: number;
  category: string;
  image: string;
}

export interface UpdateStatusAccept {
  id: number;
  status: string;
}

export interface SaleHistory {
  id: number;
  cid: number;
  total: number;
  product: string;
  amount: string;
}
