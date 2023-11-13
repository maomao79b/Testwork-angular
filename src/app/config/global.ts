import { Customer, AcceptProduct, SaleHistory } from './../model/model';

export class Login{
  public static readonly LoginStatus: string = "LoginStatus";
  public static readonly LOGIN: string = "LOGIN";
  public static readonly LOGOUT: string = "LOGOUT";
}

export class CurrentPath {
  public static readonly CURRENT_PATH: string = "CURRENT_PATH";
  public static readonly CUSTOMERS_PATH: string = "/customer";
  public static readonly EMPLOYEES_PATH: string = "/employee";
  public static readonly PACKPRODUCT_PATH: string = "/packproduct";
  public static readonly ACCEPTPRODUCTS_PATH: string = "/acceptProduct";
  public static readonly REPORT_PATH: string = "/report";
  public static readonly PRODUCT_PATH: string = "/product";
  public static readonly SALE_PATH: string = "/sale";
}

export class Position {
  public static readonly POSITION: string = "POSITION";
  public static readonly OWNER: string = "OWNER";
  public static readonly SALER: string = "SALER";
  public static readonly WAREHOUSE: string = "WAREHOUSE";
}

export class Account {
  public static readonly ACCOUNT: string = "ACCOUNT";
  public static readonly ACCOUNT_NAME: string = "ACCOUNT_NAME";
  public static readonly ACCOUNT_ID: string = "ACCOUNT_ID";
}

export class Category {
  public static readonly SET: string = "SET";
  public static readonly NORMAL: string = "NORMAL";
}

export class StatusProductToRequestAceept{
  public static readonly DRAFT: string = "บันทึกร่าง";
  public static readonly NOT_YET_APPROVED: string = "รออนุมัติ";
  public static readonly APPROVED: string = "อนุมัติแล้ว";
  public static readonly DISAPPROVAL: string = "ไม่อนุมัติ";
}

export class Environment {
  public static readonly baseUrl :string ="https://shopapi2.azurewebsites.net";
  // public static readonly baseUrl :string ="https://localhost:7148";
  public static readonly Customers :string = this.baseUrl + "/api/Customers";
  public static readonly Employees :string = this.baseUrl + "/api/Employees";
  public static readonly Products :string = this.baseUrl + "/api/Products";
  public static readonly AcceptProducts :string = this.baseUrl + "/api/AcceptProducts";
  public static readonly SaleHistories :string = this.baseUrl + "/api/SaleHistories";
}

export const Token: string = "Token";
