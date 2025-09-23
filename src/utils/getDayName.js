export default function getDayName(dateStr) {
    const weekdays = [
        "Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]
    let date = new Date(dateStr);
    const day = date.getDay();
    return weekdays[day+1];
}