interface IMapMasksType {
    [$key: string]: RegExp;
}

const mapMasks: IMapMasksType = {
    // eslint-disable-next-line require-unicode-regexp
    9: /\d/,
};

export const getMask = (inputMask: string): Array<string | RegExp> =>
    inputMask.split("").map((mask) => mapMasks[mask] || mask);
