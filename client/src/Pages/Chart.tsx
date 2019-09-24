import React from "react";
import LineChart from "../Components/LineChart";
import data from '../data/data.json';
import BarChart from '../Components/BarChart';


export default class ChartPage extends React.Component {
    render(){
        return (<>
        <LineChart data={data}></LineChart>
        <BarChart data={data}></BarChart>
        </>)
    }
}