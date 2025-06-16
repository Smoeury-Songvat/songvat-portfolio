import React from "react";

interface JourneyProps {
  theme: string;
}

const Journey = ({ theme }: JourneyProps) => {
  return (
    <>
      <section>{theme}</section>
    </>
  );
};

export { Journey };
