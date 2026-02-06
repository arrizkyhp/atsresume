export const addTool = (resumeData, setResumeData, toolType) => {
  setResumeData({ ...resumeData, [toolType]: [...resumeData[toolType], ""] });
};
