const bar_height = 400,
      bar_width = 800,
      bar_margin = ({ top: 35, right: 30, bottom: 35, left: 50 }),
      xAxis_position = bar_margin.top + (bar_height - bar_margin.bottom - bar_margin.top)* (3/13);

const bar_svg = d3.select("#temp")
      .append("svg")
      .attr("viewBox", [0, 0, bar_width, bar_height]);

d3.csv("data/yearly_temp.csv").then(data => {

    var months = ["Jan","Feb","Mar","Apr","May","Jun",
              "Jul", "Aug","Sep","Oct","Nov","Dec"];

    let formatMonth = function(d) { 
        if (0 < d < 13) {
            return months[d-1];
        } else {
            return " ";
        }
    };

    for (let d of data) {
        d.diff = +d.diff;
    }

    let x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([bar_margin.left, bar_width - bar_margin.right])
        .padding(0);
    
    let y = d3.scaleLinear()
        .domain([-10, 3])
        .range([bar_height - bar_margin.bottom, bar_margin.top]);

    let bar = bar_svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
        
    bar.append("rect")
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth() - 10)
        .attr("y", d => y(Math.max(d.diff, 0)))
        .attr("height", d => Math.abs(y(d.diff) - y(0)))
        .attr("fill", d => d.diff > 0 ? "#ff6623" : "#64cceb")
        .style("margin-top", "10px");

    bar_svg.append("g")
        .attr("transform", `translate(0, 
            ${(xAxis_position)})`)
        .call(d3.axisBottom(x).tickFormat(d => formatMonth(d)).tickSize(0));
    
    bar_svg.append("g")
        .attr("transform", `translate(${bar_margin.left}, 0)`)
        .call(d3.axisLeft(y));

    bar_svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", bar_width - bar_margin.right)
        .attr("y", xAxis_position)
        .attr("dx", "0.3em")
        .attr("dy", "-0.5em") 
        .text("Month");

    bar_svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", bar_margin.left + 200)
        .attr("y", bar_margin.top)
        .attr("dx", "0.3em")
        .attr("dy", "-1em") 
        .text("Temperature (feelslike - actual) (F)");

    bar.append("text")
    .text(d => d.diff)
    .attr("x", d => x(d.month) + (x.bandwidth()/2) - 5)
    .attr("y", d => d.diff > 0 ? y(d.diff) - 10 : y(d.diff) + 15)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", "12px");

});