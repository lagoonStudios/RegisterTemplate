export interface IConfirmModal {
  onCancel: () => void,
  onSubmit: () => void,
  data: {
    email: string,
    id: string,
  }
}