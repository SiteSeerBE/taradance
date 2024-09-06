import { auth, doc, firestore, setDoc } from "./firebase";

const writeToFireStore = async (
  path: string,
  documentId: string,
  document: object
) => {
  const docRef = doc(firestore, path, documentId);
  await setDoc(docRef, document, { merge: true });
};

export { writeToFireStore };
