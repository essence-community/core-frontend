// @flow

export default () => ({
    "@keyframes loader_first_path_animation": {
        "0%": {
            strokeDasharray: "250",
        },
        "12.5%": {
            strokeDasharray: "200 50",
        },
        "25%": {
            strokeDasharray: "150 50 50",
        },
        "37.5%": {
            strokeDasharray: "100 50 50 50",
        },
        "50%": {
            strokeDasharray: "50 50 50 50 50",
        },
        "62.5%": {
            strokeDasharray: "0 50 50 50 100",
        },
        "75%": {
            strokeDasharray: "0 0 50 50 150",
        },
        "87.5%": {
            strokeDasharray: "0 0 0 50 200",
        },
        // eslint-disable-next-line
        "100%": {
            strokeDasharray: "0 0 0 0 250",
        },
    },
    "@keyframes loader_second_path_animation": {
        "0%": {
            strokeDashoffset: "0",
        },
        "12.5%": {
            strokeDashoffset: "54",
        },
        "25%": {
            strokeDashoffset: "54",
        },
        "37.5%": {
            strokeDashoffset: "108",
        },
        "75%": {
            strokeDashoffset: "108",
        },
        "87.5%": {
            strokeDashoffset: "162",
        },
        "87.6%": {
            strokeDashoffset: "162",
        },
        // eslint-disable-next-line
        "100%": {
            strokeDashoffset: "216",
        },
    },
    firstPath: {
        animation: "loader_first_path_animation 3s linear forwards",
        animationDelay: "0",
        animationIterationCount: "infinite",
        strokeDasharray: "244",
        strokeDashoffset: "1",
    },
    root: {
        outline: "none",
        position: "relative",
    },
    rootIcon: {
        stroke: "#F78F1E",
    },
    secondPath: {
        animation: "loader_second_path_animation 3s linear forwards",
        animationDelay: "0",
        animationIterationCount: "infinite",
        strokeDasharray: "54",
        strokeDashoffset: "0",
    },
});
