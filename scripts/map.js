// Federal Poly Nekede coordinates (more accurate)
const fedPolyNekede = {
    lat: 5.4761,
    lng: 7.0254
};

// Campus boundary coordinates (approximate)
const campusBoundary = [
    [5.4775, 7.0235],
    [5.4775, 7.0274],
    [5.4747, 7.0274],
    [5.4747, 7.0235],
    [5.4775, 7.0235]
];

// Points of interest with detailed landmarks
const pointsOfInterest = [
    {
        name: "Main Gate",
        coords: [5.4775, 7.0254],
        description: "Main entrance to Federal Polytechnic Nekede",
        category: "entrance"
    },
    {
        name: "Administrative Block",
        coords: [5.4765, 7.0260],
        description: "Central administrative building",
        category: "admin"
    },
    {
        name: "School Library",
        coords: [5.4760, 7.0257],
        description: "Main library complex",
        category: "academic"
    },
    {
        name: "School of Engineering",
        coords: [5.4763, 7.0265],
        description: "Engineering departments and laboratories",
        category: "academic"
    },
    {
        name: "ICT Center",
        coords: [5.4758, 7.0262],
        description: "Information and Communication Technology Hub",
        category: "academic"
    },
    {
        name: "Sports Complex",
        coords: [5.4755, 7.0250],
        description: "Sports facilities and field",
        category: "recreation"
    },
    {
        name: "Student Center",
        coords: [5.4762, 7.0248],
        description: "Student activities and services",
        category: "service"
    },
    {
        name: "School Clinic",
        coords: [5.4768, 7.0245],
        description: "Medical services for students and staff",
        category: "health"
    },
    {
        name: "Cafeteria",
        coords: [5.4757, 7.0255],
        description: "Main student dining facility",
        category: "service"
    },
    {
        name: "Parking Lot A",
        coords: [5.4770, 7.0252],
        description: "Main parking area",
        category: "parking"
    }
];

// Initialize the map with more controls
const map = L.map('map', {
    center: [fedPolyNekede.lat, fedPolyNekede.lng],
    zoom: 16,
    zoomControl: false, // We'll add a custom zoom control
    maxZoom: 19
});

// Define multiple map styles
const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/cache/WorldImagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
});

const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
});

const transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=your-api-key', {
    attribution: '&copy; OpenStreetMap contributors, &copy; Thunderforest'
});

// Add layer control with all map styles
const baseMaps = {
    "Standard Streets": streets,
    "Satellite View": satellite,
    "Terrain View": terrain,
    "Dark Mode": dark,
    "Transport Map": transport
};
L.control.layers(baseMaps).addTo(map);

// Add scale control
L.control.scale({
    imperial: false,
    metric: true
}).addTo(map);

// Add campus boundary
const polygon = L.polygon(campusBoundary, {
    color: 'blue',
    weight: 2,
    fillColor: '#3388ff',
    fillOpacity: 0.1
}).addTo(map);

// Add main marker for Federal Poly Nekede
const mainMarker = L.marker([fedPolyNekede.lat, fedPolyNekede.lng])
    .addTo(map)
    .bindPopup(`
        <strong>Federal Polytechnic Nekede</strong><br>
        <em>Center of Excellence in Technology</em><br>
        Nekede, Owerri West<br>
        Imo State, Nigeria<br>
        <br>
        <strong>Features:</strong><br>
        • Quality Technical Education<br>
        • Modern Facilities<br>
        • Experienced Faculty<br>
        • Industry Partnerships
    `).openPopup();

// Add markers for points of interest
pointsOfInterest.forEach(poi => {
    L.marker(poi.coords)
        .addTo(map)
        .bindPopup(`
            <strong>${poi.name}</strong><br>
            ${poi.description}
        `);
});
