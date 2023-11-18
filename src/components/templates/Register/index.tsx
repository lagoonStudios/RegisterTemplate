import * as Yup from "yup";
import { useMemo, useState } from "react";
import { useFormik } from "formik";

import Div from "@/components/atoms/Div";
import Span from "@/components/atoms/Span";
import Main from "@/components/atoms/Main";
import Button from "@/components/atoms/Button";
import Image from "@/components/atoms/Image";
import PersonalForm from "@/components/organisms/PersonalForm";
import ConfirmModal from "@/components/organisms/ConfirmModal";

import { tdhLogo } from "@/assets";
import { IRegister } from "./Register.types";
import { submitHandler } from "./Register.functions";
import { logOut, useAuthentication } from "@/hooks/auth";
import { formatValues, initialValues } from "./Register.constants";

export default function Register({ setState, paymentTypes, ticketTypes }: IRegister) {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useAuthentication();

  const validationSchema = Yup.object().shape(formatValues);
  const formik = useFormik({
    initialValues,
    onSubmit: async () => setModal(true),
    validationSchema,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setModal] = useState(false);
  // --- END: Local state ------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const onSubmit = () => {
    submitHandler({ formik, setLoading, setModal, setState, user });
  };

  const onCancel = () => {
    setModal(false);
    setLoading(false);
  };

  const onLogout = () => {
    setState(0);
    logOut();
  };

  const paymentType = useMemo(() => paymentTypes?.find(({ id }) => id === formik.values.paymentType), [formik]);
  const ticketType = useMemo(() => ticketTypes?.find(({ id }) => id === formik.values.ticketType), [formik]);

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
      <Main customClassNames="bg-desktop bg-cover bg-no-repeat bg-center h-full flex flex-col justify-center items-center p-10 gap-8">
        <Div customClassNames="w-full flex flex-row justify-between items-center">
          <Image src={tdhLogo} alt="logo" customClassNames="w-32" />
          <Div customClassNames="flex flex-row justify-between items-center gap-3">
            <Span customClassNames="hidden lg:inline">{user?.email}</Span>
            <Span customClassNames="hidden lg:inline">Contacto</Span>
            <Button onClick={onLogout} onClickValue="">
              Cerrar Sesion
            </Button>
          </Div>
        </Div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-transparent flex flex-col lg:grid lg:grid-cols-5 h-2/4 w-full gap-5"
        >
          <PersonalForm formik={formik} loading={loading} paymentTypes={paymentTypes} ticketTypes={ticketTypes} />
        </form>
      </Main>
    </>
  );
}
