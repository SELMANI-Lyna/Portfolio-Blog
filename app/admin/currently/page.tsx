import { prisma } from "@/lib/prisma";
import { updateCurrentlyStatus } from "../actions";

export default async function CurrentlyPage() {
  const status = await prisma.currentlyStatus.findUnique({ where: { id: "singleton" } });
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Currently Status</h1>
      <form action={updateCurrentlyStatus} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What are you up to?</label>
          <textarea name="text" rows={4} defaultValue={status?.text || ""} required
            className="w-full rounded-md border-gray-300 border p-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">Save</button>
      </form>
    </div>
  );
}
