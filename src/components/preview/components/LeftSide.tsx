import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import Tool from "./Tool";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const LeftSide: React.FC<{ resumeData: any; sectionVisibility: Record<string, boolean>; className?: string }> = ({ resumeData, sectionVisibility, className = '' }) => {
  return (
    <div className={`${className} space-y-2`}>
      {sectionVisibility.summary && resumeData.summary.length > 0 && (
        <div className="mb-1 summary-section">
          <h2 className="section-title mb-1 border-b-2 border-gray-300">Summary</h2>
          <p className="content break-words">{resumeData.summary}</p>
        </div>
      )}

      {sectionVisibility.education && resumeData.education.length > 0 && (
        <div className="education-section">
          <h2 className="section-title mb-1 border-b-2 border-gray-300">
            Education
          </h2>
          {resumeData.education.map((item: any, index: number) => (
            <div key={index} className="education-item">
              <p className="content i-bold">{item.degree}</p>
              <p className="content">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              />
              {item.description && <p className="sub-content">GPA: {item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {sectionVisibility.skills && (
        <div className="skills-section">
          <SortableContext items={resumeData.skills.map((_: any, index: number) => `SKILLS-${index}`)} strategy={verticalListSortingStrategy}>
            <div>
              {resumeData.skills.map((skill: any, index: number) => (
                <Skills title={skill.title} skills={skill.skills} key={index} />
              ))}
            </div>
          </SortableContext>
        </div>
      )}

      {sectionVisibility.tools && resumeData.tools.length > 0 && (
        <div className="tools-section">
          <h2 className="section-title mb-1 border-b-2 border-gray-300">Tools</h2>
          <Tool title="Tools" tools={resumeData.tools} />
        </div>
      )}

      {sectionVisibility.languages && resumeData.languages.length > 0 && (
        <div className="languages-section">
          <Language title="Languages" languages={resumeData.languages} />
        </div>
      )}

      {sectionVisibility.certifications && resumeData.certifications.length > 0 && (
        <div className="certifications-section">
          <Certification
            title="Certifications"
            certifications={resumeData.certifications}
          />
        </div>
      )}
    </div>
  );
};

export default LeftSide;