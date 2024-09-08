import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const createFirestoreDataConverter = <
  T extends DocumentData
>(): FirestoreDataConverter<T> => {
  console.log("createFirestoreDataConverter");
  return {
    toFirestore(data: T): DocumentData {
      return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
      return snapshot.data();
    },
  };
};
