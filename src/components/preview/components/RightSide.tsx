import WorkExperiences from "./workExperience/ui/WorkExperiences";
import Projects from "./projects/ui/Projects";

const RightSide = ({resumeData, sectionVisibility, className = ''}: { resumeData: any; sectionVisibility: Record<string, boolean>; className?: string }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {sectionVisibility?.workExperience && resumeData.workExperience.length > 0 && (
        <div className="work-experience-container">
          <WorkExperiences/>
        </div>
      )}
      {sectionVisibility?.projects && resumeData.projects.length > 0 && (
        <div className="projects-container">
          <Projects/>
        </div>
      )}
    </div>
  );
};

export default RightSide;
