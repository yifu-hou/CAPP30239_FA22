const bar_height = 400,
      bar_width = 800,
      bar_margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

const bar_svg = d3.select("#temp")
      .append("svg")
      .attr("viewBox", [0, 0, bar_width, bar_height]);

d3.csv("data/yearly_temp.csv").then(data => {

    let x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([bar_margin.left, bar_width - bar_margin.right])
        .padding(0);
    
    let y = d3.scaleLinear()
        .domain([-10, 10])
        .range([bar_height - bar_margin.bottom, bar_margin.top]);

    bar_svg.append("g")
        .attr("transform", `translate(20, 195)`) // (0,${(bar_height - bar_margin.bottom)/2})
        .call(d3.axisBottom(x));
    
    bar_svg.append("g")
        .attr("transform", `translate(70, 0)`) // (${bar_margin.left},0)
        .call(d3.axisLeft(y));

    let bar = bar_svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "red")
        .attr("x", d => x(d.month)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.diff)) // y position attribute
        // .attr("y", d => Math.min(x(0), x(x[d])))
        .attr("height", d => y(d.diff)); // this height is the height attr on element
        // .attr("height", d => Math.abs(x(x[d]) - x(0)))

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