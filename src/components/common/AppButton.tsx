"use client";

export default function AppButton({ children, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`border border-white px-4 py-2 rounded-lg bg-transparent text-white hover:bg-white hover:text-gray-800 transition ${className}`}
    >
      {children}
    </button>
  );
}
