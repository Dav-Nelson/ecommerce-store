import { User } from "lucide-react";

export function UserButton({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-2 border p-1 rounded-full px-3">
      <span className="text-sm font-medium">{user.name}</span>
      <div className="bg-gray-200 p-1 rounded-full">
        <User className="h-4 w-4" />
      </div>
    </div>
  );
}