// import "./App.css";

import CytoscapeComponent from "react-cytoscapejs";

const elements = [
  { data: { id: "one", label: "Node 1" }, position: { x: 50, y: 50 } },
  { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 0 } },
  { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
];

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}

export default App;
