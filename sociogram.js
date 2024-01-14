function createCharacterDropdown(character) {
  let dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  let button = document.createElement("button");
  button.textContent = character.id;

  let dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  let personality = document.createElement("p");
  personality.textContent = "Personality: " + character.characterInfo;

  let connections = document.createElement("p");
  connections.innerHTML = "Connections:<ul>" + character.connections.map(c => `<li>${c.name} (${c.details})</li>`).join('') + "</ul>";

  dropdownContent.appendChild(personality);
  dropdownContent.appendChild(connections);

  dropdown.appendChild(button);
  dropdown.appendChild(dropdownContent);

  return dropdown;
}

function createSidebarSection(title, content) {
  let section = document.createElement("div");
  section.className = "sidebar-section";

  let header = document.createElement("h3");
  header.textContent = title;

  let body = document.createElement("div");
  body.innerHTML = content;

  section.appendChild(header);
  section.appendChild(body);

  return section;
}

document.addEventListener('DOMContentLoaded', function() {
  var svg = d3.select("#sociogram").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

  var g = svg.append("g");

    var data = {
      "CharacterDevelopment": {
        "MainCharacters": {
            "AndrewNeiman": "Starts as ambitious and naive, becomes more obsessive and resilient. His journey is marked by a relentless pursuit of perfection in his drumming, often at the cost of personal relationships and mental well-being.",
            "TerenceFletcher": "Remains consistently harsh and intimidating. A complex character who believes in pushing students to their limits to achieve greatness, showing a mixture of ruthlessness and motivational tactics."
        },
        "SupportingCharacters": {
            "Nicole": "Represents Andrew's personal sacrifices for his music career. She is a symbol of the normal life and relationships that Andrew gives up for his ambition.",
            "Jim Neiman": "Andrew's father, supportive yet worried about Andrew's obsessive dedication to music. He represents the softer side of life that Andrew is moving away from.",
            "Ryan Connolly": "A talented drummer who competes with Andrew for the core spot. His character contrasts Andrew's, showing a different approach to dealing with pressure.",
            "Carl Tanner": "Another drummer who faces Fletcher's harsh methods. His character highlights the high-pressure environment of the music conservatory.",
            "Sean Casey": "A former student of Fletcher, revered by Andrew. His character adds depth to Fletcher's teaching impact and the competitive atmosphere in the music world.",
            "Travis": "Part of Fletcher's band, facing similar pressures as Andrew. His interactions reflect the competitiveness and tension among the students.",
            "Dustin": "Another student in Fletcher's band, often in the background but part of the overall dynamic within the group.",
            "Uncle Frank": "Andrew's uncle, representing the family's more conventional expectations and contrasting with Andrew's intense musical pursuit.",
            "Mr. Kramer": "The first chair conductor, showcasing another facet of the musical institution and its impact on Andrew's journey."
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
                },
                {
                  "name": "Travis",
                  "connections": [
                      {"name": "Terence Fletcher", "strength": 4, "details": "Student under Fletcher's tutelage"},
                      {"name": "Andrew Neiman", "strength": 3, "details": "Fellow Band Member and Competitor"}
                  ]
              },
              {
                  "name": "Dustin",
                  "connections": [
                      {"name": "Terence Fletcher", "strength": 4, "details": "Student in Fletcher's band"},
                      {"name": "Andrew Neiman", "strength": 2, "details": "Fellow Band Member"}
                  ]
              },
              {
                  "name": "Uncle Frank",
                  "connections": [
                      {"name": "Andrew Neiman", "strength": 2, "details": "Family Member, represents conventional path"}
                  ]
              },
              {
                  "name": "Mr. Kramer",
                  "connections": [
                      {"name": "Andrew Neiman", "strength": 3, "details": "First Chair Conductor, a figure in the music conservatory"}
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
            },
                  // Adding entries for new interactions
            {
                "between": ["Travis", "Andrew Neiman"],
                "description": "Competitive tension and interaction as fellow band members."
            },
            {
                "between": ["Dustin", "Andrew Neiman"],
                "description": "Background interactions reflecting band dynamics."
            },
            {
                "between": ["Uncle Frank", "Andrew Neiman"],
                "description": "Contrasting life views and expectations during family interactions."
            },
            {
                "between": ["Mr. Kramer", "Andrew Neiman"],
                "description": "Mr. Kramer's brief but impactful interactions with Andrew in the conservatory setting."
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

    var characterDropdowns = document.getElementById("characterDropdowns");
    nodes.forEach(character => {
        characterDropdowns.appendChild(createCharacterDropdown(character));
    });

    // Create and add new sections to the sidebar
    var sidebar = document.getElementById("sidebar");

    // Genre
    let genreContent = `<strong>Main Genre:</strong> ${data.Genre.MainGenre}<br><strong>Sub Genre:</strong> ${data.Genre.SubGenre}`;
    sidebar.appendChild(createSidebarSection("Genre", genreContent));

    // Colour Selection
    sidebar.appendChild(createSidebarSection("Colour Selection", data.ColorSelection));

    // Sound
    let soundContent = `<strong>Diegetic:</strong> ${data.Sound.Diegetic}<br><strong>Non-Diegetic:</strong> ${data.Sound.NonDiegetic}`;
    sidebar.appendChild(createSidebarSection("Sound", soundContent));

    // Film Techniques
    let filmTechniquesContent = data.FilmTechniques.map(tech => `<p>${tech.type}: ${tech.name}</p>`).join('');
    sidebar.appendChild(createSidebarSection("Film Techniques", filmTechniquesContent));

    // Symbols and Images
    let symbolsAndImagesContent = data.SymbolsAndImages.map(item => `<p>${item.type}: ${item.name}</p>`).join('');
    sidebar.appendChild(createSidebarSection("Symbols and Images", symbolsAndImagesContent));

    // Message
    sidebar.appendChild(createSidebarSection("Message", data.MainMessage));

  
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

