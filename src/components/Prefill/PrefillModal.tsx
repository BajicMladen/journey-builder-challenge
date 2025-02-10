import { Node } from "../../types/base";
import { createPortal } from "react-dom";
import { Button } from "../generic/Button/Button";
import Search from "../generic/Search/Search";
import { Collapse } from "../generic/Collapse/Collapse";
import { useState } from "react";

import { GLOBAL_DATA } from "../../mock/global-data";

type PrefillModalProps = {
  preReqNodes: Node[];
  onClose: () => void;
  onSelect: (targetNode: string, field: string) => void;
};

const PrefillModal = ({
  onSelect,
  onClose,
  preReqNodes,
}: PrefillModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState({
    targetNode: "",
    field: "",
  });

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white shadow-lg w-2xl">
        <div className="h-16 px-6 w-full border-b border-gray-300 flex items-center">
          Select data element to map
        </div>
        <div className="overflow-y-scroll max-h-96 w-full flex">
          <div className="bg-indigo-50 w-1/2 px-6 pt-2 flex flex-col gap-2 border-r-1 border-gray-300 h-full">
            <div>Available Data</div>
            <Search onSearch={(value: string) => setSearchQuery(value)} />
            {Object.entries(GLOBAL_DATA).map(([key, data]) => (
              <Collapse key={key} title={data.name}>
                {Object.entries(data.data).map(([key]) => (
                  <div key={key}>
                    {(searchQuery === "" || key.includes(searchQuery)) && (
                      <div
                        className="mt-1 pl-10 block w-full cursor-pointer hover:bg-indigo-200"
                        onClick={() => {
                          setSelectedField({
                            targetNode: data.name,
                            field: key,
                          });
                        }}
                      >
                        {key}
                      </div>
                    )}
                  </div>
                ))}
              </Collapse>
            ))}
            {preReqNodes.map((node) => (
              <Collapse key={node.id} title={node.data.name ?? ""}>
                {Object.entries(node.data.form ?? {}).map(([key]) => (
                  <div key={key}>
                    {(searchQuery === "" || key.includes(searchQuery)) && (
                      <div
                        className="mt-1 pl-10 block w-full cursor-pointer hover:bg-indigo-200"
                        onClick={() => {
                          setSelectedField({
                            targetNode: node.data.name,
                            field: key,
                          });
                        }}
                      >
                        {key}
                      </div>
                    )}
                  </div>
                ))}
              </Collapse>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-1/2 p-4 sticky top-0">
            <div>Selected Node: {selectedField.targetNode || "None"}</div>
            <div>Selected Field: {selectedField.field || "None"}</div>
          </div>
        </div>

        <div className="w-full border-t border-gray-300 flex gap-3 items-center justify-end px-2">
          <Button handleClick={onClose} className="m-2">
            Cancel
          </Button>
          <Button
            handleClick={() => {
              onSelect(selectedField.targetNode, selectedField.field);
              onClose();
            }}
            disabled={!selectedField.targetNode}
            className="m-2"
          >
            Select
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrefillModal;
