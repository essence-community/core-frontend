import * as React from "react";

interface IFieldComboListSugListenerProps {
    onCalculateOffset: () => void;
    suggestionsSize: number;
}

export const FieldComboListSugListener: React.FC<IFieldComboListSugListenerProps> = ({
    suggestionsSize,
    onCalculateOffset,
}) => {
    React.useEffect(() => {
        onCalculateOffset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suggestionsSize]);

    return null;
};
