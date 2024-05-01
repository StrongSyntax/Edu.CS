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
        "Graph": {
            "entries": [
              {
                "name": "Emperor Penguin",
                "connections": [
                    {"name": "Seal", "strength": 10, "details": "Eaten -> Eater"}
                ]
              },
              {
                "name": "Seal",
                "connections": [
                    {"name": "Orca", "strength": 10, "details": "Eaten -> Eater"}
                ]
              },
              {
                "name": "Orca",
                "connections": [
                    {"name": "Blue Whale", "strength": 10, "details": "Eater -> Eaten"}
                ]
              },
              {
                "name": "Krill",
                "connections": [
                    {"name": "Blue Whale", "strength": 10, "details": "Eaten -> Eater"}
                ]
              },
              {
                "name": "Fish (Multiple Species)",
                "connections": [
                    {"name": "Blue Whale", "strength": 10, "details": "Eaten -> Eater"},
                    {"name": "Orca", "strength": 10, "details": "Eaten -> Eater"},
                    {"name": "Seal", "strength": 10, "details": "Eaten -> Eater"},
                    {"name": "Emperor Penguin", "strength": 10, "details": "Eaten -> Eater"},
                    {"name": "Krill", "strength": 10, "details": "Eater -> Eaten"}
                ]
              }
          ],
        }
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

document.addEventListener('DOMContentLoaded', function() {
  var svg = d3.select("#sociogram").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

  var g = svg.append("g");

  // Assuming your data structure remains the same, adjust as needed
  var nodes = []; // Define your nodes here
  var links = []; // Define your links here

  // Create and add new sections to the sidebar
  var sidebar = document.getElementById("sidebar");

  // Character Dropdowns
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

  // Update positions on each tick of the simulation
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
    .attr("stroke-opacity", 0.6);

  var node = g.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g");

  node.append("circle")
    .attr("r", 5);

  // Tooltip functionality
  var tooltip = d3.select("#tooltip");

  function showNodeTooltip(event, d) {
    // Extract personality information
    let personalityInfo = d.characterInfo || "Personality details not available";

    // Format connections information as list items
    let connectionsInfo = "<ul>" + d.connections.map(c => `<li>${c.name} (${c.details})</li>`).join('') + "</ul>";

    // Calculate the tooltip's top position
    let topPosition = event.pageY - 10;
    let tooltipHeight = tooltip.node().getBoundingClientRect().height;
    let windowHeight = window.innerHeight;

    if (topPosition + tooltipHeight > windowHeight) {
      topPosition = windowHeight - tooltipHeight - 10;
    }

    tooltip.html(`<strong>${d.id}</strong><br/>Personality: ${personalityInfo}<br/>Connections: ${connectionsInfo}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (topPosition) + "px")
      .style("visibility", "visible");
  }

  node.on("mouseover", showNodeTooltip)
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

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

  // Handle keydown events
  document.addEventListener('keydown', handleKeyDown);

  // Handle window resize
  window.addEventListener('resize', function() {
    var newWidth = window.innerWidth * 0.8;
    var newHeight = window.innerHeight;

    d3.select("#sociogram svg")
      .attr("width", newWidth)
      .attr("height", newHeight);
  });

  // Function to handle key down events
  function handleKeyDown(event) {
    var scale = d3.zoomTransform(svg.node()).k;
    var dx = 0,
      dy = 0,
      dz = 0;

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        dy = -50; // Adjust step size as needed
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
});

// also can you rename the functions and remove things like "Personality" and "Character" (I want this to be generalized so I can use if for many things.

// also please include the data for the nodes and links I provided