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
    <div className="box-border w-2/3">
      <div className="flex flex-row items-center justify-between mb-4">
        <LinkScroll
          to={`step-${active - 1}`}
          containerId="scroll-container"
          duration={300}
          smooth={true}
          className={`px-4 py-2 rounded-md border text-gray-800 active:bg-green-100 ${
            active === 1
              ? "bg-green-100 border-green-100 cursor-not-allowed active:shadow-none"
              : "bg-green-500 border-green-500 cursor-pointer active:shadow-inner"
          }`}
        >
          Anterior
        </LinkScroll>

        <h1 className="px-4 text-xl font-bold">{title}</h1>

        <LinkScroll
          to={`step-${active + 1}`}
          containerId="scroll-container"
          duration={300}
          smooth={true}
          className={`px-4 py-2 rounded-md border text-gray-800 active:bg-green-100 ${
            active === length
              ? "bg-green-100 border-green-100 cursor-not-allowed active:shadow-none"
              : "bg-green-500 border-green-500 cursor-pointer active:shadow-inner"
          }`}
        >
          Seguinte
        </LinkScroll>
      </div>

      <div
        className="h-full mb-64 space-y-4 overflow-y-hidden"
        id="scroll-container"
      >
        {children}
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
