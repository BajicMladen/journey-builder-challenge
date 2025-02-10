import { Handle, Position } from "reactflow";
import { FormIcon } from "../../assets";

interface FormNodeProps {
  data: {
    label: string;
  };
}

const FormNode = ({ data }: FormNodeProps) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 w-56">
      <div className="bg-indigo-400 text-white rounded-lg p-3 flex items-center justify-center">
        <img src={FormIcon} alt="from-icon.svg" className="size-5 fill-white" />
      </div>
      <div className="ml-2">
        <p className="text-xs text-gray-500">Form</p>
        <p className="font-semibold">{data.label}</p>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
};

export default FormNode;
