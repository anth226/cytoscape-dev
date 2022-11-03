// import "./App.css";

import { useState } from "react";
import Cytoscape from 'cytoscape';
import CytoscapeComponent from "react-cytoscapejs";
import COSEBilkent from 'cytoscape-cose-bilkent';
import graphData from './data/graphElements.json'

Cytoscape.use(COSEBilkent);

const layoutConfigs = {
  breadthfirst: {
      name: 'breadthfirst',
      animate: 'end',
      animationDuration: 1000,
      animationEasing: 'ease-in-out',
      roots: 'node[root_node]',
      avoidOverlap: true,
  },
  circle: {
      name: 'circle',
      animate: 'end',
      animationDuration: 1000,
      animationEasing: 'ease-in-out',
      nodeSeparation: 220
  },
  grid: {
      name: 'grid',
      animate: 'end',
      animationDuration: 1000,
      animationEasing: 'ease-in-out',
      nodeSeparation: 220
  },
  concentric: {
      name: 'concentric',
      animate: 'end',
      animationDuration: 1000,
      animationEasing: 'ease-in-out',
      padding: 30,
      minNodeSpacing: 70
  },
  cose: {
    name: 'cose-bilkent',
    animate: 'end',
    // animationDuration: 1000,
    animationEasing: 'ease-in-out',
    nodeSeparation: 220,
    // fit: false,
    padding: 50,
    idealEdgeLength: 200,
  }
}

function App() {

  const [layout, setLayout] = useState(layoutConfigs.breadthfirst)
  const [tableData, setTableData] = useState([])


  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(id)",

        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "text-valign": "center",
        // "text-halign": "center",
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
        fontSize: 20
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "4px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 40,
        height: 40,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 2
      }
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "rectangle"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    },
    {
      selector: 'node[background_color]',
      style: {
          'background-color': 'data(background_color)',
          'text-outline-color': 'data(background_color)',
      }
  },
  ];

  let myCyRef;

  const handleLayout = (e) => {
    setLayout(JSON.parse(e.target.value))
  }


  return (
    <div className="main">
      <div className="layout">
        <div className="header">
          <h1>Cytoscape example</h1>
          <select onClick={handleLayout}>
            {
              Object.keys(layoutConfigs).map((layoutName, index) => (
                <option key={`layout-item-${index}`} value={JSON.stringify(layoutConfigs[layoutName])}>{layoutName}</option>
              ))
            }
          </select>
        </div>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#fff"
          }}
        >
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            // pan={{ x: 200, y: 200 }}
            style={{ width: '50vw', height: '60vh' }}
            zoomingEnabled={true}
            maxZoom={3}
            minZoom={.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={styleSheet}
            cy={cy => {
              myCyRef = cy;

              cy.on("tap", "node", evt => {
                var node = evt.target;
                console.log("TARGET", node.data());
                let edgeData = cy.edges().filter(item => item.data().from === node.data().id && item.data())
                let arrData = []
                edgeData.forEach(item => {
                  arrData.push(item.data())
                })
                setTableData(arrData)
              });
            }}
            abc={console.log("myCyRef", myCyRef)}
          />
        </div>
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>from</th>
                <th>to</th>
                <th>keyType</th>
                <th>via</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((item, index) => (
                  <tr key={`table-item-${index}`}>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.keyType}</td>
                    <td>{item.via}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
