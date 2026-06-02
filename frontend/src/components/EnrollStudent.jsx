import { useEffect, useState } from "react";

import {
  enrollStudent,
  getStudents,
  getCourses
} from "../services/api";

import { resetEnrollData } from "../services/service";

import SelectComponent from "./common/SelectComponent";

function EnrollStudent() {

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [enrollData, setEnrollData] = useState(
    resetEnrollData()
  );

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

      setEnrollData(resetEnrollData());

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Enroll Student</h1>

      <SelectComponent
        value={enrollData.studentId}
        onChange={(e) =>
          setEnrollData((prev) => ({
            ...prev,
            studentId: e.target.value
          }))
        }
        options={students}
        labelKey="name"
        valueKey="_id"
        placeholder="Select Student"
      />

      <SelectComponent
        value={enrollData.courseId}
        onChange={(e) =>
          setEnrollData((prev) => ({
            ...prev,
            courseId: e.target.value
          }))
        }
        options={courses}
        labelKey="title"
        valueKey="_id"
        placeholder="Select Course"
      />

      <button onClick={handleEnroll}>
        Enroll
      </button>

    </div>

  );
}

export default EnrollStudent;