import React from 'react';
import { curveCatmullRom } from 'd3-shape';
import '../../node_modules/react-vis/dist/style.css';

import {
  FlexibleXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries
} from 'react-vis';

export default function LineChart(props) {
  const { history } = props.data;
  // Refactor into service
  const historyData = Object.keys(props.data.history).map(key => {
    return {
      ...history[key]
    }
  });

  const unitData = Object.keys(historyData[0]).map(key => {
    return {
      ...historyData[0][key]
    }
  })

  const data = unitData.map(d => {
    return {
      y: d.rent[d.rent.length - 1],
      x: new Date(d.timeStamp)
    }
  });

  return (
    <FlexibleXYPlot height={300}>
      <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
      <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
      <XAxis
        type="time"
        title="X Axis"
        style={{
          line: { stroke: '#ADDDE1' },
          ticks: { stroke: '#ADDDE1' },
          text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
        }}
      />
      <YAxis title="Y Axis" />
      {/* <LineMarkSeries
        className="first-series"
        data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
        style={{
          strokeLinejoin: 'round',
          strokeWidth: 4
        }}
      /> */}
      {/* <LineMarkSeries className="second-series" data={null} /> */}
      <LineMarkSeries
        animation
        className="third-series"
        curve={'curveMonotoneX'}
        data={data}
        strokeDasharray="7, 3"
      />
      {/* <LineMarkSeries
        className="fourth-series"
        curve={curveCatmullRom.alpha(0.5)}
        data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
      /> */}
    </FlexibleXYPlot>
  );
}