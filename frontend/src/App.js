import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Courses from "./components/Courses";
import EnrollStudent from "./components/EnrollStudent";
import AssignTeacher from "./components/AssignTeacher";

function App() {
  return (
    <div style={{ padding: "20px" }}>

      <Students />

      <hr />

      <Teachers />

      <hr />

      <Courses />

      <hr />

      <EnrollStudent />

      <hr />

      <AssignTeacher />

    </div>
  );
}

export default App;