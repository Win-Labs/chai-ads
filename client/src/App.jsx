import { useState } from "react";

import FormModal from "./components/FormModal";
import TotalTxs from "./components/TotalTxs";

function App() {
  const [count, setCount] = useState(0);

  return <TotalTxs />;
}

export default App;
