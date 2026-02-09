"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Employee, SortDirection } from "@/lib/types";

interface EmployeeTableProps {
  employees: Employee[];
  sortBy: string;
  sortDirection: SortDirection;
  onSort: (column: string) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  isDeleting: number | null;
}

function SortIcon({
  column,
  sortBy,
  sortDirection,
}: {
  column: string;
  sortBy: string;
  sortDirection: SortDirection;
}) {
  if (column !== sortBy) {
    return <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground/50" />;
  }
  return sortDirection === "asc" ? (
    <ArrowUp className="ml-1 h-3 w-3" />
  ) : (
    <ArrowDown className="ml-1 h-3 w-3" />
  );
}

export function EmployeeTable({
  employees,
  sortBy,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  isDeleting,
}: EmployeeTableProps) {
  const columns = [
    { key: "firstName", label: "First Name", className: "" },
    { key: "lastName", label: "Last Name", className: "" },
    { key: "email", label: "Email", className: "hidden md:table-cell" },
    { key: "jobTitle", label: "Job Title", className: "hidden lg:table-cell" },
    { key: "hireDate", label: "Hire Date", className: "hidden lg:table-cell" },
  ];

  if (employees.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="flex items-center font-medium hover:text-foreground transition-colors"
                  >
                    {col.label}
                    <SortIcon
                      column={col.key}
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                    />
                  </button>
                </TableHead>
              ))}
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center">
                <p className="text-muted-foreground">No employees found.</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Try adjusting your search or add a new employee.
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                <button
                  type="button"
                  onClick={() => onSort(col.key)}
                  className="flex items-center font-medium hover:text-foreground transition-colors"
                >
                  {col.label}
                  <SortIcon
                    column={col.key}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                  />
                </button>
              </TableHead>
            ))}
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {employee.firstName}
              </TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell className="hidden md:table-cell">
                {employee.email}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {employee.jobTitle}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(employee.hireDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(employee)}
                    aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        disabled={isDeleting === employee.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete{" "}
                          <strong>
                            {employee.firstName} {employee.lastName}
                          </strong>
                          ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(employee.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
