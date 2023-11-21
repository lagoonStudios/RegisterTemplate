
import { EState } from "@/pages/Main/Main.types";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export interface IWrapperComponent {
  user?: User; 
  state: EState;
  setState: React.Dispatch<React.SetStateAction<EState>>;
  paymentTypes: DocumentData[];
  ticketTypes: DocumentData[];
  users: DocumentData[];
}