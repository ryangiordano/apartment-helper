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
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries,
} from 'react-vis';

export default function BarChart(props) {
    const { history } = props.data;
    // Refactor into service
    const historyData = Object.keys(props.data.history).map(key => {
        return {
            ...history[key]
        }
    });

    const unitsData = Object.keys(historyData).reduce((acc:any, key) => {
        const unitHistory = Object.keys(historyData[key]).map(id => ({ ...historyData[key][id] }));
        const unit = unitHistory[unitHistory.length - 1];
        if(unit.rent[0] === "N/A"){
            return acc;
        }
        const obj = {
            x: unit.propertyName,
            y: unit.rent[unit.rent.length - 1]
        }
        acc.push(obj);
        return acc;
    },[]);

    return (
        <FlexibleXYPlot
            // xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
            // yDomain={[0.1, 2.1]}
            xType="ordinal"
            height={300}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries animation data={unitsData} style={{ stroke: '#fff' }} />
        </FlexibleXYPlot>
    );
}