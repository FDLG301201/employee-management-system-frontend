"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface EmptyStateProps {
    onAddEmployee: () => void;
}

export function EmptyState({ onAddEmployee }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 py-16 animate-fadeIn">
            {/* Animated Icon */}
            <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <UserPlus className="h-10 w-10 text-white" />
                </div>
            </div>

            {/* Text Content */}
            <h3 className="mb-2 text-2xl font-semibold tracking-tight">
                No employees yet
            </h3>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
                Get started by adding your first team member to the system.
            </p>

            {/* CTA Button */}
            <Button
                onClick={onAddEmployee}
                size="lg"
                className="button-gradient shadow-lg hover:shadow-xl"
            >
                <UserPlus className="mr-2 h-5 w-5" />
                Add Your First Employee
            </Button>

            {/* Decorative elements */}
            <div className="mt-8 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="h-2 w-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
        </div>
    );
}
