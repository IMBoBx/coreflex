import { FetchApi } from "./fetchApi";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Refreshes user data in localStorage after operations that change user state
 * Call this after successful booking/cancellation operations
 */
export const refreshUserDataCache = async (): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            console.warn("No token or userId found for cache refresh");
            return;
        }

        console.log("🔄 Refreshing user data cache...");
        const res = await FetchApi.get(`/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.data) {
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem("userDataTimestamp", Date.now().toString());
            console.log("✅ User data cache refreshed successfully");
        }
    } catch (error) {
        console.error("❌ Failed to refresh user data cache:", error);
    }
};

/**
 * Gets cached user data from localStorage
 */
export const getCachedUserData = () => {
    try {
        const userData = localStorage.getItem("userData");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Failed to parse cached user data:", error);
        return null;
    }
};

/**
 * Checks if cached user data is stale
 */
export const isUserDataStale = (staleTimeMs: number = STALE_TIME): boolean => {
    const timestamp = localStorage.getItem("userDataTimestamp");
    if (!timestamp) return true;

    return Date.now() - parseInt(timestamp) > staleTimeMs;
};

/**
 * Loads user data from cache if available and fresh, otherwise fetches from API
 * This is the smart loading function for components that need user data
 */
export const loadUserData = async () => {
    console.log("📊 Loading user data...");

    // First, try to get cached data
    const cachedData = getCachedUserData();

    // If no cached data or it's stale, fetch fresh data
    if (!cachedData || isUserDataStale()) {
        console.log("🔄 Cache miss or stale data, fetching fresh data...");
        await refreshUserDataCache();
        return getCachedUserData();
    }

    // If cached data is fresh, use it but refresh in background if approaching stale time
    const timestamp = localStorage.getItem("userDataTimestamp");
    if (timestamp) {
        const age = Date.now() - parseInt(timestamp);
        // If data is older than 4 minutes (but less than 5), refresh in background
        if (age > 4 * 60 * 1000) {
            console.log(
                "🔄 Data approaching stale time, refreshing in background..."
            );
            refreshUserDataCache(); // Fire and forget
        } else {
            console.log("✅ Using fresh cached data");
        }
    }

    return cachedData;
};

/**
 * Clears user data cache
 */
export const clearUserDataCache = (): void => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userDataTimestamp");
};
