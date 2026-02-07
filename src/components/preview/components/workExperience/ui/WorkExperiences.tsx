import React, { useContext } from 'react';
import { ResumeContext } from "../../../../builder";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import WorkExperience from "../components/WorkExperience";

const WorkExperiences: React.FC = () => {
  const { resumeData } = useContext(ResumeContext);

  return (
    <SortableContext items={resumeData.workExperience.map((_, index) => `WORK_EXPERIENCE-${index}`)} strategy={verticalListSortingStrategy}>
      <div className="work-experience-container">
        <h2
          className="section-title mb-1 border-b-2 border-gray-300 editable"
          contentEditable
          suppressContentEditableWarning
        >
          Work Experience
        </h2>
        {resumeData.workExperience.map((item, index) => (
          <WorkExperience
            key={`WORK_EXPERIENCE-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default WorkExperiences;
