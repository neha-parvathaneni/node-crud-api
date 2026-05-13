// components/Students.jsx

import { useEffect, useState } from "react";

import {
  createStudent,
  getStudents
} from "../services/api";

function Students() {

  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: ""
  });

  const fetchStudents = async () => {
    try {

      const res = await getStudents();

      setStudents(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudent = async () => {
    try {

      await createStudent(student);

      fetchStudents();

      setStudent({
        name: "",
        age: "",
        email: ""
      });

      alert("Student Created");

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h1>Students</h1>

      <input
        placeholder="Name"
        value={student.name}
        onChange={(e) =>
          setStudent({
            ...student,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Age"
        value={student.age}
        onChange={(e) =>
          setStudent({
            ...student,
            age: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={student.email}
        onChange={(e) =>
          setStudent({
            ...student,
            email: e.target.value
          })
        }
      />

      <button onClick={handleStudent}>
        Add Student
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

          {students.map((student) => (

            <tr key={student._id}>

              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Students;