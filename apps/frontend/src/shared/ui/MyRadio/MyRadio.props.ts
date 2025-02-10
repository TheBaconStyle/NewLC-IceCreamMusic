import { InputHTMLAttributes } from "react";

export type TMyRadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name?: string;
  tooltip?: {
    id: string;
    text: string;
  };
  value?: string;
};
