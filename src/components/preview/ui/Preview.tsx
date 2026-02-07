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
import { useLayout } from '../../../contexts/LayoutContext';

const Preview: React.FC = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const { layoutMode, sectionVisibility, fontSizeScale } = useLayout();

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

  const getLayoutClasses = () => {
    switch (layoutMode) {
      case 'full-width':
        return 'grid grid-cols-1 gap-4';
      case 'two-column':
        return 'grid grid-cols-2 gap-6';
      case 'three-column':
      default:
        return 'grid grid-cols-3 gap-6';
    }
  };

  const getLeftSideClasses = () => {
    switch (layoutMode) {
      case 'full-width':
      case 'two-column':
        return 'col-span-1';
      case 'three-column':
      default:
        return 'col-span-1';
    }
  };

  const getRightSideClasses = () => {
    switch (layoutMode) {
      case 'full-width':
        return 'col-span-1';
      case 'two-column':
        return 'col-span-1';
      case 'three-column':
      default:
        return 'col-span-2';
    }
  };

  return (
    <div 
      className="sticky top-0 preview md:overflow-y-scroll md:h-screen"
      style={{ fontSize: `${fontSizeScale}%` }}
    >
      <A4PageWrapper>
        <ModalHighlightMenu />
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Header resumeData={resumeData} icons={icons} />
          <div className={getLayoutClasses()}>
            <LeftSide resumeData={resumeData} sectionVisibility={sectionVisibility} className={getLeftSideClasses()} />
            <RightSide resumeData={resumeData} sectionVisibility={sectionVisibility} className={getRightSideClasses()} />
          </div>
        </DndContext>
      </A4PageWrapper>
    </div>
  );
};

export default Preview;
