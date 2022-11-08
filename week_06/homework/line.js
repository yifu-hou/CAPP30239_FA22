
const height_line = 300,
    width_line = 400,
    margin_line = ({ top: 25, right: 20, bottom: 40, left: 30 });
    
const svg_line = d3.select("#line")
    .append("svg_line")
    .attr("viewBox", [0, 0, width_line, height_line]);

d3.csv('monthly.csv').then(data => {

    let timeParse = d3.timeParse("%Y-%m");  // parse the formate of date
    
    for (let d of data) {
        d.Date = timeParse(d.Date);
        d.Value = +d.Value;
    }

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date))  // d3.extent: get the min and max of the data
        .range([margin_line.left, width_line - margin_line.right - 20]);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Value)])
        .range([height_line - margin_line.bottom, margin_line.top]);  // remember: building from top 
    
    console.log(data);
    
    svg_line.append("g")
      .attr("transform", `translate(${margin_line.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d).tickSize(-width_line));

    svg_line.append("g")
      .attr("transform", `translate(0,${height_line - margin_line.bottom})`)  // locate the axis 
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // svg_line.append("text")
    //   .attr("class", "x-label")
    //   .attr("text-anchor", "end")
    //   .attr("x", width_line - margin_line.right)
    //   .attr("y", height_line)
    //   .attr("dx", "0.5em")
    //   .attr("dy", "-0.5em") 
    //   .text("Month");
    
    // svg_line.append("text")
    //   .attr("class", "y-label")
    //   .attr("text-anchor", "end")
    //   .attr("y");

    let line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Value))
        .curve(d3.curveBasis);
    
    svg_line.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");


  });
