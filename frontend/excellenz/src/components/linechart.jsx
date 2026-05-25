import "../styles/linechart.css";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";



// register required parts
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
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
    return new Date(year, month - 1, 1); // always day = 1
}


function generateMonthLabels(start, end) {
    const startDate = parseMonthYear(start);
    const endDate = parseMonthYear(end);

    const labels = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        const month = current.toLocaleString("default", { month: "short" });
        const year = current.getFullYear();

        labels.push(`${month} ${year}`);

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

export default function Linechart({startdate, enddate, ticks, minValue, maxValue, list}) {

    const data = {
        labels: generateMonthLabels(startdate, enddate),
        datasets: createDataset(list),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",
            },
        },

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
            },
        },
    };

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