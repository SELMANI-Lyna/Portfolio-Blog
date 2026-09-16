"use client";

interface DeleteButtonProps {
  confirmMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DeleteButton({
  confirmMessage = "Are you sure you want to delete this?",
  className = "text-red-600 hover:text-red-800 font-medium",
  children = "Delete",
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
