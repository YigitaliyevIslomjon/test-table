import ComponentClass from "./Components/ComponentClass";
import ComponentFC from "./Components/ComponentFC";
import { useParams } from "react-router-dom";

function App() {
  const params = useParams();

  return (
    <div className="App">
      <ComponentFC />
      <ComponentClass params={params} />
    </div>
  );
}

export default App;
