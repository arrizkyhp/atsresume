export const removeTool = (resumeData, setResumeData, index, toolType) => {
  const newTools = resumeData[toolType].filter((_, i) => i !== index);
  setResumeData({ ...resumeData, [toolType]: newTools });
};
