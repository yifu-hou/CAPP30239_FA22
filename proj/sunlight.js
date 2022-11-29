// This is a scatter plot for Chicago yearly solar energy
// Each dot represents a month
// The height of a dot represents the daytime of the month
// The size of a dot represents the aggregated solar energy in that month

let sc_height = 400,
    sc_width = 600,
    sc_margin = ({ top: 25, right: 30, bottom: 35, left: 40 });

const sc_svg = d3.select("#sun_scatter")   // select id = #chart and pin the d3
    .append("svg")
    .attr("viewBox", [0, 0, sc_width, sc_height]);

d3.csv('data/solar_data.csv').then(data => {
    let x = d3.scaleLinear()
      .domain([0, 13]) // d3.max(data, d => d.month)
      .range([sc_margin.left, sc_width - sc_margin.right]);
      
    let y = d3.scaleLinear()
      .domain([8, 20]) //.nice()
      .range([sc_height - sc_margin.bottom, sc_margin.top]);

    const dot_size = d => d.avg_solar_energy;
    
    let sizeScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.avg_solar_energy)]);

    sc_svg.append("g")
      .attr("transform", `translate(0,${sc_height - sc_margin.bottom})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x).tickFormat(d => d + "Month").tickSize(-sc_height + sc_margin.top + sc_margin.bottom))
    
    sc_svg.append("g")
      .attr("transform", `translate(${sc_margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSize(-sc_width + sc_margin.left + sc_margin.right))
  
    sc_svg.append("g")
      .attr("fill", "orange")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.month))
      .attr("cy", d => y(d.avg_daytime))
      .attr("r", d => sizeScale(dot_size(d)) * 15)
      .attr("opacity", 0.75);

    const tooltip = d3.select("body").append("div") 
      .attr("class", "svg-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");

    d3.selectAll("circle")
      .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "red");
        tooltip
          .style("visibility", "visible")
          .html(`Month: ${d.month}<br />Average Daytime: ${d.avg_daytime} hours<br />
          Average Solar Energy Received: ${d.avg_solar_energy} MJ/sqm`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill", "orange");
        tooltip.style("visibility", "hidden");
      })

// console.log(data);

})
