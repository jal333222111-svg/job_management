import * as React from "react";

export function Progress({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
