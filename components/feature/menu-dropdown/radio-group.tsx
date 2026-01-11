import { Menu } from "@base-ui/react";
import Image from "next/image";

type Option = {
  id: string;
  value: string;
  label: string;
};

export type RadioGroupProps = {
  label: string;
  options: Array<Option>;
};

export default function RadioGroup(props: RadioGroupProps) {
  const { label, options } = props;

  return (
    <Menu.Group className="flex flex-col gap-1">
      <Menu.GroupLabel className="ml-2.5 text-xs text-text-tertiary">
        {label}
      </Menu.GroupLabel>
      <Menu.RadioGroup className="flex flex-col gap-1">
        {options.map((option, index) => (
          <Menu.RadioItem
            key={`radio-item-${label}-${index}`}
            value={option.value}
            className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-background-secondary-hover data-checked:bg-background-secondary"
          >
            <span>{option.label}</span>
            <Menu.RadioItemIndicator>
              <Image
                src="/icon-checkmark.svg"
                width={13}
                height={13}
                alt=""
                aria-hidden
              />
            </Menu.RadioItemIndicator>
          </Menu.RadioItem>
        ))}
      </Menu.RadioGroup>
    </Menu.Group>
  );
}
