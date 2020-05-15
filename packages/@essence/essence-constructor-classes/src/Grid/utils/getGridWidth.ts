export function getGridWidth(calcGridWidth: number, isAllSet: boolean, tableContentNode: HTMLElement | undefined) {
    const offsetWidth = tableContentNode?.parentElement?.offsetWidth;

    return (!offsetWidth || calcGridWidth < offsetWidth) && !isAllSet ? "100%" : `${calcGridWidth}px`;
}
