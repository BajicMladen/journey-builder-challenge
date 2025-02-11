type ToggleProps = {
  checked: boolean;
  disabled?: boolean;
  handleChange: () => void;
};

const DEFAULT_TOGGLE_STYLE = [
  "w-10",
  "h-4",
  "bg-gray-500",
  "rounded-full",
  "dark:bg-gray-700",
  "text-center",
  "text-indigo-200",
  "after:absolute",
  "after:top-[-3px]",
  "after:left-[-3px]",
  "after:bg-white",
  "after:border-gray-600",
  "after:border-b-2",
  "after:rounded-full",
  "after:h-6",
  "after:w-6",
  "after:transition-all",
  "peer-checked:after:translate-x-full",
  'peer-checked:after:content-["✓"]',
  "peer-checked:bg-indigo-400",
  "peer-checked:after:bg-indigo-600",
  "peer-checked:after:border-indigo-600",
].join(" ");

const Toggle = ({ checked, disabled, handleChange }: ToggleProps) => {
  return (
    <label
      className="relative inline-flex cursor-pointer items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="peer sr-only"
        onChange={(e) => {
          if (!disabled) {
            e.stopPropagation();
            handleChange();
          }
        }}
      />
      <div className={DEFAULT_TOGGLE_STYLE}></div>
    </label>
  );
};

export default Toggle;
