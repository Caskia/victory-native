/*global setInterval*/
/* demo.js is loaded by both index.ios.js and index.android.js */

import { random, range, round, first, last } from "lodash";
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  Dimensions,
  View
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, G, Line } from "react-native-svg";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryCandlestick,
  VictoryErrorBar,
  VictoryBar,
  VictoryLine,
  VictoryArea,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryVoronoiContainer,
  VictorySelectionContainer,
  VictoryBrushContainer,
  VictoryCursorContainer,
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  createContainer,
  VictoryPortal,
  Bar,
  VictoryContainer,
  Point
} from "victory-native";

import { VictoryTheme } from "victory-core";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e1d7cd",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50
  },
  text: {
    fontSize: 18,
    fontFamily: (Platform.OS === "ios") ? "Menlo" : "monospace",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  }
});

const candleData = [
  { x: 1, open: 9, close: 30, high: 56, low: 7 },
  { x: 2, open: 80, close: 40, high: 120, low: 10 },
  { x: 3, open: 50, close: 80, high: 90, low: 20 },
  { x: 4, open: 70, close: 22, high: 70, low: 5 },
  { x: 5, open: 20, close: 35, high: 50, low: 10 },
  { x: 6, open: 35, close: 30, high: 40, low: 3 },
  { x: 7, open: 30, close: 90, high: 95, low: 30 },
  { x: 8, open: 80, close: 81, high: 83, low: 75 }
];

const legendData = [{
  name: "Series 1",
  symbol: {
    type: "circle",
    fill: "green"
  }
}, {
  name: "Long Series Name",
  symbol: {
    type: "triangleUp",
    fill: "blue"
  }
}, {
  name: "Series 3",
  symbol: {
    type: "diamond",
    fill: "pink"
  }
}, {
  name: "Series 4",
  symbol: {
    type: "plus"
  }
}, {
  name: "Series 5",
  symbol: {
    type: "star",
    fill: "red"
  },
  labels: {
    fill: "purple"
  }
}, {
  name: "Series 6",
  symbol: {
    type: "circle",
    fill: "orange"
  },
  labels: {
    fill: "blue"
  }
}];

const legendStyle = { border: { stroke: "black" } };

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      y: this.getYFunction(),
      style: this.getStyles(),
      transitionData: this.getTransitionData(),
      randomData: this.generateRandomData(),
      staticRandomData: this.generateRandomData(15),
      data: this.getData()
    };
  }

  componentDidMount() {
    setInterval(this.updateDemoData.bind(this), 3000);
  }

  getYFunction() {
    const n = random(2, 7);
    return (data) => Math.exp(-n * data.x) * Math.sin(2 * n * Math.PI * data.x);
  }

  generateRandomData(points = 6) {
    return range(1, points + 1).map((i) => ({ x: i, y: i + random(-1, 2) }));
  }

  getData() {
    return range(1, 10).map((i) => ({ x: i, y: random(1, 10) }));
  }

  getStyles() {
    const colors = [
      "red", "orange", "magenta",
      "gold", "blue", "purple"
    ];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  getTransitionData() {
    const n = random(4, 10);
    return range(n).map((i) => {
      return {
        x: i,
        y: random(2, 10)
      };
    });
  }

  changeScroll(scrollEnabled) {
    this.setState({ scrollEnabled });
  }

  updateDemoData() {
    this.setState({
      y: this.getYFunction(),
      style: this.getStyles(),
      transitionData: this.getTransitionData(),
      randomData: this.generateRandomData(),
      data: this.getData()
    });
  }

  state = {
    "x": 1
  };

  setActiveIndex = (points)  => {
    this.setState({"x": points[1].x});
  }

  handleCursorChange(value) {
  	this.setState({
    	activePoint: findClosestPointSorted(allData, value)
    });
  }

  render() {
  	const { activePoint } = this.state;
    const point = activePoint ?
    	<VictoryScatter data={[activePoint]} style={{data: {size: 100} }}/>
      : null;
  	return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={this.state.scrollEnabled}>
        <VictoryChart
          containerComponent={
            <VictoryCursorContainer
              dimension="x"
              onChange={this.handleCursorChange.bind(this)}
              cursorLabel={d => `${d.x}, ${Math.round(d.y)}`}
            />
          }
        >
          <VictoryLine data={allData} style={{data: {stroke: '#999'} }}/>
          {point}
        </VictoryChart>
      </ScrollView>
    );
  }




  // render() {
  //   return (
  //     <ScrollView contentContainerStyle={styles.container} scrollEnabled={this.state.scrollEnabled}>
  //       <VictoryChart 
  //       // containerComponent={
  //       //   <VictoryVoronoiContainer
  //       //     labels={(d) => `${round(d.x, 2)}, ${round(d.y, 2)}`}
  //       //   />
  //       // }
  //       containerComponent={
  //                 <VictoryCursorContainer 
  //                   cursorComponent={<Line style={{ stroke: '#f00', strokeWidth: 1 }}></Line>}
  //                   cursorDimension="x"
  //                   cursorLabel={(d) => `${round(d.x, 2)}, ${round(d.y, 2)}`}
  //                />
  //       }
  //       >
  //         <Defs>
  //           <LinearGradient id="gradient1">
  //             <Stop offset='0%' stopColor={'#f00'}></Stop>
  //             <Stop offset='100%' stopColor={'#0f0'}></Stop>
  //           </LinearGradient>
  //         </Defs>
  //         <VictoryAxis
  //         style={{
  //           axis: {stroke: "none"},
  //         }}
  //         tickFormat={(t) => ``}
  //         />
  //         <VictoryLine style={{ data: { stroke: 'url(#gradient1)', strokeWidth: 2 } }}
  //           data={this.state.staticRandomData}>
  //         </VictoryLine>
  //       </VictoryChart>
  //     </ScrollView>
  //   );
  // }
}

const allData = range(750).map((x) => ({x, y: x + 30 * Math.random()}));

const findClosestPointSorted = (data, value) => {
	// assumes 3 things:
  // 1. data is sorted by x
  // 2. data points are equally spaced
  // 3. the search is 1-dimentional (x, not x and y)
  if (value === null) return null;
	const start = first(data).x;
	const range = (last(data).x - start);
  const index = Math.round((value - start)/range * (data.length - 1));
  return data[index];
};

