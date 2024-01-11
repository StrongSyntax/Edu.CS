// Assuming D3.js is already included in your HTML

document.addEventListener('DOMContentLoaded', function() {
    var width = 960, height = 600;

    var svg = d3.select("#sociogram").append("svg")
        .attr("width", width)
        .attr("height", height);

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
    
var nodes = data.Sociogram.people.map(function(d) { return {id: d.name}; });
    var links = data.Sociogram.important_interactions.map(function(d) { return {source: d.between[0], target: d.between[1], description: d.description}; });

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line");

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    // Hover effect for nodes
    node.append("title")
        .text(function(d) { return d.id; });

    // Hover effect for links
    link.append("title")
        .text(function(d) { return d.description; });
});

