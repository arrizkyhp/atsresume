import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addTool} from "../utils/addTool";
import ToolLine from "../components/ToolLine";
import {MdAddCircle} from "react-icons/md";

const Tools = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Tools</h2>
      {
        resumeData.tools.map((tool, index) => (
          <ToolLine
            key={index}
            tool={tool}
            resumeData={resumeData}
            setResumeData={setResumeData}
            index={index}
          />
        ))
      }
      <button type="button"
              onClick={() => {
                addTool(resumeData, setResumeData, "tools")
              }}
              aria-label="Add"
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle></MdAddCircle>
      </button>
    </div>
  );
};

export default Tools;
