import React from 'react';
import { CoursePart, assertNever } from './types';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.name) {
          case 'Fundamentals':
            return (
              <div>
                {part.name} {part.exerciseCount} {part.description}
              </div>
            );
          case 'Using props to pass data':
            return (
              <div>
                {part.name} {part.exerciseCount} {part.groupProjectCount}
              </div>
            );
          case 'Deeper type usage':
            return (
              <div>
                {part.name} {part.exerciseCount} {part.description}{' '}
                {part.exerciseSubmissionLink}
              </div>
            );
          case 'Assert error never':
            return (
              <div>
                {part.name} {part.exerciseCount} {part.description}{' '}
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Content;
