import Linechart, {createListContent} from "../components/linechart.jsx";

export default function TestChart(){

var startdate ="01.2025";
var enddate = "06.2025";
var ticks = 2000;
var minValue = 0;
var maxValue = 10000;

var income= [1000, 3500, 5500, 6000, 5900, 7900];
var costs = [500, 2000, 5100, 5200, 6200, 6300];

var profit = income.map((value, index) => value - costs[index]);

var list = [
    createListContent("income", income, "green"),
    createListContent("costs", costs, "red")
];

var listProfit = [
    createListContent("profit", profit, "white")
]



    var startdate2 ="01.2025";
    var enddate2 = "02.2026";
    var ticks2 = 100;
    var minValue2 = 0;
    var maxValue2 = 1000;

    var bullshit1= [200,350,450,950,850,120,870,850,650,790,810,900,980,700];
    var bullshit2 = [100,200,550,600,610,600,620,700,410,380,500,550,670,230];

    var list2 = [
        createListContent("randomstuff1", bullshit1, "purple"),
        createListContent("randomstuff2", bullshit2, "orange")
    ];

return(
    <div>
    <Linechart
        startdate={startdate}
        enddate={enddate}
        Ytext={"income and costs in €"}
        ticks={ticks}
        minValue={minValue}
        maxValue={maxValue}
        list={list}
    />

        <Linechart
            startdate={startdate}
            enddate={enddate}
            Ytext={"profit in €"}
            ticks={500}
            minValue={-500}
            maxValue={2000}
            list={listProfit}
        />

    <Linechart
        startdate={startdate2}
        enddate={enddate2}
        ticks={ticks2}
        Ytext={"here comes stuff"}
        minValue={minValue2}
        maxValue={maxValue2}
        list={list2}
    />


    <Linechart
        startdate={"04.2026"}
        enddate={"07.2026"}
        Ytext={"heres comes the text"}
        ticks={100}
        minValue={0}
        maxValue={1000}
        list={[createListContent("stuff", [350, 100, 210, 710], "brown")]}
    />
    </div>
);

}