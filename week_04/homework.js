/* D3 Line Chart */

// set the constants for building the canvas for visualization
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });

    // basic structure
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

// load data and manipulate
d3.csv('long-term-interest-canada.csv').then(data => {

    let timeParse = d3.timeParse("%Y-%m");  // parse the formate of date to "Year - Month"
    
    for (let d of data) {
        d.Month = timeParse(d.Month);  // format the date
        d.Num = +d.Num;  // force the value of interest rate to be a numeric value
    }

    let x = d3.scaleTime()  // set x:
        .domain(d3.extent(data, d => d.Month))  // set the domain to be between the min and max of the date
        .range([margin.left + 30, width - margin.right]);  // build the x-axis

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Num)])  // set the domain to be between 0% and max of the interest
        .range([height - margin.bottom, margin.top]);  // build the y-axis
    
    console.log(data);
    
    // adding two axes
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)  // locate the axis 
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // set text style and add text
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    // build line visualization with two vectors x and y
    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num)) // line: an object to build visualization
        .curve(d3.curveBasis);
        // can use the curve function to smooth the curve
    
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "maroon");

  });

