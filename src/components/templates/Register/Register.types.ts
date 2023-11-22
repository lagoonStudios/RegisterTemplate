import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { FormikValues } from "formik";
import { Dispatch } from "react";

export interface IRegister {
  setState: Dispatch<number>;
  paymentTypes: DocumentData[];
  ticketTypes: DocumentData[];
  users: DocumentData[];
}

export interface ISubmitHandler {
  formik: FormikValues;
  setModal: (value: React.SetStateAction<boolean>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setState: React.Dispatch<number>;
  user?: User;
  ticketType: string;
}
