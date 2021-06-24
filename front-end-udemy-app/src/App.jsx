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
  TeacherProfile,
} from "./containers/pages";

function App() {
  return (
    <div className="App">
      <TeacherProfile></TeacherProfile>
    </div>
  );
}

export default App;
