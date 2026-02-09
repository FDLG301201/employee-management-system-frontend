"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon, Users, UserPlus } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    } | null;
    gradient?: string;
}

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    gradient = "from-blue-500 to-purple-600",
}: StatCardProps) {
    return (
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeIn">
            {/* Gradient background */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 dark:opacity-10`}
            />

            {/* Content */}
            <div className="relative p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="mt-2 text-3xl font-bold tracking-tight">
                            {value}
                        </p>
                        {description && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}
                        {trend && (
                            <div className="mt-2 flex items-center gap-1">
                                <span
                                    className={`text-xs font-medium ${trend.isPositive
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                        }`}
                                >
                                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    vs last month
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Icon */}
                    <div
                        className={`rounded-lg bg-gradient-to-br ${gradient} p-3 shadow-lg`}
                    >
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div
                    className={`h-full w-full rounded-lg border-2 border-transparent bg-gradient-to-r ${gradient} opacity-20`}
                />
            </div>
        </Card>
    );
}

interface StatsGridProps {
    totalEmployees: number;
    recentHires?: number;
    recentHiresTrend?: {
        value: number;
        isPositive: boolean;
    } | null;
}

export function StatsGrid({
    totalEmployees,
    recentHires = 0,
    recentHiresTrend = null,
}: StatsGridProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
            <StatCard
                title="Total Employees"
                value={totalEmployees}
                description="Active team members"
                icon={Users}
                gradient="from-blue-500 to-blue-600"
            />

            <StatCard
                title="Recent Hires"
                value={recentHires}
                description="Last 30 days"
                icon={UserPlus}
                gradient="from-green-500 to-emerald-600"
                trend={recentHiresTrend}
            />
        </div>
    );
}
