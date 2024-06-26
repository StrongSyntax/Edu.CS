function createCharacterDropdown(character) {
  let dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  let button = document.createElement("button");
  button.textContent = character.id;
  button.className = "dropdown-btn"; // Style this as needed

  let dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.style.maxHeight = "0px"; // Ensure units are specified

  let personality = document.createElement("p");
  personality.textContent = "Personality: " + character.characterInfo;

  let connections = document.createElement("p");
  connections.innerHTML = "Connections:<ul>" + character.connections.map(c => `<li>${c.name} (${c.details})</li>`).join('') + "</ul>";

  dropdownContent.appendChild(personality);
  dropdownContent.appendChild(connections);

  dropdown.appendChild(button);
  dropdown.appendChild(dropdownContent);

  // Toggle dropdown content on click
  button.onclick = function() {
    let isClosed = dropdownContent.style.maxHeight === "0px";
    dropdownContent.style.maxHeight = isClosed ? dropdownContent.scrollHeight + "px" : "0px";
  };

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

function createItemWithIcon(item, iconFolderPath) {
  let typeToIconMap = {
      "Object": "Object_Icon.png", // Assuming you have an icon named "Object_Icon.png"
      "Shot": "Shot_Icon.png",
      "Transition": "Transition_Icon.png",
      "Sound": "Sound_Icon.png",
      "Editing": "Editing_Icon.png",
      "Camera Movement": "Camera_Movement_Icon.png",
      "Lighting": "Lighting_Icon.png",
      "Symbolism": "Symbolism_Icon.png",
      "Color Scheme": "Color_Pallete_Icon.png",
      "Scene": "Scene_Icon.png",
      // Add other mappings as necessary
  
  };

  let iconFileName = typeToIconMap[item.type];
  if (!iconFileName) {
      console.error("Icon not found for type:", item.type);
      return null;
  }
 
  let itemDiv = document.createElement('div');
  itemDiv.className = 'item-with-icon';

  let iconImg = document.createElement('img');
  iconImg.src = iconFolderPath + '/' + iconFileName; // Make sure path is correct
  iconImg.alt = item.type + ' Icon';
  iconImg.className = 'icon';
  iconImg.style.width = '128px'; // Set icon size
  iconImg.style.height = '128px';

  let textDiv = document.createElement('div');
  textDiv.className = 'text-next-to-icon';
  textDiv.innerHTML = `<strong>${item.name}</strong><p>${item.description}</p>`;

  itemDiv.appendChild(textDiv);
  itemDiv.appendChild(iconImg); // Icon to the right

  return itemDiv;
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
            "Mr. Kramer": "The first chair conductor, showcasing another facet of the musical institution and its impact on Andrew's journey.",
            "Andrew Neiman": "Starts as ambitious and naive, becomes more obsessive and resilient. His journey is marked by a relentless pursuit of perfection in his drumming, often at the cost of personal relationships and mental well-being.",
            "Terence Fletcher": "Remains consistently harsh and intimidating. A complex character who believes in pushing students to their limits to achieve greatness, showing a mixture of ruthlessness and motivational tactics."
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
          {"type": "Shot", "name": "Close-Up Shots", "description": "Used frequently to capture the intensity of characters' emotions, particularly during musical performances."},
          {"type": "Transition", "name": "Match Cuts", "description": "Seamlessly connects scenes to illustrate parallels or transitions in the story, often aligning with the rhythm of the music."},
          {"type": "Sound", "name": "Diegetic Sound", "description": "Includes actual sounds of instruments and environment, crucial for immersing the audience in the musical setting."},
          {"type": "Editing", "name": "Fast-paced Editing", "description": "Mirrors the tempo of jazz music and reflects the urgency and tension in the narrative."},
          {"type": "Camera Movement", "name": "Whip Pans", "description": "Quick camera movements that add to the dynamic and fast-paced nature of the film."},
          {"type": "Lighting", "name": "High Contrast Lighting", "description": "Creates dramatic shadows and highlights, emphasizing the emotional depth and conflict."},
          {"type": "Sound", "name": "Non-Diegetic Score", "description": "Jazz compositions that enhance the mood and underscore the thematic elements of the film."},
          {"type": "Symbolism", "name": "Visual Motifs", "description": "Recurring visual elements like drumsticks and blood which symbolize dedication and sacrifice."},
          {"type": "Color Scheme", "name": "Muted Color Palette", "description": "Reflects the serious and intense atmosphere of the music conservatory and the world of jazz."}
      ],
        "SymbolsAndImages": [
          {"type": "Object", "name": "Drum Sticks", "description": "Represent Andrew's passion for drumming and his relentless pursuit of perfection."},
          {"type": "Object", "name": "Blood on Drum Set", "description": "Symbolizes the physical and emotional toll of Andrew's quest for greatness."},
          {"type": "Object", "name": "Sheet Music", "description": "Represents the structure and rigor of the jazz music world, as well as the challenges Andrew faces."},
          {"type": "Scene", "name": "Solo Performance", "description": "Embodies Andrew's transformation and ultimate defiance against Fletcher's authority."},
          {"type": "Object", "name": "Metronome", "description": "Represents precision, timing, and the intense pressure of achieving rhythmic perfection."},
          {"type": "Scene", "name": "Car Accident", "description": "Illustrates the extreme lengths to which Andrew goes for his art, sacrificing his safety and well-being."},
          {"type": "Scene", "name": "Final Concert", "description": "A climax scene reflecting Andrew's breakthrough and Fletcher's complex character revelation."},
          {"type": "Object", "name": "Music Conservatory Setting", "description": "Represents the high-pressure environment where talent and ambition are both nurtured and tested."}
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
                        {"name": "Sean Casey", "strength": 3, "details": "Role Model"},
                        {"name": "Travis", "strength": 2, "details": "Fellow Band Member"},
                        {"name": "Dustin", "strength": 2, "details": "Fellow Band Member"},
                        {"name": "Uncle Frank", "strength": 1, "details": "Family Member"},
                        {"name": "Ryan Connolly", "strength": 3, "details": "Competitor"},
                        {"name": "Carl Tanner", "strength": 3, "details": "Competitor"}
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
                      {"name": "Andrew Neiman", "strength": 2, "details": "Fellow Band Member and Competitor"}
                  ]
              },
              {
                  "name": "Dustin",
                  "connections": [
                      {"name": "Terence Fletcher", "strength": 3, "details": "Student in Fletcher's band"},
                      {"name": "Andrew Neiman", "strength": 2, "details": "Fellow Band Member"}
                  ]
              },
              {
                  "name": "Uncle Frank",
                  "connections": [
                      {"name": "Andrew Neiman", "strength": 1, "details": "Family Member"}
                  ]
              },
              {
                  "name": "Mr. Kramer",
                  "connections": [
                      {"name": "Andrew Neiman", "strength": 2, "details": "Conductor at Conservatory"}
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
            {
              "between": ["Andrew Neiman", "Travis"],
              "description": "Competitive tension and subtle rivalry as fellow band members under Fletcher's direction."
          },
          {
              "between": ["Andrew Neiman", "Dustin"],
              "description": "Background interactions, reflecting the dynamics and competitiveness within the band."
          },
          {
              "between": ["Andrew Neiman", "Uncle Frank"],
              "description": "Conversations reflecting contrasting life views, highlighting the family's conventional expectations versus Andrew's musical ambition."
          },
          {
              "between": ["Andrew Neiman", "Mr. Kramer"],
              "description": "Interaction during a practice session, showcasing the pressures and expectations of the conservatory environment."
          },
          {
              "between": ["Terence Fletcher", "Travis"],
              "description": "Moments of Fletcher's teaching, reflecting his impact on different students, including Travis."
          },
          {
              "between": ["Terence Fletcher", "Dustin"],
              "description": "Scenes showing Fletcher's interactions with various band members, including Dustin, highlighting the intense pressure on all students."
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

    // Create and add new sections to the sidebar
    var sidebar = document.getElementById("sidebar");
    var iconFolderPath = 'assets/images/'; // Make sure this path is correct

    // Film Techniques Section with Icons
    let filmTechniquesSection = document.createElement("div");
    filmTechniquesSection.className = "sidebar-section";
    let filmTechniquesHeader = document.createElement("h3");
    filmTechniquesHeader.textContent = "Film Techniques";
    filmTechniquesSection.appendChild(filmTechniquesHeader);

    data.FilmTechniques.forEach(technique => {
        let itemElement = createItemWithIcon(technique, iconFolderPath);
        if (itemElement) {
            filmTechniquesSection.appendChild(itemElement);
        }
    });
    sidebar.appendChild(filmTechniquesSection);

    // Symbols and Images Section with Icons
    let symbolsAndImagesSection = document.createElement("div");
    symbolsAndImagesSection.className = "sidebar-section";
    let symbolsAndImagesHeader = document.createElement("h3");
    symbolsAndImagesHeader.textContent = "Symbols and Images";
    symbolsAndImagesSection.appendChild(symbolsAndImagesHeader);

    data.SymbolsAndImages.forEach(symbol => {
        let itemElement = createItemWithIcon(symbol, iconFolderPath);
        if (itemElement) {
            symbolsAndImagesSection.appendChild(itemElement);
        }
    });
    sidebar.appendChild(symbolsAndImagesSection);


    // Genre
    let genreContent = `<strong>Main Genre:</strong> ${data.Genre.MainGenre}<br><strong>Sub Genre:</strong> ${data.Genre.SubGenre}`;
    sidebar.appendChild(createSidebarSection("Genre", genreContent));

    // Colour Selection
    sidebar.appendChild(createSidebarSection("Colour Selection", data.ColorSelection));

    // Sound
    let soundContent = `<strong>Diegetic:</strong> ${data.Sound.Diegetic}<br><strong>Non-Diegetic:</strong> ${data.Sound.NonDiegetic}`;
    sidebar.appendChild(createSidebarSection("Sound", soundContent));

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

    var characterDropdowns = document.getElementById("characterDropdowns");
    
    if (!characterDropdowns) {
      console.error("The container for character dropdowns was not found.");
      return;
    }

    nodes.forEach(character => {
      var dropdown = createCharacterDropdown(character);
      characterDropdowns.appendChild(dropdown);
      console.log("Added dropdown for:", character.id); // This should log for each character
    });
  
    // Create sidebar sections with icons
function createSidebarSectionWithIcons(title, items, iconFolderPath) {
    let section = document.createElement("div");
    section.className = "sidebar-section";

    let header = document.createElement("h3");
    header.textContent = title;
    section.appendChild(header);

    items.forEach(item => {
        let itemWithIcon = createItemWithIcon(item, iconFolderPath);
        if (itemWithIcon) {
            section.appendChild(itemWithIcon);
        }
    });

    return section;
}

    var tooltip = d3.select("#tooltip");
  
    function showNodeTooltip(event, d) {
      // Extract personality information
      let personalityInfo = data.CharacterDevelopment.MainCharacters[d.id] || 
                            data.CharacterDevelopment.SupportingCharacters[d.id] || 
                            "Personality details not available";
    
      // Format connections information as list items
      let connectionsInfo = "<ul>" + d.connections.map(c => `<li>${c.name} (${c.details})</li>`).join('') + "</ul>";
    
      // Calculate the tooltip's top position
      let topPosition = event.pageY - 10;
      
      // Get the height of the tooltip
      let tooltipHeight = tooltip.node().getBoundingClientRect().height;
    
      // Get the window height
      let windowHeight = window.innerHeight;
    
      // Check if the tooltip goes offscreen and adjust its top position if necessary
      if (topPosition + tooltipHeight > windowHeight) {
        topPosition = windowHeight - tooltipHeight - 10; // Adjust to bring the tooltip above the cursor
      }
    
      tooltip.html(`<strong>${d.id}</strong><br/>Personality: ${personalityInfo}<br/>Connections: ${connectionsInfo}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (topPosition) + "px")
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