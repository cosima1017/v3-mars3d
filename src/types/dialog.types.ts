export interface IDialogProps {
  visible: boolean
  title: string
  width: number
  height: number
  container: string
}

export interface IDialogEmits {
  'update:visible': [boolean]
}
