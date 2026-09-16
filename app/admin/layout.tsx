import Link from "next/link";
import { auth, signOut } from "@/auth";
import { requireAdmin } from "@/lib/require-admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {session?.user && (
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-4 text-xl font-bold border-b border-gray-800">
            Portfolio Admin
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">
              Dashboard
            </Link>
            <Link href="/admin/profile" className="block px-4 py-2 rounded hover:bg-gray-800">
              Profile
            </Link>
            <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-gray-800">
              Projects
            </Link>
            <Link href="/admin/certificates" className="block px-4 py-2 rounded hover:bg-gray-800">
              Certificates
            </Link>
            <Link href="/admin/internships" className="block px-4 py-2 rounded hover:bg-gray-800">
              Internships
            </Link>
            <Link href="/admin/education" className="block px-4 py-2 rounded hover:bg-gray-800">
              Education
            </Link>
            <Link href="/admin/skills" className="block px-4 py-2 rounded hover:bg-gray-800">
              Skills
            </Link>
            <Link href="/admin/currently" className="block px-4 py-2 rounded hover:bg-gray-800">
              Currently Status
            </Link>
            <Link href="/admin/contact" className="block px-4 py-2 rounded hover:bg-gray-800">
              Contact Info
            </Link>
            <Link href="/admin/blog" className="block px-4 py-2 rounded hover:bg-gray-800">
              Blog
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-left"
              >
                Sign Out
              </button>
            </form>
          </div>
        </aside>
      )}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
