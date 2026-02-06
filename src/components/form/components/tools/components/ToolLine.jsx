import React from 'react';
import {handleTool} from "../utils/handleTool";
import {BsTrash3} from "react-icons/bs";
import {removeTool} from "../utils/removeTool";

const ToolLine = ({resumeData, setResumeData, tool, index}) => {
  return (
    <div
      className="flex gap-5 items-center"
    >
      <input
        type="text"
        placeholder={"Tool"}
        name="tool"
        className="w-full mb-0 other-input"
        value={tool}
        onChange={(e) => handleTool(resumeData, setResumeData, e, index, "tools")}
      />
      <button
        type="button"
        onClick={() => {
          removeTool(resumeData, setResumeData, index, "tools")
        }}
        aria-label="Remove"
        className="p-2 text-white bg-fuchsia-700 rounded text-xl"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default ToolLine;
