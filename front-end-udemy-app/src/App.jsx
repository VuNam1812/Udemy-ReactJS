import "./App.scss";
import {
  Home,
  Login,
  Register,
  Courses,
  CourseDetail,
  CourseLession,
  InstructorDetail,
  StudentProfile,
} from "./containers/pages";

function App() {
  return (
    <div className="App">
      <StudentProfile></StudentProfile>
    </div>
  );
}

export default App;
