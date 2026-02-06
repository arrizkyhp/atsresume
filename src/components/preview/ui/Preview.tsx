import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import React, { useContext, useMemo } from "react";
import { ResumeContext } from "../../builder";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import ModalHighlightMenu from "../components/ModalHighlightMenu";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import A4PageWrapper from "../components/A4PageWrapper";
import { onDragEndHandler } from "../utils/onDragEndHandler";

const Preview: React.FC = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const icons = useMemo(
    () => [
      { name: "github", icon: <FaGithub /> },
      { name: "linkedin", icon: <FaLinkedin /> },
      { name: "twitter", icon: <FaTwitter /> },
      { name: "facebook", icon: <FaFacebook /> },
      { name: "instagram", icon: <FaInstagram /> },
      { name: "youtube", icon: <FaYoutube /> },
      { name: "website", icon: <CgWebsite /> },
    ],
    []
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    onDragEndHandler(event, resumeData, setResumeData);
  };

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <A4PageWrapper>
        <ModalHighlightMenu />
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Header resumeData={resumeData} icons={icons} />
          <hr className="border-dashed my-2" />
          <div className="grid grid-cols-3 gap-6">
            <LeftSide resumeData={resumeData} />
            <RightSide resumeData={resumeData} />
          </div>
        </DndContext>
      </A4PageWrapper>
    </div>
  );
};

export default Preview;
