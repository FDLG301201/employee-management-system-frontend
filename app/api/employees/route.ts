import { NextRequest, NextResponse } from "next/server";
import https from "https";

// Lee la URL del backend desde variable de entorno, con fallback para desarrollo local
const BACKEND_URL = process.env.BACKEND_API_URL || "https://localhost:7035";

console.log(BACKEND_URL, "ESTA ES LA URL DEL BACKEND");

// Create https agent for development (ignores self-signed certificates)
const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV !== "development",
});

// Helper to transform backend response to frontend format
function transformBackendResponse(backendData: any) {
  return {
    data: backendData.items.map((item: any) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      jobTitle: item.jobTitle,
      hireDate: item.hireDate,
    })),
    total: backendData.totalCount,
    page: backendData.pageNumber,
    pageSize: backendData.pageSize,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";
    const search = searchParams.get("search") || "";

    // Build backend API URL
    const backendUrl = `${BACKEND_URL}/api/employees?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;

    console.log("Fetching from backend:", backendUrl);

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
    const transformedData = transformBackendResponse(backendData);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to fetch employees",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendUrl = `${BACKEND_URL}/api/employees`;

    console.log("Creating employee at:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

    const newEmployee = await response.json();
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to create employee",
      },
      { status: 500 }
    );
  }
}