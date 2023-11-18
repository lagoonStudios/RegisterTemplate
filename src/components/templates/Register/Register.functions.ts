import emailjs from "@emailjs/browser";
import toastNotify from "react-hot-toast";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { ISubmitHandler } from "./Register.types";

export const sendEmail = (to_name: string, to_email: string, id: string) => {
  const templateParams = {
    to_name,
    to_email,
    qr: "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + id,
  };
  // serviceId, templateId, templateParams, publicKey
  emailjs.send("service_5cted8p", "template_9g9dpch", templateParams, "cgmGhlqI_1tJf45Y3").then(
    (res) => console.log("respuesta de emailJs: ", res),
    (err) => console.log("error de emailJs: ", err)
  );
};

export const submitHandler = ({ setModal, setLoading, setState, formik }: ISubmitHandler) => {
  setModal(false);
  setLoading(true);

  const ticketsRef = collection(firestore, "Tickets");
  const q = query(ticketsRef, where("identificationDoc", "==", formik.values.id));

  getDocs(q)
    .then(async (res) => {
      if (res.docs.length === 0) {
        await addDoc(ticketsRef, {
          name: formik.values.name,
          email: formik.values.email.trim(),
          identificationDoc: formik.values.id,
          phoneNumber: formik.values.phoneNumber,
          paymentTypeId: formik.values.paymentType,
          ticketTypeId: formik.values.ticketType,
          reference: formik.values.reference,
          attendance: false,
          emailSended: false,
          wasPaid: true,
        })
          .then(() => {
            sendEmail(formik.values.name, formik.values.email, formik.values.id);
            setLoading(false);
            setState(2);
          })
          .catch((e) => {
            setLoading(false);
            toastNotify.error("Error Registrando Datos");
            console.log(e);
          });
      } else {
        setLoading(false);
        toastNotify.error("El usuario ya está registrado");
      }
    })
    .catch(({ message }) => {
      const errorMessage = String(message);
      toastNotify.error(`Error: ${errorMessage}`);
      setLoading(false);
    });
};
