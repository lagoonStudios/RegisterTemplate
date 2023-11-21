import { DocumentData } from "firebase/firestore";

export interface IAdminForm {
  onPrintPage: () => void;
  users: DocumentData[];
  setState: React.Dispatch<number>;
  setUserSelected: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
}
