// IST timezone utilities for backend date handling
export const IST_TIMEZONE = "Asia/Kolkata";
export const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds

/**
 * Convert a date string (YYYY-MM-DD) to IST start of day (00:00:00 IST)
 * Returns UTC date that represents midnight IST
 */
export function getISTStartOfDay(dateString: string): Date {
    // Create date in IST timezone at midnight
    const istDate = new Date(`${dateString}T00:00:00+05:30`);
    return istDate;
}

/**
 * Convert a date string (YYYY-MM-DD) to IST end of day (23:59:59.999 IST)
 * Returns UTC date that represents end of day IST
 */
export function getISTEndOfDay(dateString: string): Date {
    // Create date in IST timezone at end of day
    const istDate = new Date(`${dateString}T23:59:59.999+05:30`);
    return istDate;
}

/**
 * Get current date in IST timezone
 */
export function getCurrentISTDate(): Date {
    const now = new Date();
    // Convert to IST by adding offset
    return new Date(now.getTime() + IST_OFFSET_MS);
}

/**
 * Convert any date to IST midnight (start of day)
 */
export function toISTStartOfDay(date: Date): Date {
    // Get the date in IST timezone
    const istDateString = date.toLocaleDateString("en-CA", {
        timeZone: IST_TIMEZONE,
    }); // en-CA gives YYYY-MM-DD
    return getISTStartOfDay(istDateString);
}

/**
 * Convert any date to IST end of day (23:59:59.999)
 */
export function toISTEndOfDay(date: Date): Date {
    // Get the date in IST timezone
    const istDateString = date.toLocaleDateString("en-CA", {
        timeZone: IST_TIMEZONE,
    }); // en-CA gives YYYY-MM-DD
    return getISTEndOfDay(istDateString);
}

/**
 * Check if a date is today in IST timezone
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    const todayIST = today.toLocaleDateString("en-CA", {
        timeZone: IST_TIMEZONE,
    });
    const dateIST = date.toLocaleDateString("en-CA", {
        timeZone: IST_TIMEZONE,
    });
    return todayIST === dateIST;
}
