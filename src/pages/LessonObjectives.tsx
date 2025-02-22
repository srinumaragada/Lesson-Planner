import { LessonPlan } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

type objectiveProps={
    generatedPlan: LessonPlan| any;
    setGeneratedPlan:Dispatch<SetStateAction<LessonPlan|null>>|any
}

const LessonObjectives = ({generatedPlan,setGeneratedPlan}:objectiveProps) => {
  return (
    <div>
  <h3 className="text-xl font-semibold text-white mb-2 p-2 bg-blue-500">
    Learning Objectives
  </h3>
  <ul className="list-disc ml-6 space-y-1">
    {generatedPlan.learningObjectives.split("\n").map((line:string, index:number) => (
      <li
        key={index}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newObjectives = generatedPlan.learningObjectives
            .split("\n")
            .map((item:string, i:number) => (i === index ? e.target.innerText : item))
            .join("\n");
          setGeneratedPlan({ ...generatedPlan, learningObjectives: newObjectives });
        }}
        className="list-none"
      >
        {line}
      </li>
    ))}
  </ul>
</div>

  )
}

export default LessonObjectives