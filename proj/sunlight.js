// This is a scatter plot for Chicago yearly solar energy
// Each dot represents a month
// The height of a dot represents the daytime of the month
// The size of a dot represents the aggregated solar energy in that month

let sc_height = 400,
    sc_width = 800,
    sc_margin = ({ top: 50, right: 20, bottom: 30, left: 40 });

const sc_svg = d3.select("#sun_scatter")   // select id = #chart and pin the d3
    .append("svg")
    .attr("viewBox", [0, 0, sc_width, sc_height]);

d3.csv('data/solar_data.csv').then(data => {

    let parsetime = d3.timeParse("%m");

    // This is a helper function to convert
    // integers as character month names
    for (let d of data) {
        d.datetime = parsetime(d.datetime);
    }

    var months = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul", "Aug","Sep","Oct","Nov","Dec"];

    let formatMonth = function(d) { 
        if (0 < d < 13) {
            return months[d-1];
        } else {
            return " ";
        }
    };

    let x = d3.scaleTime()
        .domain([0, 13])
        .range([sc_margin.left, sc_width - sc_margin.right]);

    let y = d3.scaleLinear()
        .domain([8, 17])
        .range([sc_height - sc_margin.bottom, sc_margin.top]);

    const dot_size = d => d.avg_solar_energy;
    
    let sizeScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avg_solar_energy)]);

    sc_svg.append("g")
        .attr("transform", `translate(0,${sc_height - sc_margin.bottom})`)
        .attr("class", "x-axis")
        .call(d3.axisBottom(x)
            .tickFormat(d => formatMonth(d))
            .tickSize(-sc_height + sc_margin.top + sc_margin.bottom))
        .style("font-size", "16px");
        
    sc_svg.append("g")
        .attr("transform", `translate(${sc_margin.left},0)`)
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).tickSize(-sc_width + sc_margin.left + sc_margin.right))
        .style("font-size", "12px");
    
    sc_svg.append("g")
        .attr("fill", "orange")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.month))
        .attr("cy", d => y(d.avg_daytime))
        .attr("r", d => sizeScale(dot_size(d)) * 20)
        .attr("opacity", 0.75);

    sc_svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", sc_width - sc_margin.right)
        .attr("y", sc_height)
        .attr("dx", "1em")
        .attr("dy", "-0.5em") 
        .text("Month");

    sc_svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", sc_margin.left)
        .attr("y", sc_margin.top)
        .attr("dx", "7em")
        .attr("dy", "-1em") 
        .text("Average Daytime (hr)");

    const sunlight_tooltip = d3.select("body")
        .append("div")
        .attr("class", "svg-tooltip")
        .style("opacity", 0.7)
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "white")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px");

    d3.select("#pt2").selectAll("circle")
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "red");
            sunlight_tooltip
            .style("visibility", "visible")
            .html(`${formatMonth(d.month)}<br />average daytime: ${d.avg_daytime} hours<br />
                    average solar energy received: ${d.avg_solar_energy} MJ/sqm`);
        })

        .on("mousemove", function(event) {
            sunlight_tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })

        .on("mouseout", function() {
            d3.select(this).attr("fill", "orange");
            sunlight_tooltip.style("visibility", "hidden");
        })

})
