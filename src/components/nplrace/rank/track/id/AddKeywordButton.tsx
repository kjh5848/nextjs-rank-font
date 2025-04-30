import { Plus } from "lucide-react";

interface AddKeywordButtonProps {
  onClick: () => void;
}

export default function AddKeywordButton({ onClick }: AddKeywordButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      <Plus size={16} className="mr-2" />
      추가
    </button>
  );
} 