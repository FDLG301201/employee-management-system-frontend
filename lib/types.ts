export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  hireDate: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  hireDate: string;
}

export interface EmployeesResponse {
  data: Employee[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export type SortDirection = "asc" | "desc";

export interface EmployeeQueryParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
  search: string;
}

export interface RecentHiresStats {
  recentHires: number;
  trend: {
    value: number;
    isPositive: boolean;
  } | null;
}
