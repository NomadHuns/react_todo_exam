export const formatKoreanDate = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hour = `${date.getHours()}`.padStart(2, "0");
    const minute = `${date.getMinutes()}`.padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
};

export const getKoreanISOString = (): string => {
    const now = new Date(); // 이미 한국 시간임 (로컬 기준)

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};