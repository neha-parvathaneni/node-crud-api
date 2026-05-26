import { useEffect, useState } from "react";

import {
  createCourse,
  getCourses
} from "../services/api";

import { resetCourse } from "../services/service";

import InputComponent from "./common/InputComponent";

function Courses() {

  const [courses, setCourses] = useState([]);

  const [course, setCourse] = useState(
    resetCourse()
  );

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

      await createCourse({
        code: course.code,
        title: course.title,
        credits: Number(course.credits)
      });

      fetchCourses();

      setCourse(resetCourse());

      alert("Course Created");

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div>

      <h1>Courses</h1>

      <InputComponent
        placeholder="Code"
        value={course.code}
        onChange={(e) =>
          setCourse({
            ...course,
            code: e.target.value
          })
        }
      />

      <InputComponent
        placeholder="Title"
        value={course.title}
        onChange={(e) =>
          setCourse({
            ...course,
            title: e.target.value
          })
        }
      />

      <InputComponent
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
            <th>Teacher ID</th>
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
                {course.teacherName || "Not Assigned"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Courses;