import { arrayMove } from '@dnd-kit/sortable';
import type { ResumeData } from '../../../types/resume';

export const onDragEndHandler = (
  event: any,
  resumeData: ResumeData,
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
) => {
  const { active, over } = event;

  if (!over) return;

  if (active.id === over.id) return;

  const activeId = active.id as string;
  const overId = over.id as string;

  // Handle work experience reordering
  if (activeId.startsWith('WORK_EXPERIENCE-') && overId.startsWith('WORK_EXPERIENCE-')) {
    const oldIndex = parseInt(activeId.split('-')[1]);
    const newIndex = parseInt(overId.split('-')[1]);
    const newWorkExperience = arrayMove(resumeData.workExperience, oldIndex, newIndex);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  }

  // Handle work experience key achievements reordering
  if (activeId.includes('WORK_EXPERIENCE_KEY_ACHIEVEMENT') && overId.includes('WORK_EXPERIENCE_KEY_ACHIEVEMENT')) {
    const activeIndex = parseInt(activeId.split('-')[2]);
    const overIndex = parseInt(overId.split('-')[2]);
    const workExperienceIndex = parseInt(activeId.split('-')[1]);
    const newWorkExperience = [...resumeData.workExperience];
    const keyAchievements = newWorkExperience[workExperienceIndex].keyAchievements.split('\n');
    const newKeyAchievements = arrayMove(keyAchievements, activeIndex, overIndex);
    newWorkExperience[workExperienceIndex].keyAchievements = newKeyAchievements.join('\n');
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  }

  // Handle projects reordering
  if (activeId.startsWith('PROJECTS-') && overId.startsWith('PROJECTS-')) {
    const oldIndex = parseInt(activeId.split('-')[1]);
    const newIndex = parseInt(overId.split('-')[1]);
    const newProjects = arrayMove(resumeData.projects, oldIndex, newIndex);
    setResumeData({ ...resumeData, projects: newProjects });
  }

  // Handle project key achievements reordering
  if (activeId.includes('PROJECTS_KEY_ACHIEVEMENT') && overId.includes('PROJECTS_KEY_ACHIEVEMENT')) {
    const activeIndex = parseInt(activeId.split('-')[2]);
    const overIndex = parseInt(overId.split('-')[2]);
    const projectIndex = parseInt(activeId.split('-')[1]);
    const newProjects = [...resumeData.projects];
    const keyAchievements = newProjects[projectIndex].keyAchievements.split('\n');
    const newKeyAchievements = arrayMove(keyAchievements, activeIndex, overIndex);
    newProjects[projectIndex].keyAchievements = newKeyAchievements.join('\n');
    setResumeData({ ...resumeData, projects: newProjects });
  }

  // Handle skills reordering
  if (activeId.startsWith('SKILLS-') && overId.startsWith('SKILLS-')) {
    const oldIndex = parseInt(activeId.split('-')[1]);
    const newIndex = parseInt(overId.split('-')[1]);
    const newSkills = arrayMove(resumeData.skills, oldIndex, newIndex);
    setResumeData({ ...resumeData, skills: newSkills });
  }
};
