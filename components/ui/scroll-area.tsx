import { ScrollArea as BaseUIScrollArea } from "@base-ui/react/scroll-area";
import clsx from "clsx";

export type ScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
  thumbOffset: number;
};

export default function ScrollArea(props: ScrollAreaProps) {
  const { children, className, thumbOffset } = props;

  return (
    <BaseUIScrollArea.Root>
      <BaseUIScrollArea.Viewport>
        <BaseUIScrollArea.Content className={clsx(className)}>
          {children}
        </BaseUIScrollArea.Content>
      </BaseUIScrollArea.Viewport>
      <BaseUIScrollArea.Scrollbar
        style={{ right: thumbOffset }}
        className="w-thumb"
      >
        <BaseUIScrollArea.Thumb className="w-full cursor-pointer border border-border bg-background-secondary" />
      </BaseUIScrollArea.Scrollbar>
    </BaseUIScrollArea.Root>
  );
}
