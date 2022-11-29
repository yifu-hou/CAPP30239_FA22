const bar_height = 400,
      bar_width = 800,
      bar_margin = ({ top: 25, right: 30, bottom: 35, left: 50 }),
      xAxis_position = bar_margin.top + (bar_height - bar_margin.bottom - bar_margin.top)* (3/13);

const bar_svg = d3.select("#temp")
      .append("svg")
      .attr("viewBox", [0, 0, bar_width, bar_height]);

d3.csv("data/yearly_temp.csv").then(data => {

    let x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([bar_margin.left, bar_width - bar_margin.right])
        .padding(0);
    
    let y = d3.scaleLinear()
        .domain([-10, 3])
        .range([bar_height - bar_margin.bottom, bar_margin.top]);

    bar_svg.append("g")
        .attr("transform", `translate(0, 
            ${(xAxis_position)})`)
        .call(d3.axisBottom(x));
    
    bar_svg.append("g")
        .attr("transform", `translate(${bar_margin.left}, 0)`) // (${bar_margin.left},0)
        .call(d3.axisLeft(y));

    let bar = bar_svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        //.attr("fill", "maroon")
        .attr("x", d => x(d.month)) // x position attribute
        .attr("width", x.bandwidth() - 10) // this width is the width attr on the element
        .attr("y", d => y(Math.max(d.diff, 0))) // y position attribute
        .attr("height", d => Math.abs(y(d.diff) - y(0)))
        .attr("fill", d => d.diff > 0 ? "red" : "blue");

    // bar_svg
    //     .selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //       .attr("x", function(d, i) { return bar_margin.left + i * bar_width; })
    //       .attr("y", function(d, i) { return bar_height - Math.max(0, y(d));})
    //       .attr("height", function(d) { return Math.abs(y(d)); })
    //       .attr("width", bar_width)
    //       .style("fill", "grey")
	// 	  .style("stroke", "black")
	// 	  .style("stroke-width", "1px");

});