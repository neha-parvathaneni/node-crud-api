// components/AssignTeacher.jsx

import { useEffect, useState } from "react";

import {
  assignTeacher,
  getTeachers,
  getCourses
} from "../services/api";

function AssignTeacher() {

  const [teachers, setTeachers] = useState([]);

  const [courses, setCourses] = useState([]);

  const [assignData, setAssignData] = useState({
    teacherId: "",
    courseId: ""
  });

  const fetchTeachers = async () => {
    try {

      const res = await getTeachers();

      setTeachers(res.data);

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

    fetchTeachers();
    fetchCourses();

  }, []);

  const handleAssignTeacher = async () => {
    try {

      await assignTeacher(assignData);

      alert("Teacher Assigned");

      setAssignData({
        teacherId: "",
        courseId: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Assign Teacher</h1>

      <select
        value={assignData.teacherId}
        onChange={(e) =>
          setAssignData({
            ...assignData,
            teacherId: e.target.value
          })
        }
      >

        <option value="">
          Select Teacher
        </option>

        {teachers.map((teacher) => (

          <option
            key={teacher._id}
            value={teacher._id}
          >
            {teacher.name}
          </option>

        ))}

      </select>

      <select
        value={assignData.courseId}
        onChange={(e) =>
          setAssignData({
            ...assignData,
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

      <button onClick={handleAssignTeacher}>
        Assign Teacher
      </button>

    </div>

  );
}

export default AssignTeacher;