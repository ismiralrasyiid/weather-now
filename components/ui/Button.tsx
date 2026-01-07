import { Button as BaseUIButton, ButtonProps } from "@base-ui/react";
import clsx from "clsx";

export default function Button(props: ButtonProps) {
  return (
    <BaseUIButton
      {...props}
      className={clsx(
        "rounded-xl bg-accent-primary px-6 py-3 text-lg",
        props.className,
      )}
    />
  );
}
