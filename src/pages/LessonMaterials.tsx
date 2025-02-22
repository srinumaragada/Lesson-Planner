import { LessonPlan } from '@/types/types';
import  { Dispatch, SetStateAction } from 'react'

type materialProps={
    generatedPlan: LessonPlan| any;
    setGeneratedPlan:Dispatch<SetStateAction<LessonPlan|null>>|any
}
const LessonMaterials = ({generatedPlan,setGeneratedPlan}:materialProps) => {
  return (
    <div>
  <h3 className="text-xl font-semibold text-white mb-2 p-2 bg-black">
    Materials Needed
  </h3>
  <ul className="list-disc ml-6 space-y-1">
    {generatedPlan.materialsNeeded.split("\n").map((line:string, index:number) => (
      <li
        key={index}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newMaterials = generatedPlan.materialsNeeded
            .split("\n")
            .map((item:string, i:number) => (i === index ? e.target.innerText : item))
            .join("\n");
          setGeneratedPlan({ ...generatedPlan, materialsNeeded: newMaterials });
        }}
        className="list-item"
      >
        {line}
      </li>
    ))}
  </ul>
</div>
  )
}

export default LessonMaterials