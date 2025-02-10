import { useRef } from "react";
import { Node } from "../../types/base";
import { Button } from "../generic/Button/Button";
import { Toggle } from "../generic/Toggle.tsx/Toggle";
import DatabaseIcon from "../../assets/database-icon.svg";
import CloseIcon from "../../assets/close-icon.svg";

type PrefillPopupProps = {
  node: Node;
  onClose: () => void;
  handleFormChange: (
    selectedField: string,
    targetNode: string,
    key: string
  ) => void;
};

const PrefillPopup = ({
  node,
  onClose,
  handleFormChange,
}: PrefillPopupProps) => {
  const popupRef = useRef(null);

  return (
    <div
      ref={popupRef}
      className="absolute bg-white border top-0 left-0 border-gray-300 shadow-lg rounded-lg p-6 w-full  max-h-80 overflow-scroll flex flex-col items-center"
    >
      <div className="flex flex-row justify-between items-center mb-4 w-full">
        <div>
          <div className="text-lg font-normal">{node.data.name} Prefill</div>
          <div className="text-sm">Prefill text for this form</div>
        </div>
        <Toggle checked={true} handleChange={() => console.log()} />
      </div>
      <div className="space-y-3 w-full">
        {Object.entries(node.data.form ?? {}).map(([key, value]) => (
          <div key={key}>
            <div
              onClick={() => {
                if (!value.data?.source) {
                  console.log(true);
                }
              }}
              className={`mt-1 block w-full p-2  border-gray-300  text-gray-700 bg-gray-200  ${
                value.data?.source
                  ? "rounded-full  cursor-default"
                  : "border-2 border-gray-300 hover:border-indigo-400 hover:bg-indigo-200 border-dashed cursor-pointer rounded-md"
              }`}
            >
              <div
                className={`flex flex-row items-center justify-between gap-2 pl-1 ${
                  !value.data?.source && "text-gray-400"
                }`}
              >
                <div className="flex flex-row gap-2 ">
                  {!value.data?.source && (
                    <img
                      src={DatabaseIcon}
                      alt="database-icon.svg"
                      className="size-5"
                    />
                  )}
                  {value.data?.source
                    ? `${key}: ${value.data.source}.${value.data.field}`
                    : key}
                </div>
                {value.data?.source && (
                  <img
                    src={CloseIcon}
                    alt="database-icon.svg"
                    className="size-6 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFormChange(key, "", "");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button handleClick={onClose} className="mt-4 w-full py-3">
        Close
      </Button>
    </div>
  );
};

export default PrefillPopup;
