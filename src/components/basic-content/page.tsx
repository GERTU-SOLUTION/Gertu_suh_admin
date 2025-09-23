import { clsx } from "clsx";

interface Props {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export function BasicContent(props: Props) {
  const { children, className, style } = props;

  return (
    <div
      id="basic-content"
  
      className={clsx("p-4 box-border", className)}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
