import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
      <ProjectForm />
    </div>
  );
}
