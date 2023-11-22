import { useEffect, useState } from "react";
import { collection, query, getDocs, DocumentData, where } from "firebase/firestore";
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { Ticket } from "@/models/app.models";

/**
 * Custom hook for managing user authentication using Firebase Auth.
 *
 * This hook listens for changes in the user's authentication status and provides
 * the current user object when signed in, or undefined when signed out.
 *
 * @returns An object with the current user information.
 */
export function useAuthentication() {
  // --- Hooks ----------------------------------------------------------------------
  const [user, setUser] = useState<User>();
  // --- END: Hooks ------------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------------
  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);
  // --- END: Side effects ----------------------------------------------------------------

  return {
    user,
  };
}

/**
 * Sign in to firebase using the firebase auth instance.
 * @param email
 * @param password
 */
export function logIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Logout from firebase using the auth instance.
 */
export function logOut() {
  return signOut(auth);
}

/**
 * Returns a custom error message based on firebase error message.
 * @param message firebase error message
 * @returns Custom error message
 */
export function useAuthErrorMessage(message: string): string {
  //firebase errors docs https://firebase.google.com/docs/auth/admin/errors?hl=es-419
  const errorMessageMap: { [key: string]: string } = {
    "invalid-email": "Email inválido",
    "invalid-login-credentials": "Usuario o contraseña inválidos",
    "insufficient-permission": "No tienes permisos",
  };
  const defaultMessage = "Error de autenticación";

  const mappedMessage = Object.keys(errorMessageMap).find((key) => message.includes(key));

  return mappedMessage ? errorMessageMap[mappedMessage] : defaultMessage;
}

/**
 * Returns an array of payment types
 * @returns array
 */
export function usePaymentTypes() {
  // --- Hooks -----------------------------------------------------------------
  const q = query(collection(firestore, "PaymentTypes"));
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [data, setData] = useState<DocumentData[]>([]);
  // --- END: Local state ------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    const fetchData = async () =>
      (await getDocs(q)).docs.forEach((doc) =>
        setData((prev) => {
          const isExist = prev.some((element) => element?.id === doc.id);

          return isExist ? [...prev] : [...prev, { ...doc.data(), id: doc.id }];
        })
      );

    const localKey = "paymentType";
    const localData = localStorage.getItem(localKey);
    const localParserData = localData !== null ? JSON.parse(localData) : false;

    if (localParserData) setData(localParserData);
    else fetchData().then(() => localStorage.setItem(localKey, JSON.stringify(data)));
  }, []);
  // --- END: Side effects -----------------------------------------------------

  return data;
}

/**
 * Returns an array of ticket types
 * @returns array
 */
export function useTicketTypes() {
  // --- Hooks -----------------------------------------------------------------
  const q = query(collection(firestore, "TicketTypes"));
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [data, setData] = useState<DocumentData[]>([]);
  // --- END: Local state ------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    const fetchData = async () =>
      (await getDocs(q)).docs.forEach((doc) =>
        setData((prev) => {
          const isExist = prev.some((element) => element?.id === doc.id);

          return isExist ? [...prev] : [...prev, { ...doc.data(), id: doc.id }];
        })
      );

    const localKey = "ticketType";
    const localData = localStorage.getItem(localKey);
    const localParserData = localData !== null ? JSON.parse(localData) : false;

    if (localParserData) setData(localParserData);
    else fetchData().then(() => localStorage.setItem(localKey, JSON.stringify(data)));
  }, []);
  // --- END: Side effects -----------------------------------------------------

  return data;
}
/**
 * Returns an array of ticket types
 * @returns array
 */
export function useReports({
  id,
  eventId,
  endDate,
  startDate,
}: {
  id: string;
  eventId: string;
  startDate: Date;
  endDate: Date;
}): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    // --- Local state -----------------------------------------------------------
    let data = [];
    const startDateFormat: Date = startDate ? startDate : new Date();
    const endDateFormat: Date = endDate ? endDate : new Date();
    startDateFormat.setHours(0, 0, 0, 0);
    // --- END: Local state ------------------------------------------------------

    const q = query(
      collection(firestore, "Tickets"),
      where("buyDate", ">=", startDateFormat),
      where("buyDate", "<=", endDateFormat),
      where("eventId", "==", eventId),
      where("vendorId", "==", id)
    );

    getDocs(q).then(
      (docsRef) => {
        data = docsRef.docs.map((doc) => ({ ...(doc.data() as Ticket), id: doc.id }));
        resolve(data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * Returns an array of ticket types
 * @returns array
 */
export function useUsers() {
  // --- Hooks -----------------------------------------------------------------
  const q = query(collection(firestore, "Users"));
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [data, setData] = useState<DocumentData[]>([]);
  // --- END: Local state ------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    const fetchData = async () =>
      (await getDocs(q)).docs.forEach((doc) =>
        setData((prev) => {
          const isExist = prev.some((element) => element?.id === doc.id);

          return isExist ? [...prev] : [...prev, { ...doc.data(), id: doc.id }];
        })
      );

    const localKey = "users";
    const localData = localStorage.getItem(localKey);
    const localParserData = localData !== null ? JSON.parse(localData) : false;

    if (localParserData) setData(localParserData);
    else fetchData().then(() => localStorage.setItem(localKey, JSON.stringify(data)));
  }, []);
  // --- END: Side effects -----------------------------------------------------

  return data;
}
