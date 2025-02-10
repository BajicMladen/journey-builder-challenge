type ButtonProps = {
  id?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
  className?: string;
  children: React.ReactNode;
};
export const Button = ({
  disabled = false,
  type = "button",
  handleClick,
  className = "",
  children,
  id,
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 min-w-20 flex h-10 items-center justify-center gap-4 px-3 md:px-4 ${className} ${
        disabled && "pointer-events-none opacity-40"
      }`}
    >
      {children}
    </button>
  );
};
