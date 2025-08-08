import { doc, collection, setDoc, getDoc } from "firebase/firestore";

import { fireDB } from "../firebase/FirebaseConfig";

const questions = [
    {
        id: 1,
        title: "Question 1",
        question: "What is the main goal of building integrated dashboards?",
        options: {
            A: "Display random visuals",
            B: "Combine multiple data sources into one strategic view",
            C: "Color-code data",
            D: "Format text",
        },
        correctAnswer: "B",
    },
    {
        id: 2,
        title: "Question 2",
        question: "KPIs should be aligned with:",
        options: {
            A: "Your personal goals",
            B: "Dashboard layout",
            C: "Strategic business objectives",
            D: "Excel formatting",
        },
        correctAnswer: "C",
    },
    {
        id: 3,
        title: "Question 3",
        question: "What is ETL?",
        options: {
            A: "Excel Table Layout",
            B: "Extract, Transform, Load",
            C: "Enhance Time Lag",
            D: "Extra Time Limit",
        },
        correctAnswer: "B",
    },
    {
        id: 4,
        title: "Question 4",
        question: "What is the purpose of a data warehouse?",
        options: {
            A: "Delete old files",
            B: "Host dashboards",
            C: "Store cleaned, structured data",
            D: "Filter duplicates",
        },
        correctAnswer: "C",
    },
    {
        id: 5,
        title: "Question 5",
        question: "In Tableau, what is a 'Story'?",
        options: {
            A: "A PDF report",
            B: "A sequence of visualizations with narrative",
            C: "A formula",
            D: "A pivot",
        },
        correctAnswer: "B",
    },
    {
        id: 6,
        title: "Question 6",
        question: "A well-structured BI report starts with:",
        options: {
            A: "A chart",
            B: "An appendix",
            C: "Executive summary",
            D: "KPI table",
        },
        correctAnswer: "C",
    },
    {
        id: 7,
        title: "Question 7",
        question: "Visual storytelling helps make data more memorable and impactful.",
        options: {
            A: "True",
            B: "False",
        },
        correctAnswer: "A",
    },
    {
        id: 8,
        title: "Question 8",
        question: "Drill-through actions reduce user interactivity in dashboards.",
        options: {
            A: "True",
            B: "False",
        },
        correctAnswer: "B",
    },
    {
        id: 9,
        title: "Scenario Question 1",
        question: "You're preparing a KPI dashboard for leadership. Which tools and structure would you use for visual clarity and strategic value?",
        think: "Focus on clear layout, appropriate chart types, and alignment with business objectives.",
    },
    {
        id: 10,
        title: "Scenario Question 2",
        question: "After building a Power BI dashboard, a stakeholder asks for more details. What steps will you take to provide a deeper drill-down experience?",
        think: "Consider drill-through pages, filters, tooltips, and expanding visuals to explore detailed insights.",
    }
];

const uploadQuiz = async (courseId, subCategoriesId) => {
    const quizRef = collection(
        fireDB,
        "courses",
        courseId,
        "subCategories",
        subCategoriesId,
        "quiz"
    );

    for (const question of questions) {
        const questionId = question.id.toString();
        const questionDocRef = doc(quizRef, questionId);
        const docSnap = await getDoc(questionDocRef);

        if (!docSnap.exists()) {
            await setDoc(questionDocRef, question);
            console.log(`Uploaded: ${question.title || question.Title}`);
        } else {
            console.log(`Skipped (already exists): ${question.title || question.Title}`);
        }
    }

    console.log("Quiz uploaded successfully.");
};

// LYM4Zi1DDaALtUmC5gF0 marketing-digital-growth-mba"
// PK7E4S5WjuQkdkiOQj6M basic
// 1NGSuB8HoTuO5oEnB8OV intermediate
// 2plwvBzo7nUxvPqyYnDF advanced

// u9EF8Y1n5tGSxeEXRQNW hr-operations-analytics-mba
// XqEsBHByIkTquKRqOXCc basic
// ETP0I527VnIy30Od3KqM intermediate
// 3mnIuLnOoQn3Th3dkdmv advanced

// 6RgfmN8CvGsVnKpg2OPt finance-tools-strategy-mba
// GG68D0BugUk1aYlqVDD7 basic
// 03BA3V8XsSxHWPfFVZaI intermediate
// IevoDCk1Hoq1qPBWEOdC advanced

// WGMiqLeHAR2cKW4UervR ai-prompt-engineering-mba
// D7rI0viPrj5wkjJMLMFO basic
// YZqnweJM0FQZxRHzvqkR intermediate
// OgHfJO94SPPnspihwtki advanced

// klEMAf1Zbl9dTbccLxyi data-analytics-basics-mba
// KrrVfB8u7NQRzVgghSYD basic
// 2GZBItnosxQlxRwlR73X intermediate
// GhNwWRIMFQdXSZv0ok75 advanced

export default uploadQuiz;