
export interface IScrollButtonProps {
   className?: string,
   direction: "left" | "right",
   orientation: "horizontal" | "vertical",
   visible: boolean,
   onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
}