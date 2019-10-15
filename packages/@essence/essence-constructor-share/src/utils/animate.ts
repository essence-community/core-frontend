const DEFAULT_DURATION = 300;

function easeInOutSin(time: number) {
    return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

// eslint-disable-next-line max-params
function animate(prop: string, element: any, to: number, options: any = {}) {
    const {ease = easeInOutSin, duration = DEFAULT_DURATION} = options;

    let start: number | null = null;
    const from = element[prop];
    let cancelled = false;

    const cancel = () => {
        cancelled = true;
    };

    const step = (timestamp: number) => {
        if (cancelled) {
            return;
        }

        if (start === null) {
            start = timestamp;
        }
        const time = Math.min(1, (timestamp - start) / duration);

        element[prop] = ease(time) * (to - from) + from;

        if (time >= 1) {
            return;
        }

        requestAnimationFrame(step);
    };

    if (from === to) {
        return cancel;
    }

    requestAnimationFrame(step);

    return cancel;
}

export default animate;
