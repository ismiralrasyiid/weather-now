"use client";

import { Select as BaseUISelect } from "@base-ui/react";
import Image from "next/image";
import clsx from "clsx";

export type SelectProps<T = string> = {
  className?: string;
  items: Array<{ label: string; value: string }>;
  value: T | null;
  onChange: (value: T | null) => void;
};

const {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  ItemText,
} = BaseUISelect;

export default function Select<T>(props: SelectProps<T>) {
  const { className, items, value, onChange } = props;

  return (
    <Root items={items} value={value} onValueChange={onChange}>
      <Trigger
        className={clsx(
          "flex cursor-pointer items-center gap-3.5 rounded-lg bg-background-tertiary px-4 py-2 text-sm",
          className,
        )}
        aria-label={`${value}`}
      >
        <Value />
        <Icon>
          <Image
            src="/icon-dropdown.svg"
            alt="Icon Dropdown"
            width={12}
            height={12}
            aria-hidden
          />
        </Icon>
      </Trigger>
      <Portal>
        <Positioner alignItemWithTrigger={false} align="end" sideOffset={10}>
          <Popup>
            <List className="flex min-w-select cursor-pointer flex-col gap-1 rounded-lg border border-border bg-background-primary p-1.5">
              {items.map(({ label, value }) => (
                <Item
                  key={label}
                  value={value}
                  className="rounded-lg p-1.5 text-text-primary hover:bg-background-secondary-hover data-selected:bg-background-secondary"
                >
                  <ItemText>{label}</ItemText>
                </Item>
              ))}
            </List>
          </Popup>
        </Positioner>
      </Portal>
    </Root>
  );
}
