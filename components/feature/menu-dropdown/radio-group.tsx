import { Menu } from "@base-ui/react";
import Image from "next/image";

export type SelectOption<TValue = string> = {
  label: string;
  value: TValue;
};

export type RadioSelectOptions<TValue = string> = {
  label: string;
  id: string;
  options: ReadonlyArray<SelectOption<TValue>>;
};

export type RadioGroupProps<TValue = string> = RadioSelectOptions<TValue> & {
  value: TValue;
};

export default function RadioGroup<TValue>(props: RadioGroupProps<TValue>) {
  const { label, id, options, value } = props;

  return (
    <Menu.Group className="flex flex-col gap-1">
      <Menu.GroupLabel className="ml-2.5 text-xs text-text-tertiary">
        {label}
      </Menu.GroupLabel>
      <Menu.RadioGroup className="flex flex-col gap-1" value={value} disabled>
        {options.map((option, index) => (
          <Menu.RadioItem
            key={`radio-item-${id}-${index}`}
            value={option.value}
            className="flex items-center justify-between rounded-lg p-2 data-checked:bg-background-secondary"
          >
            <span>{option.label}</span>
            <Menu.RadioItemIndicator>
              <Image
                className="size-3.25"
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
