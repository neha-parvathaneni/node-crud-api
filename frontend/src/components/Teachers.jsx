// components/Teachers.jsx

import { useEffect, useState } from "react";

import {
  createTeacher,
  getTeachers
} from "../services/api";

function Teachers() {

  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState({
    name: "",
    age: "",
    email: ""
  });

  const fetchTeachers = async () => {
    try {

      const res = await getTeachers();

      setTeachers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTeacher = async () => {
    try {

      await createTeacher(teacher);

      fetchTeachers();

      setTeacher({
        name: "",
        age: "",
        email: ""
      });

      alert("Teacher Created");

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Teachers</h1>

      <input
        placeholder="Name"
        value={teacher.name}
        onChange={(e) =>
          setTeacher({
            ...teacher,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Age"
        value={teacher.age}
        onChange={(e) =>
          setTeacher({
            ...teacher,
            age: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={teacher.email}
        onChange={(e) =>
          setTeacher({
            ...teacher,
            email: e.target.value
          })
        }
      />

      <button onClick={handleTeacher}>
        Add Teacher
      </button>

      <br /><br />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {teachers.map((teacher) => (

            <tr key={teacher._id}>

              <td>{teacher._id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.age}</td>
              <td>{teacher.email}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Teachers;