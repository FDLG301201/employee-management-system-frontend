import { NextResponse } from "next/server";
import https from "https";

// Lee la URL del backend desde variable de entorno, con fallback para desarrollo local
const BACKEND_URL = process.env.BACKEND_API_URL || "https://localhost:7035";

// Create https agent for development (ignores self-signed certificates)
const httpsAgent = new https.Agent({
    rejectUnauthorized: process.env.NODE_ENV !== "development",
});

export async function GET() {
    try {
        // Fetch all employees from backend
        const backendUrl = `${BACKEND_URL}/api/employees?page=1&pageSize=9999`;

        console.log("Fetching stats from backend:", backendUrl);

        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // @ts-ignore - Node.js specific option for fetch
            agent: backendUrl.startsWith("https") ? httpsAgent : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend API error:", response.status, errorText);
            return NextResponse.json(
                { message: `Backend API error: ${response.status}` },
                { status: response.status }
            );
        }

        const backendData = await response.json();
        const employees = backendData.items || [];

        // Calculate date ranges
        const now = new Date();
        // Set to end of current day to include all hires from today
        now.setHours(23, 59, 59, 999);

        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        // Set to start of day for clean comparison
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const sixtyDaysAgo = new Date(now);
        sixtyDaysAgo.setDate(now.getDate() - 60);
        // Set to start of day for clean comparison
        sixtyDaysAgo.setHours(0, 0, 0, 0);

        console.log('Date ranges:', {
            now: now.toISOString(),
            thirtyDaysAgo: thirtyDaysAgo.toISOString(),
            sixtyDaysAgo: sixtyDaysAgo.toISOString()
        });

        // Filter employees hired in last 30 days
        const recentHires = employees.filter((emp: any) => {
            const hireDate = new Date(emp.hireDate);
            const isRecent = hireDate >= thirtyDaysAgo && hireDate <= now;
            console.log(`Employee ${emp.firstName} ${emp.lastName} - Hire: ${hireDate.toISOString()} - Recent: ${isRecent}`);
            return isRecent;
        }).length;

        // Filter employees hired 30-60 days ago (previous month)
        const previousMonthHires = employees.filter((emp: any) => {
            const hireDate = new Date(emp.hireDate);
            return hireDate >= sixtyDaysAgo && hireDate < thirtyDaysAgo;
        }).length;

        console.log('Stats calculated:', { recentHires, previousMonthHires });

        // Calculate trend
        let trend = null;

        if (previousMonthHires === 0 && recentHires > 0) {
            // New hires when there were none before
            trend = { value: 100, isPositive: true };
        } else if (previousMonthHires === 0 && recentHires === 0) {
            // No change, both are zero
            trend = null;
        } else if (previousMonthHires > 0) {
            // Calculate percentage change
            const percentageChange = ((recentHires - previousMonthHires) / previousMonthHires) * 100;
            trend = {
                value: Math.abs(Math.round(percentageChange)),
                isPositive: percentageChange >= 0,
            };
        }

        return NextResponse.json({
            recentHires,
            trend,
        });
    } catch (error) {
        console.error("Error calculating stats:", error);
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Failed to calculate stats",
            },
            { status: 500 }
        );
    }
}
