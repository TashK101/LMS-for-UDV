export function stringToDate(stringDate: string| undefined) : string {

    return stringDate ? new Date(stringDate).toLocaleDateString() : '';
}

