
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 80, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

function test(number) {
  console.log("it worked" + number);
  return;
}

function config_xaxis(x, xstart, xstop) {
  // new X axis
  x.domain([xstart, xstop])

  svg.select(".myXaxis")
    .transition()
    .duration(2000)
    .attr("opacity", "1")
    .call(d3.axisBottom(x));
}

//Read the data
//d3.csv("assets/data/data.csv", function(data) {
d3.csv("./assets/data/data.csv").then(function (data) {
  console.log(data);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 0])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
    .call(d3.axisBottom(x))
    .attr("opacity", "0");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([8, 20])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function (d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function (d) {
    tooltip
      .html("Poverty is: " + d.poverty + "<br> Healthcare value is: " + d.healthcare)
      .style("left", (d3.mouse(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function (d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  var dot = svg.selectAll("dot")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "elements");

  dot.append("circle")
    .attr("cx", function (d) { return x(d.healthcare); })
    .attr("cy", function (d) { return y(d.poverty); })
    .attr("r", 2)
    .style("fill", "#69b3a2")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

  dot.append("text")
    .attr("class", "circle-text")
    .attr("text-anchor", "middle")
    .text(function (d) { return d.abbr })
    .style("opacity", 0)
    .style("font-size", "10")
    .style("stroke", "none")
    .attr("dx", function (d) { return x(d.healthcare); })
    .attr("dy", function (d) { return y(d.poverty); });

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")


  config_xaxis(x, 0, 30);

  var xlab = [{
    "label": "% Healthcare",
    "class": "active"
  },
  {
    "label": "% Smokes",
    "class": "inactive"
  },
  {
    "label": "Obese",
    "class": "inactive"
  }]

  // Add X axis label:
  var xlabels = svg.selectAll("dot")
    .append("g")
    .attr("class", "elements")
    .data(xlab)
    .enter();

  xlabels.append("rect")
    .attr("height", 20)
    //        .attr("class","inactive active")
    .attr("width", 120)
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("y", function (d, i) { return height + 5 + margin.top + i * 20 })
    .style("fill", "none")
    .on('click', function (d, i) {
      d3.select('.status')
        .text('You clicked on circle ' + i);
    });
  ;


  xlabels.append("text")
    .attr("class", function (d) { return d.class })
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", function (d, i) { return height + 20 + margin.top + i * 20 })
    .text(function (d) { return d.label; });

  // Y axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .text("% Poverty")


  svg.selectAll('rect')
    .on('click', function (d, i) {
      svg.select('.status')
        .text('You clicked on circle ' + i);
    });

  //show the dots in the right spot
  svg.selectAll("circle")
    .transition()
    .delay(function (d, i) { return (i * 3) })
    .duration(2000)
    .attr("cx", function (d) { return x(d.healthcare); })
    .attr("cy", function (d) { return y(d.poverty); })
    .attr("r", 10)
    .style("fill", "#69b3a2")
    .style("opacity", 0.3)
    .style("stroke", "white");

  dot.selectAll("text")
    .transition()
    .delay(function (d, i) { return (i * 3) })
    .duration(2000)
    .style("opacity", 0.6)
    .style("font-size", "9")
    .style("stroke", "#69b3a2")
    .attr("text-anchor", "middle")
    .attr("dx", function (d) { return x(d.healthcare); })
    .attr("dy", function (d) { return y(d.poverty); });

});

