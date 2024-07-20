import { useState } from "react";

import FormModal from "./components/FormModal";
import TotalTxs from "./components/Outlet";
import RootLayout from "./components/Root";
import Root from "./components/Root";

function App() {
  const [count, setCount] = useState(0);

  return <Root />;
}

export default App;
