export interface IScrollButtonProps {
    className?: string;
    direction: "left" | "right";
    orientation: "horizontal" | "vertical";
    visible: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
