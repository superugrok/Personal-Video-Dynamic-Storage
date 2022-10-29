export interface IInput {
  type?: string;
  placeholder: string;
  maxLength?: number;
  className?: string;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.MutableRefObject<any>;
}
