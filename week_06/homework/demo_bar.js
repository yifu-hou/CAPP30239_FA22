// create bar chart for demography

const height = 300,
    width = 400,
    margin = ({ top: 25, right: 20, bottom: 50, left: 10 }),
    padding = 1,
    offset = d3.stackOffsetDiverging, // stack offset method
    order = d3.stackOrderNone, // stack order method
    colors = d3.schemeTableau10;

// const svg = d3.select("#bar")
//     .append("svg")
//     .attr("viewBox", [0, 0, width, height]);

d3.csv('race.csv').then(data => {

    for (let d of data) {
        d.Count = +d.Count; //force a number
    };

    data.sort((a, b) => b.Count - a.Count);

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)]).nice()
        .range([margin.left, width - margin.right - 10]);
    
    let y = d3.scaleBand()
        .domain(data.map(d => d.Race))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);
    
    // let z = d3.scaleBand()
    //     .domain(data.map(d => d.With_Gun))
    //     .padding(0.05);
    
    // const series = d3.stack()
    //     .keys(z.domain)
    //     .value(([, I], z) => X[I.get(z)])
    //     .order(order)
    //     .offset(offset)
    //   (d3.rollup(I, ([i]) => i, i => Y[i], i => Z[i]))
    //   .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));
 
    // const color = d3.scaleOrdinal(z.domain, colors);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "maroon")
        .attr("x", margin.left)
        .attr("width", d => x(d.Count))
        .attr("y", d => y(d.Race))
        .attr("height", y.bandwidth());
    
    bar.append('text') // add labels
        .text(d => d.cases)
        .attr('x', d => margin.left + x(d.Count) - 10)
        .attr('y', d => y(d.Race) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'white');

})


