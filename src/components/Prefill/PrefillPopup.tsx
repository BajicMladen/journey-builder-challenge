import { useState } from "react";
import PrefillModal from "./PrefillModal.tsx";
import { Node } from "../../types/base.ts";
import { useGraph } from "../../context/GraphContext.tsx";
import { Button, Toggle } from "../generic";
import { CloseIcon, DatabaseIcon } from "../../assets/index.ts";
import { GRAPH_STATE_ACTIONS } from "../../enums/state.ts";

type PrefillPopupProps = {
  node: Node;
  preReqNodes: Node[];
  onClose: () => void;
  handleFormChange: (
    selectedField: string,
    targetNode: string,
    key: string
  ) => void;
};

const PrefillPopup = ({
  node,
  preReqNodes,
  onClose,
  handleFormChange,
}: PrefillPopupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const { dispatch } = useGraph();

  const handlePrefill = () => {
    if (node.data.prefillForm) {
      dispatch({
        type: GRAPH_STATE_ACTIONS.REMOVE_INHERITED_FIELDS,
        payload: { currentNode: node },
      });
    } else {
      dispatch({
        type: GRAPH_STATE_ACTIONS.POPULATE_FORM_FROM_ANCESTORS,
        payload: { currentNode: node },
      });
    }
  };

  return (
    <div className="absolute bg-white border top-0 left-0 border-gray-300 shadow-lg rounded-lg p-6 w-full  max-h-80 overflow-scroll flex flex-col items-center">
      <div className="flex flex-row justify-between items-center mb-4 w-full">
        <div>
          <div className="text-lg font-normal">{node.data.name} Prefill</div>
          <div className="text-sm">Prefill text for this form</div>
        </div>
        <Toggle
          checked={node.data.prefillForm}
          handleChange={() => handlePrefill()}
        />
      </div>
      <div className="space-y-3 w-full">
        {Object.entries(node.data.form ?? {}).map(([key, value]) => (
          <div key={key}>
            <div
              onClick={() => {
                if (!value.data?.source) {
                  setSelectedField(key);
                  setIsModalOpen(true);
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

      {isModalOpen && (
        <PrefillModal
          onSelect={(value: string, key: string) =>
            handleFormChange(selectedField, value, key)
          }
          onClose={() => setIsModalOpen(false)}
          preReqNodes={preReqNodes}
        />
      )}
    </div>
  );
};

export default PrefillPopup;
