export const handleTool = (resumeData, setResumeData, e, index, toolType) => {
  const newTools = [...resumeData[toolType]];
  newTools[index] = e.target.value;
  setResumeData({ ...resumeData, [toolType]: newTools });
};
