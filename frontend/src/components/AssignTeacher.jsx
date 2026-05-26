import { useEffect, useState } from "react";

import {
  assignTeacher,
  getTeachers,
  getCourses
} from "../services/api";

import { resetAssignData } from "../services/service";

import SelectComponent from "./common/SelectComponent";

function AssignTeacher() {

  const [teachers, setTeachers] = useState([]);

  const [courses, setCourses] = useState([]);

  const [assignData, setAssignData] = useState(
    resetAssignData()
  );

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

      setAssignData(resetAssignData());

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Assign Teacher</h1>

      <SelectComponent
        value={assignData.teacherId}
        onChange={(e) =>
          setAssignData({
            ...assignData,
            teacherId: e.target.value
          })
        }
        options={teachers}
        labelKey="name"
        valueKey="_id"
        placeholder="Select Teacher"
      />

      <SelectComponent
        value={assignData.courseId}
        onChange={(e) =>
          setAssignData({
            ...assignData,
            courseId: e.target.value
          })
        }
        options={courses}
        labelKey="title"
        valueKey="_id"
        placeholder="Select Course"
      />

      <button onClick={handleAssignTeacher}>
        Assign Teacher
      </button>

    </div>

  );
}

export default AssignTeacher;