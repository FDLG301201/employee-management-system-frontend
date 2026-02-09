import { mockEmployees } from "@/lib/mock-data";
import type { Employee } from "@/lib/types";

// Shared in-memory store for demo purposes
// In production, this would be replaced with a database
const store: Employee[] = [...mockEmployees];

export function getStore(): Employee[] {
  return store;
}

export function resetStore(): void {
  store.length = 0;
  store.push(...mockEmployees);
}
