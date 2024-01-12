document.addEventListener('DOMContentLoaded', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var svg = d3.select("#sociogram").append("svg")
      .attr("width", width)
      .attr("height", height);

  var g = svg.append("g");

  // ... (Your data initialization remains the same)

  var nodes = data.Sociogram.people.map(d => ({ id: d.name, img: 'assets/images/' + d.name.replace(/\s/g, '') + '.png' }));
  var links = data.Sociogram.people.flatMap(d => d.connections.map(link => ({ source: d.name, target: link.name })));

  var simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

  var link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line");

  var node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g");

  node.append("image")
      .attr("xlink:href", d => d.img)
      .attr("x", -16)
      .attr("y", -16)
      .attr("width", 32)
      .attr("height", 32)
      .on("error", function() { d3.select(this).remove(); });

  var tooltip = d3.select("#tooltip");

  function showTooltip(d) {
      tooltip.style("visibility", "visible")
             .html("Name: " + d.id)  // You can add additional information here
             .style("top", (d3.pointer(event)[1] + 10) + "px")
             .style("left", (d3.pointer(event)[0] + 10) + "px");
  }

  function hideTooltip() {
      tooltip.style("visibility", "hidden");
  }

  node.on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);

  link.on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);

  simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x}, ${d.y})`);
  });

  var zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
          g.attr('transform', event.transform);
      });

  svg.call(zoom).on("dblclick.zoom", null);

  document.addEventListener('keydown', function(event) {
      var scale = d3.zoomTransform(svg.node()).k;
      var dx = 0, dy = 0, dz = 0;

      switch(event.key) {
          case 'ArrowUp':
          case 'w':
              dy = -50;
              break;
          case 'ArrowDown':
          case 's':
              dy = 50;
              break;
          case 'ArrowLeft':
          case 'a':
              dx = -50;
              break;
          case 'ArrowRight':
          case 'd':
              dx = 50;
              break;
          case '+':
              dz = 0.1;
              break;
          case '-':
              dz = -0.1;
              break;
      }

      svg.transition()
          .duration(100)
          .call(zoom.translateBy, dx / scale, dy / scale)
          .call(zoom.scaleBy, 1 + dz);
  });

  window.addEventListener('resize', function() {
      var newWidth = window.innerWidth;
      var newHeight = window.innerHeight;

      svg.attr("width", newWidth)
         .attr("height", newHeight);

      simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(1).restart();
  });
});
