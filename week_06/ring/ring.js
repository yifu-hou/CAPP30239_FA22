d3.json('budget-2022.json').then((data) => {
  const height = 400,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

  const arcs = d3.pie().value(d => d.amount)(data);  // similar to d3.bin, make individual pieces of the pie
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")  // line 20 - 22 : making white seperaters between each arcs 
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)  // data join
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i])  // color scheme of 10 colors picked by d3 
    .attr("d", arc);

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .selectAll("tspan")
    .data(d => {
      return [d.data.category, d.data.amount];
    })
    .join("tspan")  // a break in the line
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
});