
import { EState } from "@/pages/Main/Main.types";
import { DocumentData } from "firebase/firestore";
import { FormikValues } from "formik";

export interface IPersonalForm {
  formik: FormikValues;
  loading: boolean;
  paymentTypes: DocumentData[];
  ticketTypes: DocumentData[];
  setState: React.Dispatch<number>; 
}