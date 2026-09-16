import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
