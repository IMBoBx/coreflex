"use client";
import { BulkUserData } from "@/types/bulkUser";
import { useAuth } from "@/components/ProtectedRoute";
import { FetchApi } from "@/lib/fetchApi";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function FileUpload() {
    const { token } = useAuth();
    const [bulkData, setBulkData] = useState<BulkUserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return; // TODO: add error handling here maybe
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const userData: BulkUserData[] = jsonData.map((row: any) => ({
                    username: row["Name"],
                    email: row["Email"],
                    phone: row["Phone"],
                    sessions_left: row["Sessions Left"],
                    start_date: row["Start Date"],
                    end_date: row["End Date"],
                }));

                setBulkData(userData);
            } catch (error: any) {
                // TODO: add error handling here
            }
        };

        reader.readAsArrayBuffer(file);
    };
    const submitData = async () => {
        if (!bulkData || bulkData.length === 0) {
            console.log("No data to submit");
            return;
        }

        setLoading(true);
        try {
            const res = await FetchApi.post(
                "/user/bulk",
                { userData: bulkData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res?.data?.success) {
                console.log("Bulk upload successful:", res.data.result);
                // TODO: add TimedAlert for success
            } else {
                console.error(
                    "Upload failed:",
                    res?.data?.error || "Unknown error"
                );
                // TODO: add TimedAlert for error
            }
        } catch (error) {
            console.error("Upload error:", error);
            // TODO: add TimedAlert for error
        } finally {
            setBulkData([]);
            setLoading(false);
        }
    };
    return (
        <div className="space-y-4">
            <input
                type="file"
                name="excelUp"
                id="excelUp"
                accept=".xlsx,.xls"
                multiple={false}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
            />

            {bulkData.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                        {bulkData.length} users ready to upload
                    </span>
                    <button
                        onClick={submitData}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading..." : "Upload Data"}
                    </button>
                </div>
            )}
        </div>
    );
}
