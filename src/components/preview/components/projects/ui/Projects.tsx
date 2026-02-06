import React, { useContext } from 'react';
import { ResumeContext } from "../../../../builder";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Project from "../components/Project";

const Projects: React.FC = () => {
  const { resumeData } = useContext(ResumeContext);

  return (
    <SortableContext items={resumeData.projects.map((_, index) => `PROJECTS-${index}`)} strategy={verticalListSortingStrategy}>
      <div>
        <h2
          className="section-title mb-1 border-b-2 border-gray-300 editable"
          contentEditable
          suppressContentEditableWarning
        >
          Projects
        </h2>
        {resumeData.projects.map((item, index) => (
          <Project
            key={`PROJECTS-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default Projects;
