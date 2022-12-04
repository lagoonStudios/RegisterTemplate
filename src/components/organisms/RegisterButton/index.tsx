import emailjs from "@emailjs/browser";

export default function SendMailBtn() {
  const sendEmail = function (to_name: string, to_email: string) {
    const templateParams = {
      to_name,
      to_email,
      qr:
        "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=&" +
        to_email,
    };
    // serviceId, templateId, templateParams, publicKey
    emailjs
      .send(
        "service_8rujj47",
        "template_t29chmv",
        templateParams,
        "cgmGhlqI_1tJf45Y3"
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

  return (
    <button
      onClick={() => sendEmail("Rafael Rivas Gay", "Pablo.ruiz3098@gmail.com")}
    >
      Envíar Email
    </button>
  );
}
