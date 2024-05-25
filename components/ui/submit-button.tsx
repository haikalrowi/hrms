import { Button, ButtonProps } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return <Button {...props} loading={pending} type="submit" />;
}
