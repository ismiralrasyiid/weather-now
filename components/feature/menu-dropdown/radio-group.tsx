import { RadioSelectUnitOptions } from "@/constants/unit";
import { Menu } from "@base-ui/react";
import Image from "next/image";

export type RadioGroupProps<TValue = string> =
  RadioSelectUnitOptions<TValue> & { value: TValue };

export default function RadioGroup<TValue>(props: RadioGroupProps<TValue>) {
  const { label, id, options, value } = props;

  return (
    <Menu.Group className="flex flex-col gap-1">
      <Menu.GroupLabel className="ml-2.5 text-xs text-text-tertiary">
        {label}
      </Menu.GroupLabel>
      <Menu.RadioGroup className="flex flex-col gap-1" value={value}>
        {options.map((option, index) => (
          <Menu.RadioItem
            key={`radio-item-${id}-${index}`}
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
