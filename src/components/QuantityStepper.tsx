interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityStepper({ value, onChange }: Props) {
  const safeValue = Math.max(1, value);

  return (
    <div className="inline-flex h-8 shrink-0 items-center overflow-hidden rounded-md border border-[#d8d1c0] bg-white text-[#263128]">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onChange(Math.max(1, safeValue - 1));
        }}
        className="flex h-8 w-8 items-center justify-center text-base font-semibold text-[#6f7468] hover:bg-[#f7f1e3] hover:text-[#263128] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={safeValue <= 1}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="flex h-8 min-w-8 items-center justify-center border-x border-[#d8d1c0] px-2 text-sm font-semibold">
        {safeValue}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onChange(safeValue + 1);
        }}
        className="flex h-8 w-8 items-center justify-center text-base font-semibold text-[#6f7468] hover:bg-[#f7f1e3] hover:text-[#263128]"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
