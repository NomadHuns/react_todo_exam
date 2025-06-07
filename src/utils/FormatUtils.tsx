export function formatKoreanDate(isoString: string): string {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hour = `${date.getHours()}`.padStart(2, "0");
    const minute = `${date.getMinutes()}`.padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
}

export function getRelativeDayLabel(dateString: string | undefined): string {
    if (typeof dateString != "string") return "";

    const inputDate = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfInput = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = startOfInput.getTime() - startOfToday.getTime();
    const diffInDays = Math.round(diffInMs / msPerDay);

    if (diffInDays === 0) return "오늘";
    if (diffInDays === 1) return "내일";
    if (diffInDays > 2) return `D-${diffInDays}`;
    if (diffInDays === -1) return "어제";
    return `D+${Math.abs(diffInDays)}`;
}

export function getKoreanISOString(): string {
    const now = new Date(); // 이미 한국 시간임 (로컬 기준)

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}