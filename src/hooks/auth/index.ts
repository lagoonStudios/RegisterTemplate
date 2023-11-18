import { useEffect, useState } from "react";
import { collection, query, getDocs, DocumentData, where } from "firebase/firestore";
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";

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
      } else {
        // User is signed out
        setUser(undefined);
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

    fetchData();
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

    fetchData();
  }, []);
  // --- END: Side effects -----------------------------------------------------

  return data;
}
/**
 * Returns an array of ticket types
 * @returns array
 */
export function useReports({ id, eventId }: { id: string; eventId: string }) {
  // --- Local state -----------------------------------------------------------
  const [data, setData] = useState<DocumentData[]>([]);
  const startDate: Date = new Date();
  const endDate: Date = new Date();
  startDate.setHours(0, 0, 0, 0);
  // --- END: Local state ------------------------------------------------------

  // --- Hooks -----------------------------------------------------------------
  // --- END: Hooks ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(firestore, "Tickets"),
          where("buyDate", ">=", startDate),
          where("buyDate", "<=", endDate),
          where("eventId", "==", eventId),
          where("vendorId", "==", id)
        );

        getDocs(q).then(
          (docsSnap) => {
            if (!docsSnap.empty) {
              docsSnap.docs.forEach((doc) => {
                setData((prev) => {
                  const isExist = prev.some((element) => element?.id === doc.id);
                  return isExist ? [...prev] : [...prev, { ...doc.data(), id: doc.id }];
                });
              });
            }
          },
          (error: any) => {
            console.log(error);
          }
        );

        // (await getDocs(q)).docs.forEach((doc) =>
        // setData((prev) => {
        // const isExist = prev.some((element) => element?.id === doc.id);

        //return isExist ? [...prev] : [...prev, { ...doc.data(), id: doc.id }];
        // })
        //)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // --- END: Side effects -----------------------------------------------------

  return data;
}
