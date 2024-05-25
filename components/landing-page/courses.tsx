"use client";

import { motion } from "framer-motion";
import Course from "./course";

export default function Courses() {
  const data = generateTestData();
  console.log("data: ", data);

  return (
    <section className="container flex flex-col items-center">
      <motion.ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, idx) => (
          <motion.li key={idx}>
            <Course {...item} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

type TestData = {
  profName: string;
  courses: string[];
};

function generateTestData() {
  const testData: TestData[] = [];

  for (let i = 0; i < 10; i++) {
    const professor = `professor ${i + 1}`;
    const classes = [];
    for (let j = 0; j < 3; j++) {
      classes.push(`class ${j + 1}`);
    }
    testData.push({ profName: professor, courses: classes });
  }

  return testData;
}
