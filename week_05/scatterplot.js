let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")   // select id = #chart and pin the d3
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguines.csv').then(data => {
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.body_mass_g))  // dot position x
    .attr("cy", d => y(d.flipper_length_mm))  // dot position y
    .attr("r", 2)
    .attr("opacity", 0.75);  // in case the dots sit on top of each other 

  // set class here and set style in CSS
  const tooltip = d3.select("body").append("div")  // select the body tag from HTML, append new div, 
    .attr("class", "svg-tooltip")  // add these three styles
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")  // mouse move: turn red and  data
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) {  // mouse leave: recover
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});