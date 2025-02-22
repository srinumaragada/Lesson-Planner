export interface LessonPlan{
    topic: string;
    date: string;
    subject: string;
    gradeLevel: string;
    mainTopic: string;
    subtopics: string[];
    materialsNeeded: string;
    learningObjectives: string;
    lessonOutline: LessonOutlineItem[];
    notes: string;
    assessmentStrategies: string,
      additionalNotes: string,
      lessonSummary:string,
}

export interface LessonOutlineItem {
    duration: string;
    guide: string;
    remarks: string;
  }