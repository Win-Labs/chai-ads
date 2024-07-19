import { useState } from "react";

import "./App.css";
import FormModal from "./components/FormModal";

function App() {
  const [count, setCount] = useState(0);

  return <FormModal></FormModal>;
}

export default App;
