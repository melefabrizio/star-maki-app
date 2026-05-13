import Dexie, { type Table } from "dexie";

interface DishPhoto {
  dishId: string;
  blob: Blob;
  updatedAt: number;
}

class ImageDatabase extends Dexie {
  dishPhotos!: Table<DishPhoto, string>;

  constructor() {
    super("StarMakiPhotos");
    this.version(1).stores({
      dishPhotos: "dishId",
    });
  }
}

const db = new ImageDatabase();

export async function getPhoto(dishId: string): Promise<DishPhoto | undefined> {
  return db.dishPhotos.get(dishId);
}

export async function savePhoto(dishId: string, blob: Blob): Promise<void> {
  await db.dishPhotos.put({ dishId, blob, updatedAt: Date.now() });
}

export async function deletePhoto(dishId: string): Promise<void> {
  await db.dishPhotos.delete(dishId);
}

export async function deletePhotos(dishIds: string[]): Promise<void> {
  await db.dishPhotos.bulkDelete(dishIds);
}
