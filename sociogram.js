document.addEventListener('DOMContentLoaded', function() {
  var svg = d3.select("#sociogram").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

  var g = svg.append("g");

    var data = {
        "CharacterDevelopment": {
            "MainCharacters": {
                "AndrewNeiman": "Starts as ambitious and naive, becomes more obsessive and resilient.",
                "TerenceFletcher": "Remains consistently harsh, but shows depth and eventual respect for Andrew's talent."
            },
            "SupportingCharacters": {
                "Nicole": "Represents Andrew's personal sacrifices for his music career."
            }
        },
        "Genre": {
            "MainGenre": "Drama - Focus on personal and moral conflicts of a young musician.",
            "SubGenre": "Music - Revolves around a music conservatory and jazz drumming."
        },
        "ColorSelection": "Dark and muted palette with red highlights symbolizing power, passion, and danger, reflecting the film's intense atmosphere.",
        "Sound": {
            "Diegetic": "Drumming - Central to the film's theme, representing Andrew's journey and struggle.",
            "NonDiegetic": "Jazz Soundtrack - Sets the tone and mood, enhancing the emotional context."
        },
        "FilmTechniques": [
            {"type": "Shot", "name": "Close-Up Shots"},
            {"type": "Transition", "name": "Match Cuts"},
            {"type": "Sound", "name": "Digetic"}
        ],
        "SymbolsAndImages": [
            {"type": "Object", "name": "Drum Sticks"},
            {"type": "Example", "name": "Example"},
            {"type": "Example", "name": "Example"}
        ],
        "MainMessage": "The pursuit of greatness and the sacrifices it demands; explores the limits of mentorship and ambition.",
        "Sociogram": {
            "people": [
                {
                  "name": "Andrew Neiman",
                  "connections": [
                    {"name": "Terence Fletcher", "strength": 9, "details": "Student-Teacher Relationship"},
                    {"name": "Nicole", "strength": 4, "details": "Romantic Interest"},
                    {"name": "Jim Neiman", "strength": 6, "details": "Father"},
                    {"name": "Sean Casey", "strength": 3, "details": "Role Model"}
                  ]
                },
                {
                  "name": "Terence Fletcher",
                  "connections": [
                    {"name": "Andrew Neiman", "strength": 9, "details": "Teacher-Student Relationship"},
                    {"name": "Ryan Connolly", "strength": 5, "details": "Student"},
                    {"name": "Carl Tanner", "strength": 5, "details": "Student"},
                    {"name": "Sean Casey", "strength": 4, "details": "Former Student"}
                  ]
                },
                {
                  "name": "Nicole",
                  "connections": [
                    {"name": "Andrew Neiman", "strength": 4, "details": "Romantic Interest"}
                  ]
                },
                {
                  "name": "Jim Neiman",
                  "connections": [
                    {"name": "Andrew Neiman", "strength": 6, "details": "Son"}
                  ]
                },
                {
                  "name": "Ryan Connolly",
                  "connections": [
                    {"name": "Terence Fletcher", "strength": 5, "details": "Student"},
                    {"name": "Carl Tanner", "strength": 3, "details": "Fellow Student"}
                  ]
                },
                {
                  "name": "Carl Tanner",
                  "connections": [
                    {"name": "Terence Fletcher", "strength": 5, "details": "Student"},
                    {"name": "Ryan Connolly", "strength": 3, "details": "Fellow Student"}
                  ]
                },
                {
                  "name": "Sean Casey",
                  "connections": [
                    {"name": "Terence Fletcher", "strength": 4, "details": "Former Student"},
                    {"name": "Andrew Neiman", "strength": 3, "details": "Admirer"}
                  ]
                }
              ],
          "important_interactions": [
            {
              "between": ["Terence Fletcher", "Carl Tanner"],
              "description": "Fletcher berates Carl for being out of tune, demonstrating his harsh teaching style."
            },
            {
              "between": ["Andrew Neiman", "Carl Tanner"],
              "description": "Andrew replaces Carl as the core drummer, escalating the competitive atmosphere."
            },
            {
              "between": ["Andrew Neiman", "Terence Fletcher"],
              "description": "Fletcher tells Andrew he knows about his father's failed writing career, challenging Andrew's motivations."
            },
            {
              "between": ["Andrew Neiman", "Nicole"],
              "description": "Andrew breaks up with Nicole to focus on his career, highlighting his sacrifice for music."
            },
            {
              "between": ["Andrew Neiman", "Terence Fletcher"],
              "description": "Andrew confronts Fletcher in a bar, where Fletcher explains his philosophy of pushing students beyond their limits."
            },
            {
              "between": ["Terence Fletcher", "Studio Band"],
              "description": "Fletcher's emotional story about a former student, revealing a softer side to his character."
            },
            {
              "between": ["Andrew Neiman", "Terence Fletcher"],
              "description": "The scene where Andrew returns to the stage after being sabotaged by Fletcher, showing his resilience and determination."
            }
          ]
        }
    };
    
    var nodes = data.Sociogram.people.map(d => {
      return {
        id: d.name, 
        img: 'assets/images/' + d.name.replace(/\s/g, '') + '.png',
        connections: d.connections,
        characterInfo: data.CharacterDevelopment.MainCharacters[d.name] || data.CharacterDevelopment.SupportingCharacters[d.name] || "Info not available"
      };
    });
  
    var links = data.Sociogram.people.flatMap(d => {
      return d.connections.map(link => {
        return { 
          source: d.name, 
          target: link.name, 
          strength: link.strength, 
          details: link.details 
        };
      });
    });
  
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

    var link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .on("mouseover", showLinkTooltip)
        .on("mouseout", hideTooltip);

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
  
    // Function to show tooltip for nodes
    function showNodeTooltip(event, d) {
      // Extract personality information
      let personalityInfo = data.CharacterDevelopment.MainCharacters[d.id] || 
                            data.CharacterDevelopment.SupportingCharacters[d.id] || 
                            "Personality details not available";

      // Format connections information as list items
      let connectionsInfo = "<ul>" + d.connections.map(c => `<li>${c.name} (${c.details})</li>`).join('') + "</ul>";

      tooltip.html(`<strong>${d.id}</strong><br/>Personality: ${personalityInfo}<br/>Connections: ${connectionsInfo}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .style("visibility", "visible");
    }

    // Add tooltip functionality to nodes
    node.on("mouseover", showNodeTooltip)
      .on("mouseout", function() {
          tooltip.style("visibility", "hidden");
      });
  
    function showLinkTooltip(event, d) {
      tooltip.html(`Connection: ${d.source.id} - ${d.target.id}<br/>Strength: ${d.strength}<br/>Details: ${d.details}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .style("visibility", "visible");
    }

    // Function to hide tooltip
    function hideTooltip() {
      tooltip.style("visibility", "hidden");
    }

    node.on("mouseover", showNodeTooltip)
    .on("mouseout", hideTooltip);

    // Add tooltip functionality to links (if needed)
    link.on("mouseover", showLinkTooltip)
      .on("mouseout", hideTooltip);


    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    });

    // Zoom and pan functionality
    var zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom).on("dblclick.zoom", null);

    document.addEventListener('keydown', handleKeyDown);
});

    svg.call(zoom).on("dblclick.zoom", null);

    // Function to handle key down events
function handleKeyDown(event) {
  var scale = d3.zoomTransform(svg.node()).k;
  var dx = 0, dy = 0, dz = 0;

  switch(event.key) {
      case 'ArrowUp':
      case 'w':
          dy = -50;  // Adjust step size as needed
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

  // Apply translation or scaling based on key pressed
  svg.transition()
      .duration(100)
      .call(zoom.translateBy, dx / scale, dy / scale)
      .call(zoom.scaleBy, 1 + dz);
}

// Add event listener for keydown
document.addEventListener('keydown', handleKeyDown);

window.addEventListener('resize', function() {
  var newWidth = window.innerWidth * 0.8;
  var newHeight = window.innerHeight;

  d3.select("#sociogram svg")
      .attr("width", newWidth)
      .attr("height", newHeight);
  });

window.addEventListener('resize', function() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;

  svg.attr("width", newWidth)
     .attr("height", newHeight);
});

