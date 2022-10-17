// Bar Chart for Library Visits (JS Script)

// Pt. 0 - LOAD IN DATA

d3.csv("lib.csv").then(data => {

    // Pt.1 - DATA PROCESSING

    for (let d of data) {
        d.num = +d.num;  // force variable num to be a number
        d.zip = +d.zip;  // force variable zip to be a number
    };

    // Pt.2 - "TYPE SETTING"

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });
    
    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);  // for resizing elements in browser

    let x = d3.scaleBand()
        .domain(data.map(d => d.branch))  // set data on x-axis. this should be an array
        .range([margin.left, width - margin.right])  // set pixels on the page
        .padding(0.1);

    let y = d3.scaleLinear()
        // set domain for numeric value, starting at 0 and using nice() to round up
        .domain([0, d3.max(data, d => d.num)]).nice()
        .range([height - margin.bottom, margin.top]);  // set range on y-axis, from top down


    // Pt. 3 - SET AXES FOR BAR CHART

    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y));
    
    // Pt. 4 - CREATE ELEMENTS ON THE BAR CHART

    // create bar groups for library data
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    // create rectangle for bar chart
    bar.append("rect")  // add rectangles to bar group
        .attr("fill", "maroon")  // style the bar chart
        .attr("x", d => x(d.branch))  // position x attribute on x axis
        .attr("width", x.bandwidth())  // create the width attribute, which is the bandwidth
        .attr("y", d => y(d.num))  //  position y attribute on y axis
        .attr("height", d => y(0) - y(d.num))  // height attribute on element
    
    // add text elements to bar chart
    bar.append("text")
        .text(d => d.num)
        .attr("x", d => x(d.branch) + (x.bandwidth()/2))  // add text on x axis and set (flexible) bandwidth
        .attr("y", d => y(d.num) + 15)  // add text on y axis and set (fixed) bandwidth
        .attr("text-anchor", "middle")  // text position
        .style("fill", "white")  // text style

});