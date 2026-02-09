import { NextRequest, NextResponse } from "next/server";

// Lee la URL del backend desde variable de entorno, con fallback para desarrollo local
const BACKEND_URL = process.env.BACKEND_API_URL || "https://localhost:7035";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = `${BACKEND_URL}/api/employees/${id}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Disable SSL verification for local development
      // @ts-ignore - Node.js specific option
      ...(process.env.NODE_ENV === "development" && {
        agent: new (await import("https")).Agent({
          rejectUnauthorized: false,
        }),
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Employee not found" },
          { status: 404 }
        );
      }
      const errorText = await response.text();
      console.error("Backend API error:", response.status, errorText);
      return NextResponse.json(
        { message: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }

    const employee = await response.json();
    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to fetch employee",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const backendUrl = `${BACKEND_URL}/api/employees/${id}`;

    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // Disable SSL verification for local development
      // @ts-ignore - Node.js specific option
      ...(process.env.NODE_ENV === "development" && {
        agent: new (await import("https")).Agent({
          rejectUnauthorized: false,
        }),
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Employee not found" },
          { status: 404 }
        );
      }
      const errorText = await response.text();
      console.error("Backend API error:", response.status, errorText);
      return NextResponse.json(
        { message: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Backend returns 204 No Content on successful update
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to update employee",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = `${BACKEND_URL}/api/employees/${id}`;

    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // Disable SSL verification for local development
      // @ts-ignore - Node.js specific option
      ...(process.env.NODE_ENV === "development" && {
        agent: new (await import("https")).Agent({
          rejectUnauthorized: false,
        }),
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Employee not found" },
          { status: 404 }
        );
      }
      const errorText = await response.text();
      console.error("Backend API error:", response.status, errorText);
      return NextResponse.json(
        { message: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Backend returns 204 No Content on successful delete
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to delete employee",
      },
      { status: 500 }
    );
  }
}
