// components/EnrollStudent.jsx

import { useEffect, useState } from "react";

import {
  enrollStudent,
  getStudents,
  getCourses
} from "../services/api";

function EnrollStudent() {

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [enrollData, setEnrollData] = useState({
    studentId: "",
    courseId: ""
  });

  const fetchStudents = async () => {
    try {

      const res = await getStudents();

      setStudents(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async () => {
    try {

      const res = await getCourses();

      setCourses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    fetchStudents();
    fetchCourses();

  }, []);

  const handleEnroll = async () => {
    try {

      await enrollStudent(enrollData);

      alert("Student Enrolled");

      setEnrollData({
        studentId: "",
        courseId: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Enroll Student</h1>

      <select
        value={enrollData.studentId}
        onChange={(e) =>
          setEnrollData({
            ...enrollData,
            studentId: e.target.value
          })
        }
      >

        <option value="">
          Select Student
        </option>

        {students.map((student) => (

          <option
            key={student._id}
            value={student._id}
          >
            {student.name}
          </option>

        ))}

      </select>

      <select
        value={enrollData.courseId}
        onChange={(e) =>
          setEnrollData({
            ...enrollData,
            courseId: e.target.value
          })
        }
      >

        <option value="">
          Select Course
        </option>

        {courses.map((course) => (

          <option
            key={course._id}
            value={course._id}
          >
            {course.title}
          </option>

        ))}

      </select>

      <button onClick={handleEnroll}>
        Enroll
      </button>

    </div>

  );
}

export default EnrollStudent;