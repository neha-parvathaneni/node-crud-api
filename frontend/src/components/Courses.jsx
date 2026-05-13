// components/Courses.jsx

import { useEffect, useState } from "react";

import {
  createCourse,
  getCourses
} from "../services/api";

function Courses() {

  const [courses, setCourses] = useState([]);

  const [course, setCourse] = useState({
    code: "",
    title: "",
    credits: ""
  });

  const fetchCourses = async () => {
    try {

      const res = await getCourses();

      setCourses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourse = async () => {
    try {

      await createCourse(course);

      fetchCourses();

      setCourse({
        code: "",
        title: "",
        credits: ""
      });

      alert("Course Created");

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Courses</h1>

      <input
        placeholder="Code"
        value={course.code}
        onChange={(e) =>
          setCourse({
            ...course,
            code: e.target.value
          })
        }
      />

      <input
        placeholder="Title"
        value={course.title}
        onChange={(e) =>
          setCourse({
            ...course,
            title: e.target.value
          })
        }
      />

      <input
        placeholder="Credits"
        value={course.credits}
        onChange={(e) =>
          setCourse({
            ...course,
            credits: e.target.value
          })
        }
      />

      <button onClick={handleCourse}>
        Add Course
      </button>

      <br /><br />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Teacher</th>
            <th>Students Count</th>
          </tr>
        </thead>

        <tbody>

          {courses.map((course) => (

            <tr key={course._id}>

              <td>{course._id}</td>

              <td>{course.code}</td>

              <td>{course.title}</td>

              <td>{course.credits}</td>

              <td>
                {course.teacher
                  ? course.teacher.name
                  : "Not Assigned"}
              </td>

              <td>{course.students.length}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Courses;