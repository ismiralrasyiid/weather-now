import { Button as BaseUIButton, ButtonProps } from "@base-ui/react";
import clsx from "clsx";

export default function Button(props: ButtonProps) {
  return (
    <BaseUIButton
      {...props}
      className={clsx(
        "cursor-pointer rounded-xl bg-accent-primary px-6 py-3 text-lg hover:bg-accent-primary-hover",
        props.className,
      )}
    />
  );
}
