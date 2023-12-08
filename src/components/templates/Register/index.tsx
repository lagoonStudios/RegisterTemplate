import * as Yup from "yup";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { useReactToPrint } from "react-to-print";

import Div from "@/components/atoms/Div";
import Span from "@/components/atoms/Span";
import Main from "@/components/atoms/Main";
import Image from "@/components/atoms/Image";
import Button from "@/components/atoms/Button";
import Reports from "@/components/organisms/Reports";
import PersonalForm from "@/components/organisms/PersonalForm";
import ConfirmModal from "@/components/organisms/ConfirmModal";

import { tdhLogo } from "@/assets";
import { logOut, useAuthentication } from "@/hooks/auth";

import { IRegister } from "./Register.types";
import { getUserName, submitHandler } from "./Register.functions";
import { formatValues, initialValues } from "./Register.constants";

export default function Register({ setState, paymentTypes, ticketTypes, users }: IRegister) {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();

  const validationSchema = Yup.object().shape(formatValues);
  const formik = useFormik({
    initialValues,
    onSubmit: async () => setModal(true),
    validationSchema,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    documentTitle: `Reporte_${new Date().toISOString().slice(0, 10)}_${getUserName(user?.uid ?? "", users)}`,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [loading, setLoading] = useState<boolean>(false);
  const [notTriggerPDF, setTrigger] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean>(false);
  const [isCompleted, setComplete] = useState<boolean>(false);
  const [isOpenModal, setModal] = useState(false);
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------

  const onCancel = () => {
    setModal(false);
    setLoading(false);
  };

  const onLogout = () => {
    setState(0);
    logOut();
    window.location.reload();
  };

  const onPrintPage = () => handlePrint();

  const paymentType = useMemo(() => paymentTypes?.find(({ id }) => id === formik.values.paymentType), [formik]);
  const ticketType = useMemo(() => ticketTypes?.find(({ id }) => id === formik.values.ticketType), [formik]);

  const isAdmin = useMemo(() => {
    if (user?.uid)
      return Boolean(
        users?.find((_user) => _user?.id === user.uid)?.roles?.some((value: any) => String(value) === "ADMIN")
      );
    return false;
  }, [user, users]);

  const onSubmit = () => {
    setTrigger(false)
    setValid(true)
    submitHandler({ formik, setLoading, setModal, setState, user, ticketType: ticketType?.label });
  };

  useEffect(() => {    
    if(users?.length > 0 && user){
      const isValid = Boolean(
        users?.find((_user) => _user?.email === user?.email)
      )

      if(isValid ) console.log("Is Valid");
      else onLogout();
    }

  }, [users, user])

  // --- END: Data and handlers ------------------------------------------------
  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          onCancel={onCancel}
          onSubmit={onSubmit}
          data={{
            email: formik.values.email,
            id: formik.values.id,
            name: formik.values.name,
            phoneNumber: formik.values.phoneNumber,
            paymentType: paymentType?.label,
            ticketType: ticketType?.label,
            reference: formik.values.reference,
          }}
        />
      )}
      <Reports
        paymentTypes={paymentTypes}
        ticketTypes={ticketTypes}
        users={users}
        reference={componentRef}
        loading={loading}
        setLoading={setLoading}
        isCompleted={isCompleted && notTriggerPDF}
        setComplete={setComplete}
        onPrintPage={onPrintPage}
        notTriggerPDF={valid}
      />
      <Main customClassNames="bg-desktop bg-cover bg-no-repeat bg-center h-full flex flex-col justify-center items-center p-10 gap-8">
        <Div customClassNames="w-full flex flex-row justify-between items-center font-bold">
          <Image src={tdhLogo} alt="logo" customClassNames="w-32" />
          <Div customClassNames="flex flex-row justify-between items-center gap-3">
            <Span customClassNames="hidden lg:inline">{user?.email}</Span>
            <Button
              customClassNames="hidden lg:inline"
              onClick={() => setState(3)}
              onClickValue=""
              isDisabled={!isAdmin}
            >
              Panel de Administrador
            </Button>
            <Button onClick={() => onLogout()} onClickValue="">
              Cerrar Sesion
            </Button>
          </Div>
        </Div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-transparent flex flex-col lg:grid lg:grid-cols-5 h-2/4 w-full gap-5"
        >
          <PersonalForm
            onPrintPage={() => {
              setTrigger(true)
              setLoading(true)
              setValid(false)
            }}
            formik={formik}
            loading={loading}
            paymentTypes={paymentTypes}
            ticketTypes={ticketTypes}
            setState={setState}
          />
        </form>
      </Main>
    </>
  );
}
