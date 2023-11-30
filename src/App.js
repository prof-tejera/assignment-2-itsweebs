import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView/DocumentationView";
import TimersView from "./views/TimersView/TimersView";
import AddTimerView from "./views/AddTimersView/AddTimersView";
import WorkoutQueueView from "./views/WorkoutQueueView/WorkoutQueueView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/">Workout Queue</Link>
        </li>
      <li>
          <Link to="/add">Add Timer</Link>
        </li>
        <li>
          <Link to="/timers">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<WorkoutQueueView />} />
          <Route path="/add" element={<AddTimerView />} />
          <Route path="/timers" element={<TimersView />} />
          <Route path="/docs" element={<DocumentationView />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;

//add array for timers and pass it to workoutqueue view & addtimer view
//create function add to array