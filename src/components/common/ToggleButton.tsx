"use client";

type Props = {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function ToggleButton({
  isActive,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded text-sm font-medium transition ${
        isActive
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}
