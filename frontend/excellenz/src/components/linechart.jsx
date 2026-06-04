import "../styles/linechart.css";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend, scales,
} from "chart.js";

import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";



// register required parts
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    annotationPlugin
);



function createData(label, data, color) {
    return {
        label: label,
        data: data,
        borderColor: color,
    };
}

function createDataset(List) {
    return List.map(item =>
        createData(item.label, item.data, item.color)
    );
}

//needed to create a new linechart
//label will be the name for the entire line
//numbers needs to be an array of numbers, keep in mind that the position of the numbers in the array will correspond to the month
//will need to change numbers later
export function createListContent(name,numbers,color){
    return { label: name, data: numbers, color: color }
}

function parseMonthYear(str) {
    const [month, year] = str.split(".");
    return new Date(year, month - 1, 1); // always date = 1
}


function generateMonthLabels(start, end) {
    const startDate = parseMonthYear(start);
    const endDate = parseMonthYear(end);

    const labels = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        const month = current.toLocaleString("default", { month: "short" });
        const year = current.getFullYear();

        labels.push(`${month}`);

        current.setMonth(current.getMonth() + 1);
    }

    return labels;
}

function formatMonthYear(str) {
    const [month, year] = str.split(".");

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    return `${monthNames[Number(month) - 1]} ${year}`;
}


//how Linechart works:
//insert startdate and enddate, it will automatically insert the months between
//ticks
//minValue for the min Y Value
//maxValue for the max Y Value
//list: array of the datas, use createListContent function
//list MUSS array sein, selbst wenn es nur eine linie ist
//view testchart as an example of linechart parameters

//PROBLEM: hard to link the numbers of the list to the correct month, everything is needed to be in the right order

export default function Linechart({startdate, enddate, Ytext, ticks, minValue, maxValue, list}) {

    const data = {
        labels: generateMonthLabels(startdate, enddate),
        datasets: createDataset(list),
    };



    const options = {
        responsive: true,
        maintainAspectRatio: false,



        scales: {
            x: {
                grid: {
                    color: "grey",
                },
                ticks: {
                    color: "white",
                },
            },

            y: {
                min: minValue,
                max: maxValue,

                ticks: {
                    color: "white",
                    stepSize: ticks,
                },

                grid: {
                    color: "grey",
                },

                title: {
                    display: true,
                    text: Ytext,
                    color: "white",
                }
            },
        },

        plugins: {
            legend: {
                position: "bottom",

                onClick: null,

                labels: {
                    color: "white",
                },
            },

        },


    }



    if (options.scales.y.min < 0) {
        options.plugins.annotation = {
            annotations: {
                zeroLine: {
                    type: "line",
                    yMin: 0,
                    yMax: 0,
                    borderColor: "grey",
                    borderWidth: 3,
                    drawTime: "beforeDatasetsDraw",
                },
            },
        };
    }

    return (

        <div className="chart-card">
            <h2 className="linechartTitle">
                {formatMonthYear(startdate)} → {formatMonthYear(enddate)}
            </h2>
            <div className="chart-area">
                 <Line data={data} options={options} />
            </div>
        </div>
    );
}