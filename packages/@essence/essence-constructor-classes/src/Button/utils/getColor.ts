const UI_TYPE_COLORS: Record<string, "primary" | "secondary" | "inherit"> = {
    1: "primary",
    11: "primary",
    12: "secondary",
    2: "secondary",
    4: "primary",
    5: "primary",
    6: "secondary",
    7: "primary",
};

export function getColor(uitype?: string): "primary" | "secondary" | "inherit" {
    if (typeof uitype === "string") {
        return UI_TYPE_COLORS[uitype] || "inherit";
    }

    return "inherit";
}
