# AI-Powered Lesson Planner

## Description
This web application is designed to help educators create structured lesson plans quickly and efficiently. The app allows users to log in with a dummy account, input lesson plan details, and generate lesson content using the Google Gemini API. The generated lesson plan can be edited, formatted with ShadCN UI components, and then downloaded as a PDF.

## Features
- **Dummy Login**: A simple login page with predefined credentials (`Email: demouser | Password: demopass`).
- **Lesson Plan Form**: Allows users to input details such as:
  - Topic
  - Grade Level
  - Main Concept & Subtopics
  - Materials Needed
  - Learning Objectives
  - Lesson Outline (structured using ShadCN components)
- **AI Integration**: Fetches structured lesson content using the **Google Gemini API** and suggests classroom activities and assessment questions.
- **Editable Lesson Plan**: Users can edit the generated lesson plan before downloading it.
- **PDF Export**: Allows users to download the lesson plan as a PDF using `react-to-print` or `jsPDF`.
- **UI Components**: Utilizes ShadCN for the frontend UI components (e.g., `Input`, `Textarea`, `Button`, `Card`, `Accordion`).

## Tech Stack
- **Frontend**: React.js (Vite/Next.js preferred)
- **UI Components**: ShadCN, TailwindCSS
- **API Integration**: Google Gemini API (free version)
- **State Management**: React state (or Context API if necessary)
- **PDF Handling**: `react-to-print` or `jsPDF`
- **No Backend**: No database or server-side backend, everything runs client-side

## Setup and Installation

### Prerequisites:
- **Node.js**: Version 14.x or later
- **npm**: Node package manager

### Steps to Run the Project Locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/srinumaragada/Lesson-Planner.git
   ```
2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm run dev
   ```

   Your application will be available at `http://localhost:5173`.

### API Integration

This project uses the **Google Gemini API** (free version) to generate lesson content. Ensure that you have the correct API keys and have set up the API calls to fetch lesson content dynamically.

For example, the API is called like this:

```js
const fetchLessonContent = async () => {
  try {
    const response = await fetch('https://gemini-api.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: lessonTopic,
        grade: lessonGrade,
        subtopics: lessonSubtopics
      })
    });
    const data = await response.json();
    return data.lessonContent;
  } catch (error) {
    console.error('Error fetching lesson content:', error);
  }
};
```

**Important**: You must handle error cases for API failures and display appropriate messages to users.

## Key Features

### Dummy Login
A simple login form with email and password, which redirects the user to the lesson planner interface upon successful login. No backend is used—state is managed locally.

**Credentials**:
- Email: `demouser`
- Password: `demopass`

### Lesson Plan Form
Users can input various details for the lesson plan, such as:
- Topic
- Grade Level
- Main Concept & Subtopics
- Materials Needed
- Learning Objectives
- Lesson Outline (using ShadCN UI components like `Accordion`, `Input`, `Textarea`)

### Generate Lesson Plan
The lesson plan is generated dynamically via the Google Gemini API based on the input fields, including detailed content, classroom activities, and assessment questions.

### Download as PDF
After generating the lesson plan, users can edit it and download it as a PDF. This is achieved using `react-to-print` or `jsPDF` for PDF generation.

### UI/UX
The design is modern and responsive, utilizing **ShadCN** components for consistent styling, such as:
- `Input`, `Textarea`, and `Button` for user input
- `Card` and `Accordion` for displaying lesson content
- `Skeleton` for loading states

## Bonus Features
- **Dark Mode Toggle**: Implemented using TailwindCSS.
- **Local Storage**: Retains lesson plan data on page refresh.
- **Drag-and-Drop Editor**: Allows users to reorder or modify lesson plan sections easily.

## Deployment

### Deploying on Vercel:
1. Go to [Vercel](https://vercel.com) and sign in.
2. Import this project from your GitHub repository.
3. Vercel will automatically detect the project setup and deploy it for you.
4. Once deployed, Vercel will provide a live URL to access the application.

### Live Demo Link:
[**AI-Powered Lesson Planner Demo**](https://lesson-planner-azure.vercel.app/lessonPage)

## Contribution
Feel free to fork the repository and submit pull requests. If you encounter any issues or want to contribute improvements, open an issue or PR.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Special thanks to the ShadCN UI library for the UI components.
- Thanks to the Google Gemini API for providing AI-powered content generation.

---
