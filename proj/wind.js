let rose_height = 300,
    rose_width = 300,
    rose_margin = 10,
    innerRadius = rose_width/5,
    outerRadius = rose_width/2 - rose_margin;

const rose_svg = d3.select("#wind")
    .append("svg")
    .attr("viewBox", [0, 0, rose_width, rose_height])
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

d3.csv("data/jan_wind.csv").then(data => {

    let x = d3.scaleUtc()
        .domain(data.map(d => d.direction))
        .range([0, 2 * Math.PI])

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.maxmax)])
        .range([innerRadius, outerRadius])
    

    rose_svg.append("g")
        .call(
            g => g.selectAll("g")
                .data(x.ticks())
                .join("g")
        );

    // rose_svg.append("path")
    //     .attr("fill", "lightsteelblue")
    //     .attr("fill-opacity", 0.2)
    //     .attr("d", area
    //         .innerRadius(d => y(0))
    //         .outerRadius(d => y(d.agg_windspeed))
    //     (data));


});