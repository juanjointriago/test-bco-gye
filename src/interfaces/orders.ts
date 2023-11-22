export interface ICreateOrder {
    userId: number;
    status: string;
    tax: number;
    subtotal: number;
    discount: number;
    total: number;
    isActive: number;
    notes: string;
    details: IDetail[];
  }
  export interface IDetail {
    productId: number;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
  }