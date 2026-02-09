"use client";

import useSWR from "swr";
import type { EmployeesResponse, EmployeeQueryParams } from "@/lib/types";
import { fetchEmployees } from "@/lib/employee-service";

function buildKey(params: EmployeeQueryParams): string {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/employees?page=${params.page}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&sortDirection=${params.sortDirection}&search=${params.search}`;
}

export function useEmployees(params: EmployeeQueryParams) {
  const { data, error, isLoading, mutate } = useSWR<EmployeesResponse>(
    buildKey(params),
    () => fetchEmployees(params),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    employees: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? params.page,
    pageSize: data?.pageSize ?? params.pageSize,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
