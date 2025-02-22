import { LessonPlan } from "@/types/types"
import { Dispatch, SetStateAction } from "react"

type notesprops={
    generatedPlan:LessonPlan
    setGeneratedPlan:Dispatch<SetStateAction<LessonPlan|null>>
}
const LessonNotes = ({generatedPlan,setGeneratedPlan}:notesprops) => {
  return (
    <div>
                <h3 className="text-xl font-semibold text-white mb-2 p-2 bg-blue-500">
                  Notes
                </h3>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setGeneratedPlan({
                      ...generatedPlan,
                      notes: e.target.innerText,
                    })
                  }
                  className="border border-black p-2 min-h-[50px]"
                >
                  <p className="whitespace-pre-wrap">
                    {" "}
                    {generatedPlan.notes || "Click to edit notes..."}
                  </p>
                </div>
              </div>
  )
}

export default LessonNotes