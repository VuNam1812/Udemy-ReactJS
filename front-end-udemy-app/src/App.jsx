import "./App.scss";
import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
  AdminProfile,
} from "./containers/pages";
import { authContext } from "./contexts/auth/authContext";
function App() {
  const { store_auth } = useContext(authContext);

  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          {!store_auth.auth ? (
            <Register></Register>
          ) : (
            <Redirect to="/"></Redirect>
          )}
        </Route>
        <Route path="/login">
          {!store_auth.auth ? <Login></Login> : <Redirect to="/"></Redirect>}
        </Route>
        <Route path="/courses">
          <Switch>
            <Route exact path="/courses">
              <Courses></Courses>
            </Route>
            <Route path="/courses/:catId">
              <Courses></Courses>
            </Route>
          </Switch>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
