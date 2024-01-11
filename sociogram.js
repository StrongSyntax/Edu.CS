// Assuming D3.js is already included in your HTML

document.addEventListener('DOMContentLoaded', function() {
    // Your JSON data
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
    

    // Width and height for the SVG container
    var width = 960,
        height = 600;

    // Append SVG to the body for the graph
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Process data to fit D3.js requirements
    var nodes = data.people.map(function(person) {
        return { id: person.name };
    });

    var links = data.important_interactions.map(function(interaction) {
        return {
            source: interaction.between[0],
            target: interaction.between[1]
        };
    });

    // Initialize simulation
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw lines for links (interactions)
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line");

    // Draw circles for nodes (people)
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 5);

    // Drag functionality for nodes
    node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Update positions each tick
    simulation.on("tick", function() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });

    // Drag functions
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
