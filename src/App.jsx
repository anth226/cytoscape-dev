import { useState } from "react";
import Cytoscape from 'cytoscape';
import CytoscapeComponent from "react-cytoscapejs";
import COSEBilkent from 'cytoscape-cose-bilkent';
import graphData from './data/newData.json'
import DataTable from "./DataTable";

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
        "overlay-padding": "2px",
        "z-index": "10",
        //text props
        // "text-outline-color": "data(background_color)",
        // "text-outline-width": "1px",
        color: "black",
        fontSize: 16 
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "5px",
        "border-color": "#f23558",
        "border-opacity": ".6",
        "background-color": "#fff",
        
        width: 30,
        height: 30,
        //text props
        fontSize: 16,
        "text-outline-color": "data(background_color)",
        // "text-outline-width": 5
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
        width: 2,
        // "line-color": "#6774cb",
        "line-color": "#ccc",
        "target-arrow-color": "#656565",
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

  let graphDataArr = () => {
    let data = {...graphData}

    let customizeNodes = data.nodes.reduce((arrData, item) => {
      return arrData = [...arrData, {data: {...item.data, background_color: item.data.fraud ? 'red' : item.data.suspicious ? 'yellow' : 'green'}}]
    }, [])

    data.nodes = customizeNodes;

    let customizeEdges = data.edges.reduce((arrData, item)=> {
      return arrData = [...arrData, {data: {...item.data, source: item.data.from, target: item.data.to}}]
    }, [])

    data.edges = customizeEdges

    return data
  }


  const resetFilter = () => {
    setLayout(layoutConfigs.breadthfirst)
  }
   

  return (
    <div className="main">
      <div className="layout">
        <div className="header">
          <h4>Network</h4>
        </div>
        <div className="content">
          <div className="change-layout">
            <select onClick={handleLayout}>
              {
                Object.keys(layoutConfigs).map((layoutName, index) => (
                  <option key={`layout-item-${index}`} value={JSON.stringify(layoutConfigs[layoutName])}>{layoutName}</option>
                ))
              }
            </select>

            <button type="button" onClick={resetFilter}>Reset Filters</button>
          </div>
          
          <div className="data-chart">
            <CytoscapeComponent
              elements={CytoscapeComponent.normalizeElements(graphDataArr())}
              // pan={{ x: 200, y: 200 }}
              style={{ width: 'calc(100% - 10px)', minHeight: '500px', padding: '5px', border: '1px solid #ddd' }}
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
          <div className="data-table">
            <DataTable data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
