import React, { Suspense } from "react";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <LandingPage />
    </Suspense>
  );
};

export default App;
