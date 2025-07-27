import { openDB, type IDBPDatabase } from "idb";
import type { CartItem } from "../models/cart";

const DB_NAME = "tg-miniapp";
const STORE_NAME = "cart";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase>;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

export async function upsertCartItem(item: CartItem) {
  const db = await getDB();
  await db.put(STORE_NAME, item);
}

export async function deleteCartItem(id: number) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function getAllCartItems(): Promise<CartItem[]> {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}

export async function clearCart() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
