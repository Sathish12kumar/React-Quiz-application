import { Route, Routes } from "react-router-dom";
import "./App.css";
import IntroPage from "./components/IntroPage";
import Question from "./components/Question";
import ScorePage from "./components/ScorePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="questions/:id" element={<Question />} />
        <Route path="/score/:score/:total" element={<ScorePage />} />
      </Routes>
    </>
  );
}

export default App;
