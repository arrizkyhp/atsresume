import WorkExperiences from "./workExperience/ui/WorkExperiences";
import Projects from "./projects/ui/Projects";

const RightSide = ({resumeData, sectionVisibility, className = ''}: { resumeData: any; sectionVisibility: Record<string, boolean>; className?: string }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {sectionVisibility?.workExperience && resumeData.workExperience.length > 0 && (
        <WorkExperiences/>
      )}
      {sectionVisibility?.projects && resumeData.projects.length > 0 && (
        <Projects/>
      )}
    </div>
  );
};

export default RightSide;
