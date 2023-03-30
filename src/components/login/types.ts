export type InputProps = {
  onchange: (value: string) => void;
  type: "text" | "password";
  name: string;
  placeholder: string;
}
