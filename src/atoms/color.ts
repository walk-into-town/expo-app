export const colorCode = {
    primary: "#4487D6",
    alert: "#0B54AB",
    sub: "#679FE2",
    light: "#95BDEE",

    background: "#F2F1F2",
    disable: "#9BA1A7",
    gray: "gray",
    appleRed: "#ff3b30",
    appleBlue: "#0067A3",
}

export const renderColor = (percentage: number) => {
    if (percentage > 80) return colorCode.light
    if (percentage > 60) return colorCode.sub
    if (percentage > 40) return colorCode.primary
    if (percentage > 20) return colorCode.alert
    return colorCode.appleRed
}