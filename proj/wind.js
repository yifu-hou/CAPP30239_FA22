
const rose_height = 300,
    rose_width = 300,
    rose_margin = 10,
    innerRadius = rose_width/5,
    outerRadius = rose_width/2 - rose_margin,
    RadiusRange = outerRadius - innerRadius,
    labelRadius = outerRadius + 15;

const rose_svg = d3.select("#wind")
        .append("svg")
        .attr("viewBox", [0, 0, rose_width, rose_height])
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

var parseTime = d3.timeParse("%Y-%m-%d");
var formatMonth = d3.timeFormat("%b");
var fullCircle = 2 * Math.PI;

var x = d3.scaleTime()
    .range([0, fullCircle]);

var y = d3.scaleRadial()
    .range([innerRadius, outerRadius]);

var line = d3.lineRadial()
    .angle(d => x(d.datetime))
    .radius(d => y(d.windspeed))
    .curve(d3.curveBasis);

d3.csv("data/wind21.csv").then(data => {

    for (let d of data) {
        d.datetime = parseTime(d.datetime),
        d.windspeed = +d.windspeed;
    }
    
    x.domain(d3.extent(data, d => d.datetime));
    y.domain(d3.extent(data, d => d.windspeed));

    let g = rose_svg.append("g")
        .attr("transform", "translate(" + rose_width / 2 + "," + rose_height / 2 + ")");

    let yAxis = g.append("g")
        .attr("text-anchor", "middle");

    let yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5))
        .enter().append("g");
    
    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("opacity", 0.2)
        .attr("r", y);

    yAxis.append("circle")
      	.attr("fill", "none")
        .attr("stroke", "gray")
      	.attr("opacity", 0.2)
        .attr("r", function() { return y(y.domain()[0])});
    
    var labels = yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 5)
        .attr("stroke-linejoin", "round")
        .text(d => d);

    yAxis.append("circle")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("opacity", 0.5)
        .attr("r", function() { return y(y.domain()[0])});
  
    var labels = yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .attr("stroke-linejoin", "round")
        .text(d => d);

    yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .style("font-size", 8)
        .attr("opacity", 0.6)
        .text(d => d);

    var xAxis = g.append("g");

    var xTick = xAxis
        .selectAll("g")
        .data(x.ticks(12))
        .enter().append("g")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

    xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000");

    xTick.append("text")
        .attr("transform", function(d) { 
            var angle = x(d);
            return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
        .text(d => formatMonth(d))
      	.style("font-size", 6)
      	.attr("opacity", 0.6);

    g.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#2551ff");
    
    avg_windspeed = d3.mean(data, d => d.windspeed);
    
    avg_line = d3.lineRadial()
        .angle(d => x(d.datetime))
        .radius(y(avg_windspeed));

    g.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    g.append("path")
        .datum(data)
        .attr("d", avg_line)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .style("stroke-dasharray", ("3, 3"));

    var title = g.append("g")
        .attr("class", "title")
        .append("text")
        .attr("dy", "-0.2em")
        .attr("text-anchor", "middle")
        .style("font-size", 8)
        .text("Chicago Windspeed")

    var subtitle = g.append("text")
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.6)
        .style("font-size", 8)
        .text("year: 2021");

    console.log(data);

});