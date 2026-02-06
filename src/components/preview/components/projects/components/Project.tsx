import React from 'react';
import DateRange from "../../../../utility/DateRange";
import Link from "next/link";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Project: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `PROJECTS-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '4px',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`project-item ${isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex flex-row justify-between space-y-1"
      >
        <p className="content i-bold">{item.name}</p>
        <DateRange
          startYear={item.startYear}
          endYear={item.endYear}
          id={`projects-start-end-date`}
        />
      </div>

      <Link
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="content"
      >
        {item.link}
      </Link>
      <p className="content">{item.description}</p>

      <ul className="list-disc ul-padding content">
        {typeof item.keyAchievements === "string" &&
          item.keyAchievements
            .split("\n")
            .map((achievement: string, subIndex: number) => (
              <li
                key={`${item.name}-${index}-${subIndex}`}
                className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: achievement,
                  }}
                  contentEditable
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Project;
