import Linechart, {createListContent} from "../components/linechart.jsx";

export default function TestChart(){

var startdate ="01.2025";
var enddate = "03.2025";
var ticks = 2000;
var minValue = 0;
var maxValue = 10000;

var income= [1000, 3800, 5500];
var costs = [900,2000,5100];

var list = [
    createListContent("income", income, "green"),
    createListContent("costs", costs, "red")
];



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
        ticks={ticks}
        minValue={minValue}
        maxValue={maxValue}
        list={list}
    />

    <Linechart
        startdate={startdate2}
        enddate={enddate2}
        ticks={ticks2}
        minValue={minValue2}
        maxValue={maxValue2}
        list={list2}
    />


    <Linechart
        startdate={"04.2026"}
        enddate={"07.2026"}
        ticks={100}
        minValue={0}
        maxValue={1000}
        list={[createListContent("stuff", [350, 100, 210, 710], "brown")]}
    />
    </div>
);

}