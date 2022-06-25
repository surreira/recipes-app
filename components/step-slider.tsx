import { ReactNode, useEffect, useState } from "react";
import { Events, Link as LinkScroll } from "react-scroll";

interface StepsProps {
  title: string;
  children: ReactNode[];
}

export default function StepSlider({
  title,
  children,
}: StepsProps): JSX.Element {
  const [active, setActive] = useState(1);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  useEffect(() => {
    Events.scrollEvent.register("end", function () {
      if (arguments[0] !== null) {
        const index = parseInt(arguments[0].split("-")[1], 10);
        if (index > 0 && index <= length) {
          setActive(index);
        }
      }
    });
  }, [length]);

  return (
    <div className="box-border w-full md:w-2/3">
      <div className="flex flex-row items-center justify-between mt-12 mb-4 md:mt-0">
        <LinkScroll
          to={`step-${active - 1}`}
          containerId="scroll-container"
          duration={300}
          smooth={true}
          className={`hidden md:block px-4 py-2 rounded-md border text-gray-800 active:bg-green-100 ${
            active === 1
              ? "bg-green-100 border-green-100 cursor-not-allowed active:shadow-none"
              : "bg-green-500 border-green-500 cursor-pointer active:shadow-inner"
          }`}
        >
          Anterior
        </LinkScroll>

        <h1 className="hidden px-4 text-xl font-bold md:block">{title}</h1>

        <LinkScroll
          to={`step-${active + 1}`}
          containerId="scroll-container"
          duration={300}
          smooth={true}
          className={`hidden md:block px-4 py-2 rounded-md border text-gray-800 active:bg-green-100 ${
            active === length
              ? "bg-green-100 border-green-100 cursor-not-allowed active:shadow-none"
              : "bg-green-500 border-green-500 cursor-pointer active:shadow-inner"
          }`}
        >
          Seguinte
        </LinkScroll>
      </div>

      <div
        className="h-full mb-16 space-y-4 overflow-y-hidden md:mb-64"
        id="scroll-container"
      >
        {children}
        <div className="md:h-screen"></div>
      </div>
    </div>
  );
}
