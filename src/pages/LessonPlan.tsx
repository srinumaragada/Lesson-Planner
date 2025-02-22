
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { LessonOutlineItem, LessonPlan } from "@/types/types";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import {  useForm } from "react-hook-form";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useReactToPrint } from "react-to-print";
import LessonForm from "./LessonForm";
import LessonMaterials from "./LessonMaterials";
import LessonObjectives from "./LessonObjectives";
import LessonOutline from "./LessonOutline";
import LessonNotes from "./LessonNotes";

const LessonPlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, control } =
    useForm<LessonPlan>({
      defaultValues: {
        topic: "",
        date: new Date().toISOString().split("T")[0],
        subject: "",
        gradeLevel: "",
        mainTopic: "",
        subtopics: [],
        materialsNeeded: "",
        learningObjectives: "",
        lessonOutline: [
          { duration: "10", guide: "Introduction", remarks: "" },
          { duration: "30", guide: "Main Activity", remarks: "" },
          { duration: "10", guide: "Assessment", remarks: "" },
        ],
        assessmentStrategies: "",
        additionalNotes: "",
        lessonSummary: "",
      },
    });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Lesson Plan `,
    
  });

  useEffect(() => {
    const savedPlan = localStorage.getItem("lessonPlan");
    if (savedPlan) {
      setGeneratedPlan(JSON.parse(savedPlan));
    }
  }, []);


  useEffect(() => {
    if (generatedPlan) {
      localStorage.setItem("lessonPlan", JSON.stringify(generatedPlan));
    }
  }, [generatedPlan]);

  const generateLessonPlan = async (data: LessonPlan) => {
    setIsGenerating(true);
    setError(null);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured");
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Create a structured and detailed lesson plan for:
  
      Topic: ${data.topic}
      Subject: ${data.subject}
      Grade Level: ${data.gradeLevel}
      Materials Needed: ${data.materialsNeeded}
      Learning Objectives: ${data.learningObjectives}
      Lesson Outline:${JSON.stringify(data.lessonOutline)}
  
      Format:
      1. **Lesson Summary**
      2. **Materials Needed**  
      3. **Learning Objectives**  
      4. **Lesson Outline**  
      5. **Assessment Strategies**  
      6. **Additional Notes**`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("No content generated from AI");
      }

      const extractSection = (text: string, section: string) => {
        const regex = new RegExp(
          `\\*\\*${section}\\*\\*\\n+([\\s\\S]*?)(\\n\\*\\*|$)`
        );
        const match = text.match(regex);
        return match ? match[1].trim() : `No ${section.toLowerCase()} found`;
      };

      const materialsNeeded = extractSection(text, "2. Materials Needed");
      const learningObjectives = extractSection(text, "3. Learning Objectives");

      console.log("Extracted Materials Needed:", materialsNeeded);
      console.log("Extracted Learning Objectives:", learningObjectives);

      const assessmentStrategies = extractSection(
        text,
        "5. Assessment Strategies"
      );
      const additionalNotes = extractSection(text, "6. Additional Notes");
      const lessonOutlineText = extractSection(text, "4.Lesson Outline");

      // Ensure lessonOutlineText is correctly formatted into an array
      const lessonOutline: LessonOutlineItem[] = lessonOutlineText
        .split("\n")
        .filter((line) => line.includes("-"))
        .map((line) => {
          const parts = line.split("-");
          return {
            duration: parts[0]?.trim() || "N/A",
            guide: parts[1]?.trim() || "N/A",
            remarks: parts[2]?.trim() || "",
          };
        });

      const updatedPlan: LessonPlan = {
        ...data,
        materialsNeeded,
        learningObjectives,
        lessonOutline,
        assessmentStrategies,
        additionalNotes,
        notes: text,
      };
      console.log("Updated Lesson Plan Object:", updatedPlan);
      // Make sure state updates properly
      setGeneratedPlan(updatedPlan);

      // Immediately update form values to persist
      setValue("learningObjectives", learningObjectives);
      setValue("materialsNeeded", materialsNeeded);
      setValue("lessonOutline", lessonOutline);
      setValue("assessmentStrategies", assessmentStrategies);
      setValue("additionalNotes", additionalNotes);

      toast.success("Lesson plan generated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate lesson plan";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Lesson plan generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  console.log(generatedPlan?.materialsNeeded);
  console.log(generatedPlan?.learningObjectives);

  return (
    <div className="container mx-auto p-6">
      <LessonForm
        register={register}
        handleSubmit={handleSubmit}
        generatedPlan={generatedPlan}
        generateLessonPlan={generateLessonPlan}
        control={control}
        isGenerating={isGenerating}
        reactToPrintFn={reactToPrintFn}
        error={error}
      />

      {generatedPlan && !error && (
        <Card
          ref={contentRef}
          className="p-8 bg-[#f0f0f0] flex flex-col gap-2 text-black"
        >
          <CardHeader>
            <CardTitle
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                setGeneratedPlan({
                  ...generatedPlan,
                  topic: e.target.innerText,
                })
              }
              className="text-3xl font-bold self-start"
            >
              Topic: {generatedPlan.topic}
            </CardTitle>
            <hr className="border-t-2 border-gray-900 my-6" />
            <div className="bg-blue-500 p-2">
              <span className="font-bold text-2xl text-white ml-3">
                Summary
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="flex w-full -ml-10">
                <div className="flex flex-col w-[30%] ml-10 bg-violet-300">
                  <p className="border-b border-black p-2">Date</p>
                  <p className="border-b border-black p-2">Subjects</p>
                  <p className="border-b border-black p-2">Grade Level</p>
                  <p className="border-b border-black p-2">Main Topic</p>
                  <p className="border-b border-black p-2">Subtopics</p>
                </div>

                <div className="w-[1px] bg-black"></div>

                <div className="flex flex-col w-[70%]">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setGeneratedPlan({
                        ...generatedPlan,
                        date: e.target.innerText,
                      })
                    }
                    className="border-b border-black p-2 h-[41px]"
                  >
                    {generatedPlan.date}
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setGeneratedPlan({
                        ...generatedPlan,
                        subject: e.target.innerText,
                      })
                    }
                    className="border-b border-black p-2 h-[40px]"
                  >
                    {generatedPlan.subject}
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setGeneratedPlan({
                        ...generatedPlan,
                        gradeLevel: e.target.innerText,
                      })
                    }
                    className="border-b border-black p-2 h-[41px]"
                  >
                    {generatedPlan.gradeLevel}
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setGeneratedPlan({
                        ...generatedPlan,
                        mainTopic: e.target.innerText,
                      })
                    }
                    className="border-b border-black p-2 h-[41px]"
                  >
                    {generatedPlan.mainTopic}
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setGeneratedPlan({
                        ...generatedPlan,
                        subtopics: e.target.innerText
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="border-b border-black p-2 h-[41px]"
                  >
                    {generatedPlan.subtopics}
                  </span>
                </div>
              </div>

              <LessonMaterials
                generatedPlan={generatedPlan}
                setGeneratedPlan={setGeneratedPlan}
              />

              <LessonObjectives
                generatedPlan={generatedPlan}
                setGeneratedPlan={setGeneratedPlan}
              />
              
             <LessonOutline
             generatedPlan={generatedPlan}
             setGeneratedPlan={setGeneratedPlan}
             watch={watch}
             setValue={setValue}
             />
              
              <LessonNotes
              generatedPlan={generatedPlan}
              setGeneratedPlan={setGeneratedPlan}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonPlan;
