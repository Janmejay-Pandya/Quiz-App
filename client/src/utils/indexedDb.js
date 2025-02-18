import { openDB } from "idb";

const dbPromise = openDB("quizDB", 1, {
  upgrade(db) {
    db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
  },
});

export const saveAttempt = async (attempt) => {
  const db = await dbPromise;
  db.put("history", attempt);
};

export const getHistory = async () => {
  const db = await dbPromise;
  return db.getAll("history");
};
