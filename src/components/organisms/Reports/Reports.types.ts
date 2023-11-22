import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { FormikValues } from "formik";
import { ForwardedRef } from 'react';

export interface IRegister {
  paymentTypes: DocumentData[];
  ticketTypes: DocumentData[];
  users: DocumentData[];
  reference?: ForwardedRef<HTMLDivElement>;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  isCompleted: boolean
  setComplete: React.Dispatch<React.SetStateAction<boolean>>
  onPrintPage: () => void
}

export interface ISubmitHandler {
  formik: FormikValues;
  setModal: (value: React.SetStateAction<boolean>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setState: React.Dispatch<number>;
  user?: User;
}
