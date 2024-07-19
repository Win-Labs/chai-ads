import { useState } from "react";

import FormModal from "./components/FormModal";

function App() {
  const [count, setCount] = useState(0);

  return <FormModal />;
}

export default App;
