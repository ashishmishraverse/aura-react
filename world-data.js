// Minimal but representative dataset. Extend as needed.
// Structure: continents -> countries -> states (optional) -> cities

const WORLD_DATA = [
  {
    code: "AF",
    name: "Africa",
    countries: [
      {
        code: "NG",
        name: "Nigeria",
        states: [
          { code: "LA", name: "Lagos", cities: ["Ikeja", "Epe", "Badagry", "Lekki"] },
          { code: "FC", name: "FCT", cities: ["Abuja"] }
        ]
      },
      {
        code: "ZA",
        name: "South Africa",
        states: [
          { code: "WC", name: "Western Cape", cities: ["Cape Town", "Stellenbosch"] },
          { code: "GP", name: "Gauteng", cities: ["Johannesburg", "Pretoria"] }
        ]
      }
    ]
  },
  {
    code: "AS",
    name: "Asia",
    countries: [
      {
        code: "IN",
        name: "India",
        states: [
          { code: "MH", name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
          { code: "KA", name: "Karnataka", cities: ["Bengaluru", "Mysuru"] }
        ]
      },
      {
        code: "JP",
        name: "Japan",
        states: [
          { code: "13", name: "Tokyo", cities: ["Chiyoda", "Shinjuku", "Shibuya"] },
          { code: "27", name: "Osaka", cities: ["Osaka", "Sakai"] }
        ]
      }
    ]
  },
  {
    code: "EU",
    name: "Europe",
    countries: [
      {
        code: "DE",
        name: "Germany",
        states: [
          { code: "BY", name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg"] },
          { code: "BE", name: "Berlin", cities: ["Berlin"] }
        ]
      },
      {
        code: "FR",
        name: "France",
        states: [
          { code: "IDF", name: "Île-de-France", cities: ["Paris", "Versailles"] },
          { code: "ARA", name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble"] }
        ]
      }
    ]
  },
  {
    code: "NA",
    name: "North America",
    countries: [
      {
        code: "US",
        name: "United States",
        states: [
          { code: "CA", name: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
          { code: "NY", name: "New York", cities: ["New York City", "Buffalo", "Rochester"] }
        ]
      },
      {
        code: "CA",
        name: "Canada",
        states: [
          { code: "ON", name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton"] },
          { code: "BC", name: "British Columbia", cities: ["Vancouver", "Victoria", "Kelowna"] }
        ]
      },
      {
        code: "MX",
        name: "Mexico",
        states: [
          { code: "CMX", name: "Mexico City", cities: ["Mexico City"] },
          { code: "JAL", name: "Jalisco", cities: ["Guadalajara", "Puerto Vallarta"] }
        ]
      }
    ]
  },
  {
    code: "SA",
    name: "South America",
    countries: [
      {
        code: "BR",
        name: "Brazil",
        states: [
          { code: "SP", name: "São Paulo", cities: ["São Paulo", "Campinas"] },
          { code: "RJ", name: "Rio de Janeiro", cities: ["Rio de Janeiro", "Niterói"] }
        ]
      },
      {
        code: "AR",
        name: "Argentina",
        states: [
          { code: "C", name: "Buenos Aires", cities: ["Buenos Aires", "La Plata"] },
          { code: "M", name: "Mendoza", cities: ["Mendoza", "San Rafael"] }
        ]
      }
    ]
  },
  {
    code: "OC",
    name: "Oceania",
    countries: [
      {
        code: "AU",
        name: "Australia",
        states: [
          { code: "NSW", name: "New South Wales", cities: ["Sydney", "Newcastle"] },
          { code: "VIC", name: "Victoria", cities: ["Melbourne", "Geelong"] }
        ]
      },
      {
        code: "NZ",
        name: "New Zealand",
        states: [
          { code: "AUK", name: "Auckland", cities: ["Auckland", "Manukau"] },
          { code: "CAN", name: "Canterbury", cities: ["Christchurch"] }
        ]
      }
    ]
  },
  {
    code: "AN",
    name: "Antarctica",
    countries: [
      { code: "AQ", name: "Antarctica", states: [] }
    ]
  }
];

if (typeof module !== "undefined") {
  module.exports = { WORLD_DATA };
}