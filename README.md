# Employee Management System

A modern, full-featured employee management dashboard built with Next.js 15 and React. This application provides a comprehensive interface for managing employee data with advanced features like search, filtering, statistics tracking, and a premium dark mode UI.

## ✨ Features

- **Employee CRUD Operations**: Create, read, update, and delete employee records
- **Advanced Search & Filtering**: Real-time search and filtering by department, position, and status
- **Statistics Dashboard**: Visual statistics cards showing total employees, recent hires, and active employees with trend analysis
- **Pagination**: Efficient data navigation with customizable page sizes
- **Premium UI/UX**: 
  - Modern glassmorphism design
  - Smooth animations and transitions
  - Responsive dark mode interface
  - Vibrant color gradients
- **Form Validation**: Client-side and server-side validation for data integrity
- **Type Safety**: Full TypeScript implementation

## 🚀 Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: ASP.NET Core Web API
- **Database**: SQL Server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend API running (ASP.NET Core)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
employee-management-system/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API proxy routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── employee-dashboard.tsx
│   ├── employee-dialog.tsx
│   └── stats-cards.tsx
├── lib/                     # Utilities and types
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔌 API Integration

The application connects to a backend API with the following endpoints:

- `GET /api/employees` - Fetch all employees (with pagination and search)
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/stats` - Get employee statistics

## 🎨 UI Components

- **Employee Dashboard**: Main interface for viewing and managing employees
- **Employee Dialog**: Modal form for creating/editing employee records
- **Stats Cards**: Animated statistics cards with trend indicators
- **Data Table**: Sortable and filterable employee table
- **Search & Filters**: Real-time search with department and status filters

## 🔐 Data Validation

Employee records include the following fields:
- First Name (required)
- Last Name (required)
- Email (required, validated format)
- Phone (required)
- Department (required)
- Position (required)
- Hire Date (required)
- Salary (required, positive number)
- Status (Active/Inactive)

## 🌙 Dark Mode

The application features a premium dark mode design with:
- Glassmorphism effects
- Smooth color transitions
- Optimized contrast ratios
- Gradient accents

## 📱 Responsive Design

Fully responsive layout optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created for Kleios Technologies technical assessment.

## 🐛 Known Issues

None at the moment. Please report any bugs you encounter.

## 📞 Support

For questions or support, please contact the development team.
