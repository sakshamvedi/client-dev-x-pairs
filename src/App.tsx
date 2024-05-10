
import { Routes, Route } from "react-router-dom"
import React from 'react';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
