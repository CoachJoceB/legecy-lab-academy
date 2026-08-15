import { AAE_LESSON, MATH_LESSON, MT_DAY1_LESSON } from "./lessonSpecs";
import { PD_MISSION_1, PD_MISSION_2, PD_MISSION_3, PD_MISSION_4, PD_MISSION_5 } from "./personalDevelopmentLessons";

// This is the entire course catalog. To add a course: add an object here
// with a title, meta line, and a units array. To make a lesson clickable,
// give it { built: true, specKey: "SOME_KEY" } and add SOME_KEY to
// lessonSpecs.js and to LESSON_SPECS below.

const AAE_COURSE = {
  id: "aae", subjectId: "history", subject: "Social Studies",
  title: "The African American Experience",
  meta: "Grades 8 to 10 · One Semester · 17 Weeks · 68 Lessons",
  units: [
    { id: 1, title: "The African Homeland", range: "Beginnings to 1900s", chapters: "Chapters 1 to 3",
      lessons: [
        { day: 1, label: "Orientation & Diagnostic", built: false },
        { day: 2, label: "Unit 1 Opener, The African Homeland", built: false },
        { day: 3, label: "Ch.1a, Nubia & Egypt", built: true, specKey: "AAE_LESSON" },
        { day: 4, label: "Ch.1b, Religion, Heritage & the Great Pyramid", built: false },
        { day: 5, label: "Ch.2, West African Empires & Kingdoms", built: false },
        { day: 6, label: "Ch.3, East African Trading States", built: false },
        { day: 7, label: "Unit 1 Review & Writing", built: false },
      ] },
    { id: 2, title: "Africans in the Americas", range: "1500 to 1760s", chapters: "Chapters 4 to 6", lessons: [] },
    { id: 3, title: "African Americans and a New Nation", range: "1768 to 1840s", chapters: "Chapters 7 to 9", lessons: [] },
    { id: 4, title: "Free and Enslaved", range: "1619 to 1860", chapters: "Chapters 10 to 12", lessons: [] },
    { id: 5, title: "Challenges to Slavery", range: "1800 to 1860", chapters: "Chapters 13 to 15", lessons: [] },
    { id: 6, title: "Hope for a New Way of Life", range: "1820 to 1880", chapters: "Chapters 16 to 19", lessons: [] },
    { id: 7, title: "Freedom Without Equality", range: "1877 to 1910", chapters: "Chapters 20 to 22", lessons: [] },
    { id: 8, title: "Protest and Hope in a New Century", range: "1900 to 1941", chapters: "Chapters 23 to 27", lessons: [] },
    { id: 9, title: "The Civil Rights Revolution", range: "1941 to 1973", chapters: "Chapters 28 to 32", lessons: [] },
    { id: 10, title: "Building a New America", range: "1965 to Present", chapters: "Chapters 33 to 35", lessons: [] },
  ],
};

const MATH_COURSE = {
  id: "algebra1", subjectId: "math", subject: "Mathematics",
  title: "Algebra I",
  meta: "Unit 2, Solving Equations",
  units: [
    { id: 1, title: "Foundations", lessons: [] },
    { id: 2, title: "Solving Equations", lessons: [
      { day: 1, label: "One-Step Equations", built: true, specKey: "MATH_LESSON" },
    ] },
  ],
};

const MENTAL_TOUGHNESS_COURSE = {
  id: "mental-toughness-course", subjectId: "mental-toughness-lesson", subject: "Development",
  title: "30-Day Performance Playbook",
  meta: "Week 1, Foundation",
  units: [
    { id: 1, title: "Foundation", range: "Days 1 to 7", lessons: [
      { day: 1, label: "You Are Built For This", built: true, specKey: "MT_DAY1_LESSON" },
      { day: 2, label: "Your Hidden Supercomputer", built: false },
      { day: 3, label: "Mental Protection", built: false },
      { day: 4, label: "Visualization", built: false },
      { day: 5, label: "Goal Setting", built: false },
      { day: 6, label: "Engraving", built: false },
      { day: 7, label: "Week 1 Review", built: false },
    ] },
  ],
};

const PERSONAL_DEVELOPMENT_COURSE = {
  id: "personal-dev-lessons", subjectId: "personal-dev", subject: "Personal Development",
  title: "Season One, Chapter 1: Identity",
  meta: "Grade 8, Week 1, Discover Your Purpose",
  units: [
    { id: 1, title: "Who Am I Becoming?", range: "Week 1", lessons: [
      { day: 1, label: "The Cost of Character", built: true, specKey: "PD_MISSION_1" },
      { day: 2, label: "Choosing Under Pressure", built: true, specKey: "PD_MISSION_2" },
      { day: 3, label: "Borrowing Wisdom", built: true, specKey: "PD_MISSION_3" },
      { day: 4, label: "Building Your Statement", built: true, specKey: "PD_MISSION_4" },
      { day: 5, label: "Defending It", built: true, specKey: "PD_MISSION_5" },
    ] },
  ],
};

const CATALOG = [AAE_COURSE, MATH_COURSE, MENTAL_TOUGHNESS_COURSE, PERSONAL_DEVELOPMENT_COURSE];
const LESSON_SPECS = {
  AAE_LESSON, MATH_LESSON, MT_DAY1_LESSON,
  PD_MISSION_1, PD_MISSION_2, PD_MISSION_3, PD_MISSION_4, PD_MISSION_5,
};


export { AAE_COURSE, MATH_COURSE, MENTAL_TOUGHNESS_COURSE, PERSONAL_DEVELOPMENT_COURSE, CATALOG, LESSON_SPECS };
