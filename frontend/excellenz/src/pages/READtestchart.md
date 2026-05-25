//zeug hier ist eher für mich zum erinnern, werd das hier später wahrscheinlich in ein tatsächliches dokument passen und das hier löschen

chart.js

const data = {
 labels: ["Jan", "Feb", "Mar"],
 datasets: [
  {
   label: "Income",
   data: [3800, 2100, 6500],
   borderColor: "green",
  }
 ]
};


labels
example:
labels: ["Jan", "Feb", "Mar"]
Defines the X-axis categories 
Each label is one position on the horizontal axis


datasets
Holds all the lines (or bars, etc.) in the chart
Each object inside is ONE line

inside datasets:
label (inside dataset)
label: "Income"
Names that specific dataset
Shows up in:
- legend (top of chart)
- tooltips (hover info)

data
data: [3800, 2100, 6500]
These are the actual Y-axis values
Each number matches a label by position

data[i] corresponds to labels[i]


options: {
scales: {
y: {
min: 0,
max: 10000,
ticks: {
stepSize: 5000
}
}
}
}
//stepSize determines the ticks
yes the code does look this ugly