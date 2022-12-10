export interface IConfirmModal {
  onSubmit: () => void,
  data: {
    email: string,
    id: string,
  }
}