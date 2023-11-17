export interface IConfirmModal {
  onCancel: () => void,
  onSubmit: () => void,
  data: {
    email: string,
    id: string,
    name: string,
    phoneNumber: string,
    paymentType: string,
    ticketType: string,
    reference: string,
  }
}