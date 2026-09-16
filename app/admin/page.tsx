import { requireAdmin } from "@/lib/require-admin";

export default async function AdminDashboard() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
      <p className="text-gray-700">
        Welcome to the portfolio admin panel. Use the sidebar to navigate and manage your content.
      </p>
    </div>
  );
}
