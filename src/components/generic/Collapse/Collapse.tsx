import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import arrowIcon from "../../../assets/arrow-icon.svg";

type CollapseProps = {
  title: string;
  className?: string;
  children?: ReactNode;
};

const Collapse = forwardRef(
  ({ title, className = "", children }: CollapseProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
      toggle: () => {
        setIsOpen((prev) => !prev);
      },
      isOpen,
      contentRef,
      containerRef,
    }));

    return (
      <div className={`mb-2 bg-transparent ${className}`} ref={containerRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="z-10 flex cursor-pointer items-center justify-between hover:bg-indigo-200"
          aria-expanded={isOpen}
          role="button"
        >
          <img
            src={arrowIcon}
            alt="arrow-icon.svg"
            className={`${
              isOpen ? "rotate-90" : "rotate-0"
            } duration-300 size-4 mr-2`}
          />
          <div className="w-full">{title}</div>
        </div>
        <div
          ref={contentRef}
          className={`transition-height overflow-hidden duration-700 ease-in-out ${
            isOpen ? "max-h-[700px]" : "max-h-0"
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
);

Collapse.displayName = "Collapse";

export { Collapse };
