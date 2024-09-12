import { DocumentData, getDoc } from "firebase/firestore";
import { createDocRef } from "./createDocRef";
import { firestore } from "../firebase";

/**
 * Asynchronously fetches a single document from a Firestore collection by its ID.
 *
 * @template T - The type that extends `DocumentData` which the document is expected to conform to.
 * @param {string} collectionPath - The path to the Firestore collection.
 * @param {string} docId - The ID of the document to fetch.
 *
 * @returns {Promise<T>} - A promise that resolves to the fetched document data.
 *
 * @throws Will throw an error if the document does not exist.
 * @throws Will throw an error if the document exists but contains no data.
 *
 * @example
 * ```typescript
 * const userData = await getCollectionItem<UserData>('users', 'user123');
 * ```
 */

export const getCollectionItem = async <T extends DocumentData>(
  collectionPath: string,
  docId: string
): Promise<T | null> => {
  console.log("getCollectionItem");
  const dataRef = createDocRef<T>(firestore, collectionPath, docId);
  const docSnap = await getDoc(dataRef);
  if (!docSnap.exists()) {
    return null;
  }
  const data = { id: docSnap.id, ...docSnap.data() };
  if (!data) return null;
  return data;
};
