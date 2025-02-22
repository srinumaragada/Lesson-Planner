import { LessonPlan } from "@/types/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface LessonOutlineItem {
  duration: string;
  guide: string;
  remarks: string;
}

interface LessonOutlineProps {
  generatedPlan: LessonPlan;
  setGeneratedPlan: Dispatch<SetStateAction<LessonPlan | null>>;
  watch: UseFormWatch<LessonPlan>;
  setValue: UseFormSetValue<LessonPlan>;
}

const LessonOutline: React.FC<LessonOutlineProps> = ({ generatedPlan, setGeneratedPlan, watch, setValue }) => {
  const [lessonOutline, setLessonOutline] = useState<LessonOutlineItem[]>([]);


  useEffect(() => {
    const storedData = localStorage.getItem("lessonOutline");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLessonOutline(parsedData);
      setValue("lessonOutline", parsedData); 
    } else {
      const formData = watch("lessonOutline") || [];
      setLessonOutline(formData);
    }
  }, [setValue, watch]);

 
  const handleBlur = (index: number, key: keyof LessonOutlineItem, value: string) => {
    const updatedLessonOutline = [...lessonOutline];
    updatedLessonOutline[index] = { ...updatedLessonOutline[index], [key]: value };
    setLessonOutline(updatedLessonOutline);
    setValue("lessonOutline", updatedLessonOutline);
    localStorage.setItem("lessonOutline", JSON.stringify(updatedLessonOutline)); 
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-violet-500">
            <th className="border border-gray-300 px-4 py-2">Duration</th>
            <th className="border border-gray-300 px-4 py-2">Guide</th>
            <th className="border border-gray-300 px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {lessonOutline.length > 0 ? (
            lessonOutline.map((item: LessonOutlineItem, index: number) => (
              <tr key={index} className="border border-gray-300">
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="border border-gray-300 px-4 py-2"
                  onBlur={(e) => handleBlur(index, "duration", e.target.innerText)}
                >
                  {item.duration || "-"}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="border border-gray-300 px-4 py-2"
                  onBlur={(e) => handleBlur(index, "guide", e.target.innerText)}
                >
                  {item.guide || "-"}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="border border-gray-300 px-4 py-2"
                  onBlur={(e) => handleBlur(index, "remarks", e.target.innerText)}
                >
                  {item.remarks || "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonOutline;
