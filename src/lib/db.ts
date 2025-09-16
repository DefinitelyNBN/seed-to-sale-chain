import Dexie, { Table } from "dexie";

export interface FarmerRecord {
  id?: number;
  name: string;
  quantity: number;
  fertilizerAmount: number;
  address: string;
  pincode: string;
  createdAt: number;
}

export interface RetailerRecord {
  id?: number;
  name: string;
  town: string;
  pincode: string;
  createdAt: number;
}

export class AppDatabase extends Dexie {
  farmers!: Table<FarmerRecord, number>;
  retailers!: Table<RetailerRecord, number>;

  constructor() {
    super("seedToSaleDB");
    this.version(1).stores({
      farmers: "++id, name, pincode, createdAt",
      retailers: "++id, name, pincode, createdAt",
    });
  }
}

export const db = new AppDatabase();

