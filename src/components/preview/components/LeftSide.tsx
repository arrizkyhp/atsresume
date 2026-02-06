import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import type { ResumeData } from '../../../types/resume';

const LeftSide: React.FC<{ resumeData: ResumeData; sectionVisibility: Record<string, boolean>; className?: string }> = ({ resumeData, sectionVisibility, className = '' }) => {
  return (
    <div className={`${className} space-y-2`}>
      {sectionVisibility.summary && resumeData.summary.length > 0 && (
        <div className="mb-1">
          <h2 className="section-title mb-1 border-b-2 border-gray-300">
            Summary
          </h2>
          <p className="content break-words">{resumeData.summary}</p>
        </div>
      )}

      {sectionVisibility.education && resumeData.education.length > 0 && (
        <div className="mb-1 education-item">
          <h2 className="section-title mb-1 border-b-2 border-gray-300">
            Education
          </h2>
          {resumeData.education.map((item: any, index: number) => (
            <div key={index} className="mb-1">
              <p className="content i-bold">{item.degree}</p>
              <p className="content">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              />
            </div>
          ))}
        </div>
      )}

      {sectionVisibility.skills && (
        <SortableContext items={resumeData.skills.map((_: any, index: number) => `SKILLS-${index}`)} strategy={verticalListSortingStrategy}>
          <div>
            {resumeData.skills.map((skill: any, index: number) => (
              <SkillItem key={`SKILLS-${index}`} skill={skill} index={index} />
            ))}
          </div>
        </SortableContext>
      )}

      {sectionVisibility.languages && (
        <Language title="Languages" languages={resumeData.languages} />
      )}
      
      {sectionVisibility.certifications && (
        <Certification
          title="Certifications"
          certifications={resumeData.certifications}
        />
      )}
    </div>
  );
};

const SkillItem: React.FC<{ skill: any; index: number }> = ({ skill, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `SKILLS-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '4px',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`skill-item ${isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""}`}
    >
      <Skills title={skill.title} skills={skill.skills} />
    </div>
  );
};

export default LeftSide;
