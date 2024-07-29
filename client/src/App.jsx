import { useState } from "react";

import FormModal from "./components/FormModal";
import TotalTxs from "./components/Outlet";
import RootLayout from "./components/Root";
import Root from "./components/Root";
import TestIPFS from "./components/TestIPFS";

function App() {
  const [count, setCount] = useState(0);

  // return <Root />;
  return <TestIPFS />;
}

export default App;
