export function handleSelectRow(
    selectedRow: HTMLTableRowElement,
    row: HTMLTableRowElement,
    firstActiveElement: HTMLElement | null,
) {
    if (firstActiveElement) {
        firstActiveElement.focus();
    } else {
        row.focus();
    }

    if (!selectedRow) {
        row.click();
    }
}
