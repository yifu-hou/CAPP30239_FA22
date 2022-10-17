/* barchart for covid country cases */

d3.csv("covid.csv").then(data => {
    
    /* LOAD DATA*/
    
    for (let d of data) {
        d.cases = +d.cases;   // force a number
    };

    const height = 400,
          width = 800,
          margin = ({ top:25, right: 30, bottom: 35, left: 50 });

    /*SET UP*/

    /*This is a function chain*/
    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); /*viewBox: a holder that dinamically expands and shrinks*/

    /*specific scale for barcharts*/ 

    /*This is a function chain*/
    let x = d3.scaleBand()
        .domain(data.map(d => d.country))  // domain: the data, should be an array
        .range([margin.left, width - margin.right])  // range: the scale
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice()   // round up the value
        .range([height - margin.bottom, margin.top]);
    
    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(g => g.select(".domain").remove());    // .call: automatically run a function
    
    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(g => g.select(".domain").remove());    // .call: automatically run a function

    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")   // select all .bar class
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")   // append a rectangle
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))   // position
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))   // position
        .attr("height", d => y(0) - y(d.cases));
})

/*
load the data, then use a function on the data
d3 reads csv as strings
Line 5: force a number from a string / case 
*/

/*
        SAME AS:

        const xAxis function(g) {
            .call(d3.axisLeft(y))
        }
*/
