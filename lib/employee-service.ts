import type {
  Employee,
  EmployeeFormData,
  EmployeesResponse,
  EmployeeQueryParams,
} from "./types";

const BASE_URL = "/api/employees";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      errorBody.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export async function fetchEmployees(
  params: EmployeeQueryParams
): Promise<EmployeesResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    sortBy: params.sortBy,
    sortDirection: params.sortDirection,
    search: params.search,
  });

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
  return handleResponse<EmployeesResponse>(response);
}

export async function createEmployee(
  data: EmployeeFormData
): Promise<Employee> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Employee>(response);
}

export async function updateEmployee(
  id: number,
  data: EmployeeFormData
): Promise<Employee> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Employee>(response);
}

export async function deleteEmployee(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Failed to delete employee");
  }
}
