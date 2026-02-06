"use client";

import React, { createContext, useState, ChangeEvent } from "react";
import Meta from "../components/meta/Meta";
import FormCloseOpenBtn from "../components/FormCloseOpenBtn";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import dynamic from "next/dynamic";
import Form from "../components/form/ui/Form";
import PrintControlPanel from "../components/preview/components/PrintControlPanel";
import LayoutControlPanel from "../components/preview/components/LayoutControlPanel";
import { LayoutProvider } from "../contexts/LayoutContext";
import type { ResumeData, ResumeContextType } from "../types/resume";

const ResumeContext = createContext<ResumeContextType>({
  resumeData: DefaultResumeData,
  setResumeData: () => {},
  handleProfilePicture: () => {},
  handleChange: () => {},
});

const Builder: React.FC = () => {
  // resume data
  const [resumeData, setResumeData] = useState<ResumeData>(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState<boolean>(false);

  // profile picture
  const handleProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        />
        <LayoutProvider>
          <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
            {!formClose && (
              <Form />
            )}
            <div className="md:max-w-[60%]">
              <LayoutControlPanel />
              <Preview />
              <PrintControlPanel />
            </div>
          </div>
        </LayoutProvider>
        <FormCloseOpenBtn formClose={formClose} setFormClose={setFormClose} />
      </ResumeContext.Provider>
    </>
  );
};

export default Builder;
export { ResumeContext };
