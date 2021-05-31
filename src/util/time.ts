// time
export const getDateAfter = (target: string, dayAfter: number) => {
    const now = new Date(target);
    return new Date(now.setDate(now.getDate() + dayAfter));
}

export const toCommonDate = (time: string) => {
    return time.slice(0, 10).replaceAll('-', '.');
}

export const toCommonDateTime = (time: string) => {
    return `${toCommonDate(time)} ${time.slice(11, 19)}`;
}

export const getPassingText = (time: string) => {
    const target = new Date(time);
    const adjustTime = new Date(target.setTime(target.getTime() - 32400000)).getTime();
    const day = (new Date().getTime() - adjustTime) / 1000 / 3600 / 24

    if (day < 1) return "오늘";
    if (day < 2) return "어제";
    if (day < 3) return "그제";
    if (day < 7) return "이번 주";
    if (day < 30) return "이번 달";

    const month = day / 30;
    if (month < 13) return "올 해";

    return toCommonDate(time);
}

export const getPassingTime = (time: string) => {
    const now = new Date()
    const adjustTime = new Date(now.setHours(now.getHours() + 9)).getTime();

    const min = (adjustTime - new Date(time).getTime()) / 1000 / 60;
    if (min < 60) return Math.floor(min) + "분";
    const hour = min / 60;
    if (hour < 24) return Math.floor(hour) + "시간";
    const day = hour / 24;
    if (day < 7) return Math.floor(day) + "일";
    if (day < 365) return Math.floor(day / 7) + "주";
    return Math.floor(day / 365) + "년";
}
