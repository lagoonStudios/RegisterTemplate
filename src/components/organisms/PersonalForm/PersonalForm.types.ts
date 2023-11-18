
import { DocumentData } from "firebase/firestore";
import { FormikValues } from "formik";

export interface IPersonalForm {
  formik: FormikValues;
  loading: boolean;
  paymentTypes: DocumentData[]
  ticketTypes: DocumentData[]   
}