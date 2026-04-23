import { Popover } from "@base-ui/react";
import clsx from "clsx";

const { Root, Trigger, Portal, Positioner, Popup, Description, Arrow } =
  Popover;

export default function Infotip({
  children,
  description,
  forOverview,
  className,
}: {
  children: React.ReactNode;
  description: string;
  forOverview?: boolean;
  className?: string;
}) {
  return (
    <Root>
      <Trigger className={clsx(className)} openOnHover delay={30}>
        {children}
      </Trigger>
      <Portal>
        <Positioner side="top" sideOffset={forOverview ? -15 : 0}>
          <Popup
            className={clsx(
              "max-w-35 rounded-md border shadow-xl",
              "origin-top transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
              {
                "border-accent-primary bg-accent-primary px-2.5 py-1.5":
                  forOverview,
                "border-border bg-background-primary px-1.5 py-1": !forOverview,
              },
            )}
          >
            <Description className="text-center text-xs text-text-primary">
              {description}
            </Description>
            <Arrow className="-bottom-1.25">
              <svg width="12" height="7" viewBox="0 0 12 7">
                <path
                  className={clsx({
                    "stroke-accent-primary": forOverview,
                    "stroke-border": !forOverview,
                  })}
                  d="M1 1L6 6L11 1"
                  fill="none"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path
                  className={clsx({
                    "fill-accent-primary": forOverview,
                    "fill-background-primary": !forOverview,
                  })}
                  d="M1 1L6 6L11 1L1 1Z"
                />
              </svg>
            </Arrow>
          </Popup>
        </Positioner>
      </Portal>
    </Root>
  );
}
