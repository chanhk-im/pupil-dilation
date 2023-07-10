export const days = ['일', '월', '화', '수', '목', '금', '토'];

export function getDateShortFormat(inputDate) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    return `${year}.${month < 10 ? '0' : ''}${month}.${
        date < 10 ? '0' : ''
    }${date}`;
}

export function getDateFormat(inputDate) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    const day = inputDate.getDay();
    const hour = inputDate.getHours();
    const minute = inputDate.getMinutes();
    return `${year}.${month < 10 ? '0' : ''}${month}.${
        date < 10 ? '0' : ''
    }${date} (${days[day]}) ${hour < 10 ? '0' : ''}${hour}:${
        minute < 10 ? '0' : ''
    }${minute}`;
}

export function getDateScheduleFormat(inputDate) {
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    const day = inputDate.getDay();
    const hour = inputDate.getHours();
    const minute = inputDate.getMinutes();
    return `(${month}/${date} ${days[day]}) ${hour < 10 ? '0' : ''}${hour}:${
        minute < 10 ? '0' : ''
    }${minute}`;
}
