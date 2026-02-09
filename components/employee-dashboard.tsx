"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, X } from "lucide-react";
import { useEmployees } from "@/hooks/use-employees";
import { EmployeeTable } from "@/components/employee-table";
import { EmployeeFormDialog } from "@/components/employee-form-dialog";
import { TablePagination } from "@/components/table-pagination";
import { TableSkeleton } from "@/components/loading-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import { StatsGrid } from "@/components/stats-cards";
import { EmptyState } from "@/components/empty-state";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/lib/employee-service";
import type { Employee, EmployeeFormData, SortDirection, RecentHiresStats } from "@/lib/types";

export function EmployeeDashboard() {
  // Query state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // UI state
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [stats, setStats] = useState<RecentHiresStats>({ recentHires: 0, trend: null });

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [search]);

  const { employees, total, isLoading, isError, error, mutate } = useEmployees(
    {
      page,
      pageSize,
      sortBy,
      sortDirection,
      search: debouncedSearch,
    }
  );

  // Fetch stats whenever data changes
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, [total]); // Re-fetch when total employees changes

  const handleSort = useCallback(
    (column: string) => {
      if (column === sortBy) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(column);
        setSortDirection("asc");
      }
      setPage(1);
    },
    [sortBy]
  );

  const handleEdit = useCallback((employee: Employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingEmployee(null);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: EmployeeFormData) => {
      setIsSubmitting(true);
      try {
        if (editingEmployee) {
          await updateEmployee(editingEmployee.id, data);
          toast.success("Employee updated", {
            description: `${data.firstName} ${data.lastName} has been updated.`,
          });
        } else {
          await createEmployee(data);
          toast.success("Employee created", {
            description: `${data.firstName} ${data.lastName} has been added.`,
          });
        }
        setFormOpen(false);
        setEditingEmployee(null);
        mutate();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        toast.error("Operation failed", { description: message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingEmployee, mutate]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      setIsDeleting(id);
      try {
        await deleteEmployee(id);
        toast.success("Employee deleted", {
          description: "The employee has been removed.",
        });
        mutate();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete employee";
        toast.error("Delete failed", { description: message });
      } finally {
        setIsDeleting(null);
      }
    },
    [mutate]
  );

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        {/* Enhanced Header with Gradient */}
        <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight text-white drop-shadow-md">
                  Employee Management
                </h1>
                <p className="text-xs text-white/90 hidden sm:block">
                  Manage your team members efficiently
                </p>
              </div>
            </div>
            <Button onClick={handleAddNew} className="bg-white text-blue-600 hover:bg-white/90 shadow-lg" size="default">
              <Plus className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline font-semibold">Add Employee</span>
              <span className="sm:hidden font-semibold">Add</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {/* Statistics Cards */}
          <StatsGrid
            totalEmployees={total}
            recentHires={stats.recentHires}
            recentHiresTrend={stats.trend}
          />

          {/* Search Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-12 pr-12 text-base shadow-sm border-2 focus:border-primary transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-muted p-1 text-muted-foreground hover:bg-muted-foreground/20 hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium shadow-sm">
                {total} Total
              </Badge>
            </div>
          </div>

          {/* Error State */}
          {isError && (
            <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-medium">Failed to load employees</p>
              <p className="mt-1 text-destructive/80">
                {error?.message || "An unexpected error occurred."}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => mutate()}
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Table or Empty State */}
          {isLoading ? (
            <TableSkeleton rows={pageSize > 10 ? 10 : pageSize} />
          ) : employees.length === 0 && !debouncedSearch ? (
            <EmptyState onAddEmployee={handleAddNew} />
          ) : (
            <EmployeeTable
              employees={employees}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          )}

          {/* Pagination */}
          {!isLoading && (
            <TablePagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </main>

        {/* Form Dialog */}
        <EmployeeFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setEditingEmployee(null);
          }}
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </ErrorBoundary>
  );
}
