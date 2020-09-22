// @TODO: YOUR CODE HERE!

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
  var x = d3.scaleLinear()
  .domain([0, 30])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([8, 20])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

svg.append("g")
//   .selectAll("dot")

//Read the data
d3.csv("assets/data/data.csv", function(data) {
    console.log(data);
    console.log(data.poverty);
    console.log(data.healthcare);

  // Add dots
//   svg.select("g")
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function(d) { return d.healthcare; })
//       .attr("cy", function(d) { return d.poverty; })
//       .attr("r", 5)
//       .style("fill", "blue")
//       .text(function(d) { return d.state});
    svg.append("circle")
        .attr("cx", x(data.healthcare))
        .attr("cy", y(data.poverty))
        .attr("r", 5)
        .style("fill", "blue")
        .text(data.state);

    console.log(data.healthcare);

    });

//svg.enter()
//     .append("div")
//     .classed("temps", true)
//     .merge(selection)
//     .style("height", function(d) {
//       return d + "px";
//     }); 