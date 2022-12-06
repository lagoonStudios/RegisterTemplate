import emailjs from "@emailjs/browser";

export const sendEmail = (to_name: string, to_email: string, id: string) => {
  const templateParams = {
    to_name,
    to_email,
    qr:
      "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" +
      id,
  };
  console.log('template: ', templateParams);
  // serviceId, templateId, templateParams, publicKey
  emailjs
    .send(
      "service_5cted8p",
      "template_ri8cnoo",
      templateParams,
      "cgmGhlqI_1tJf45Y3"
      /* "service_upkefmm",
      "template_4ss2fi3",
      templateParams,
      "QjnxgCCvyTuw_xzgr" */ 
    )
    .then(
      (res) => {
        console.log("respuesta de emailJs: ", res);
      },
      (err) => {
        console.log("error de emailJs: ", err);
      }
    );
};