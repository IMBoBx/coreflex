import { refreshUserDataCache } from "./userDataCache";

/**
 * Utility functions for refreshing data after user actions
 * These functions ensure that the UI stays synchronized with the backend state
 */

export const DataRefreshUtils = {
    /**
     * Call after successful booking operations
     */
    afterBooking: async () => {
        console.log("📅 Post-booking data refresh...");
        await refreshUserDataCache();
    },

    /**
     * Call after successful cancellation operations
     */
    afterCancellation: async () => {
        console.log("❌ Post-cancellation data refresh...");
        await refreshUserDataCache();
    },

    /**
     * Call after any operation that might affect user session counts
     */
    afterSessionChange: async () => {
        console.log("🔄 Session change detected, refreshing data...");
        await refreshUserDataCache();
    },

    /**
     * Call after login to ensure fresh data
     */
    afterLogin: async () => {
        console.log("🔐 Post-login data refresh...");
        await refreshUserDataCache();
    },

    /**
     * Manual refresh function for debugging or force refresh scenarios
     */
    forceRefresh: async () => {
        console.log("⚡ Force refreshing all user data...");
        await refreshUserDataCache();
    },
};
