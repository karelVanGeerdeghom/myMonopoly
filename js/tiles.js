var aoTiles = [
    {
        id: 0,
        title: "Start",
        description: "Receive 200 when you pass \"GO\"",
        trains: [25, 50, 100, 200],
        utilities: [4, 10],
        bank: [12, 32]
    },
    {
        id: 1,
        title: "Mediterranean Avenue",
        price: 60,
        color: "purple",
        type: "street",
        groupid: 0,
        name: "Mediterranean Avenue",
        rent: [2, 10, 30, 90, 160, 250],
        cost: 50
    },
    {
        id: 2,
        title: "Community Chest",
        type: "chest",
        description: "Take a community chest card"
    },
    {
        id: 3,
        title: "Baltic Avenue",
        price: 60,
        color: "purple",
        type: "street",
        groupid: 0,
        name: "Baltic<br>Avenue",
        rent: [4, 20, 60, 180, 320, 450],
        cost: 50
    },
    {
        id: 4,
        title: "Income Tax",
        price: -200,
        type: "tax",
        name: "Income Tax",
        description: "Pay 200 in income tax"
    },
    {
        id: 5,
        title: "Reading Railroad",
        price: 200,
        type: "train",
        groupid: 8,
        name: "Reading Railroad"
    },
    {
        id: 6,
        title: "Oriental Avenue",
        price: 100,
        color: "lightblue",
        type: "street",
        groupid: 1,
        name: "Oriental<br>Avenue",
        rent: [6, 30, 90, 270, 400, 550],
        cost: 50
    },
    {
        id: 7,
        title: "Chance",
        type: "chance",
        description: "Take a chance card"
    },
    {
        id: 8,
        title: "Vermont Avenue",
        price: 100,
        color: "lightblue",
        type: "street",
        groupid: 1,
        name: "Vermont Avenue",
        rent: [6, 30, 90, 270, 400, 550],
        cost: 50
    },
    {
        id: 9,
        title: "Connecticut Avenue",
        price: 120,
        color: "lightblue",
        type: "street",
        groupid: 1,
        name: "Connecticut Avenue",
        rent: [8, 40, 100, 300, 450, 600],
        cost: 50
    },
    {
        id: 10,
        title: "Jail",
        fine: 50
    },
    {
        id: 11,
        title: "St. Charles Place",
        price: 140,
        color: "violet",
        type: "street",
        groupid: 2,
        name: "St. Charles<br>Place",
        rent: [10, 50, 150, 450, 625, 750],
        cost: 100
    },
    {
        id: 12,
        title: "Electric Company",
        price: 150,
        type: "utility",
        groupid: 9,
        utility: "electricity",
        name: "Electric Company"
    },
    {
        id: 13,
        title: "States Avenue",
        price: 140,
        color: "violet",
        type: "street",
        groupid: 2,
        name: "States<br>Avenue",
        rent: [10, 50, 150, 450, 625, 750],
        cost: 100
    },
    {
        id: 14,
        title: "Virginia Avenue",
        price: 160,
        color: "violet",
        type: "street",
        groupid: 2,
        name: "Virginia<br>Avenue",
        rent: [12, 60, 180, 500, 700, 900],
        cost: 100
    },
    {
        id: 15,
        title: "Pennsylvania Railroad",
        price: 200,
        type: "train",
        groupid: 8,
        name: "Pennsylvania<br>Railroad"
    },
    {
        id: 16,
        title: "St. James Place",
        price: 180,
        color: "orange",
        type: "street",
        groupid: 3,
        name: "St. James<br>Place",
        rent: [14, 70, 200, 550, 750, 950],
        cost: 100
    },
    {
        id: 17,
        title: "Community Chest",
        type: "chest",
        description: "Take a community chest card"
    },
    {
        id: 18,
        title: "Tennessee Avenue",
        price: 180,
        color: "orange",
        type: "street",
        groupid: 3,
        name: "Tennessee Avenue",
        rent: [14, 70, 200, 550, 750, 950],
        cost: 100
    },
    {
        id: 19,
        title: "New York Avenue",
        price: 200,
        color: "orange",
        type: "street",
        groupid: 3,
        name: "Connecticut Avenue",
        rent: [16, 80, 220, 600, 800, 1000],
        cost: 100
    },
    {
        id: 20,
        title: "Free Parking"
    },
    {
        id: 21,
        title: "Kentucky Avenue",
        price: 220,
        color: "red",
        type: "street",
        groupid: 4,
        name: "Kentucky Avenue",
        rent: [18, 90, 250, 700, 875, 1050],
        cost: 150
    },
    {
        id: 22,
        title: "Chance",
        type: "chance",
        description: "Take a chance card"
    },
    {
        id: 23,
        title: "Indiana Avenue",
        price: 220,
        color: "red",
        type: "street",
        groupid: 4,
        name: "Indiana<br>Avenue",
        rent: [18, 90, 250, 700, 875, 1050],
        cost: 150
    },
    {
        id: 24,
        title: "Illinois Avenue",
        price: 240,
        color: "red",
        type: "street",
        groupid: 4,
        name: "Illinois<br>Avenue",
        rent: [20, 100, 300, 750, 925, 1100],
        cost: 150
    },
    {
        id: 25,
        title: "B. & O. Railroad",
        price: 200,
        type: "train",
        groupid: 8,
        name: "B. & O.<br>Railroad"
    },
    {
        id: 26,
        title: "Atlantic Avenue",
        price: 260,
        color: "yellow",
        type: "street",
        groupid: 5,
        name: "Atlantic<br>Avenue",
        rent: [22, 110, 330, 800, 975, 1150],
        cost: 150
    },
    {
        id: 27,
        title: "Ventnor Avenue",
        price: 260,
        color: "yellow",
        type: "street",
        groupid: 5,
        name: "Ventnor<br>Avenue",
        rent: [22, 110, 330, 800, 975, 1150],
        cost: 150
    },
    {
        id: 28,
        title: "Water Company",
        price: 150,
        type: "utility",
        groupid: 9,
        utility: "water",
        name: "Water<br>Company"
    },
    {
        id: 29,
        title: "Marvin Gardens",
        price: 280,
        color: "yellow",
        type: "street",
        groupid: 5,
        name: "Marvin<br>Gardens",
        rent: [24, 120, 360, 850, 1025, 1200],
        cost: 150
    },
    {
        id: 30,
        title: "Go to Jail"
    },
    {
        id: 31,
        title: "Pacific Avenue",
        price: 300,
        color: "green",
        type: "street",
        groupid: 6,
        name: "Pacific<br>Avenue",
        rent: [26, 130, 390, 900, 1100, 1275],
        cost: 200
    },
    {
        id: 32,
        title: "North Carolina Avenue",
        price: 300,
        color: "green",
        type: "street",
        groupid: 6,
        name: "North Carolina<br>Avenue",
        rent: [26, 130, 390, 900, 1100, 1275],
        cost: 200
    },
    {
        id: 33,
        title: "Community Chest",
        type: "chest",
        description: "Take a community chest card"
    },
    {
        id: 34,
        title: "Pennsylvania Avenue",
        price: 320,
        color: "green",
        type: "street",
        groupid: 6,
        name: "Pennsylvania<br>Avenue",
        rent: [28, 150, 450, 1000, 1200, 1400],
        cost: 200
    },
    {
        id: 35,
        title: "Short Line",
        price: 200,
        type: "train",
        groupid: 8,
        name: "Short<br>Line"
    },
    {
        id: 36,
        title: "Chance",
        type: "chance",
        description: "Take a chance card"
    },
    {
        id: 37,
        title: "Park Place",
        price: 350,
        color: "blue",
        type: "street",
        groupid: 7,
        name: "Park<br>Place",
        rent: [35, 175, 500, 1100, 1300, 1500],
        cost: 200
    },
    {
        id: 38,
        title: "Luxury Tax",
        price: -100,
        type: "luxury",
        name: "Luxury Tax",
        description: "Pay 100 in luxury tax"
    },
    {
        id: 39,
        title: "Boardwalk",
        price: 400,
        color: "blue",
        type: "street",
        groupid: 7,
        name: "Boardwalk",
        rent: [50, 200, 600, 1400, 1700, 2000],
        cost: 200
    }
];