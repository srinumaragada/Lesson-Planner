import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LessonPlan } from "@/types/types";
import { Loader2, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

type LessonPageProps = {
  register: any;
  generatedPlan: LessonPlan | null;
  generateLessonPlan: (data: LessonPlan) => void;
  handleSubmit: any;
  control: any;
  reactToPrintFn: any;
  isGenerating: boolean;
  error:any
};
const LessonForm = ({
  register,
  generatedPlan,
  control,
  generateLessonPlan,
  reactToPrintFn,
  handleSubmit,
  isGenerating,
  error
}: LessonPageProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessonOutline",
  });

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Lesson Planner</span>
            <Button
              onClick={() => reactToPrintFn()}
              disabled={!generatedPlan}
              variant="outline"
            >
              Download PDF
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(generateLessonPlan)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  {...register("topic")}
                  placeholder="Enter lesson topic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register("date")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="e.g., Mathematics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input
                  id="gradeLevel"
                  {...register("gradeLevel")}
                  placeholder="e.g., Grade 8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainTopic">Main Topic</Label>
              <Input
                id="mainTopic"
                {...register("mainTopic")}
                placeholder="Main topic or unit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subTopic">Sub Topic</Label>
              <Input
                id="mainTopic"
                {...register("subtopics")}
                placeholder="Sub topics "
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="outline">
                <AccordionTrigger>Lesson Outline</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input
                            {...register(`lessonOutline.${index}.duration`)}
                            type="number"
                          />
                        </div>
                        <div>
                          <Label>Guide</Label>
                          <Input
                            {...register(`lessonOutline.${index}.guide`)}
                          />
                        </div>
                        <div>
                          <Label>Remarks</Label>
                          <Input
                            {...register(`lessonOutline.${index}.remarks`)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                          className="mt-6"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        append({ duration: "", guide: "", remarks: "" })
                      }
                    >
                      Add Extra Ouline
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="materials">
                <AccordionTrigger>Materials Needed</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    {...register("materialsNeeded")}
                    placeholder="List required materials (one per line)"
                    className="min-h-[100px]"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="objectives">
                <AccordionTrigger>Learning Objectives</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    {...register("learningObjectives")}
                    placeholder="List learning objectives (one per line)"
                    className="min-h-[100px]"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end space-x-4">
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate with AI"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {error && (
        <Card className="mb-6 border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonForm;
