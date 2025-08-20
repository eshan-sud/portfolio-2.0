// src/app/page.js

import Home from "@/app/home/page";
import MaintenancePage from "@/components/MaintenancePage";

export default function App() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }
  return <Home />;
}
