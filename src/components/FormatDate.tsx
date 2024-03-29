export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options).split(",");

    // Formatting hours and minutes
    return formattedDate.splice(0, 2).join(", ") + " · " + formattedDate.at(-1);
}