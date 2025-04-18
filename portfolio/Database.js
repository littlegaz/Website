// Initialize the database

let db;

let SQL;

 

// Current filter state

let currentFilters = {

    continent: "",

    population: "all"

};

 

// Load the SQL.js library

initSqlJs({

  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`

}).then(function(sql) {

    SQL = sql;

   

    // Check if we have a saved database

    if (localStorage.getItem('countriesDB')) {

        // Load the database from localStorage

        const dbData = localStorage.getItem('countriesDB');

        const uint8Array = new Uint8Array(JSON.parse(dbData));

        db = new SQL.Database(uint8Array);

        console.log("Database loaded from localStorage");

    } else {

        // Create a new database

        db = new SQL.Database();

       

        // Create the countries table

        db.run(`

            CREATE TABLE IF NOT EXISTS countries (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                name TEXT NOT NULL,

                capital TEXT NOT NULL,

                population INTEGER NOT NULL,

                continent TEXT NOT NULL

            )

        `);

       

        // Add initial countries

        const initialCountries = [

            ['United States', 'Washington D.C.', 331000000, 'North America'],

            ['Japan', 'Tokyo', 126000000, 'Asia'],

            ['France', 'Paris', 67000000, 'Europe'],

            ['Brazil', 'Brasília', 212000000, 'South America'],

            ['Nigeria', 'Abuja', 206000000, 'Africa'],

            ['Australia', 'Canberra', 25000000, 'Oceania'],

 

        ];

       

        initialCountries.forEach(country => {

            db.run(

                "INSERT INTO countries (name, capital, population, continent) VALUES (?, ?, ?, ?)",

                country

            );

        });

 

        // Add additional countries

        const additionalCountries = [

            ['China', 'Beijing', 1444216107, 'Asia'],

    ['India', 'New Delhi', 1393409038, 'Asia'],

    ['Indonesia', 'Jakarta', 276361783, 'Asia'],

    ['Pakistan', 'Islamabad', 225199937, 'Asia'],

    ['Bangladesh', 'Dhaka', 166303498, 'Asia'],

    ['Philippines', 'Manila', 109581078, 'Asia'],

    ['Vietnam', 'Hanoi', 97338579, 'Asia'],

    ['Turkey', 'Ankara', 84339067, 'Asia'],

    ['Iran', 'Tehran', 83992949, 'Asia'],

    ['Thailand', 'Bangkok', 69799978, 'Asia'],

    ['Myanmar', 'Naypyidaw', 54409800, 'Asia'],

    ['South Korea', 'Seoul', 51269185, 'Asia'],

    ['Iraq', 'Baghdad', 40222493, 'Asia'],

    ['Afghanistan', 'Kabul', 38928346, 'Asia'],

    ['Saudi Arabia', 'Riyadh', 34813871, 'Asia'],

    ['Uzbekistan', 'Tashkent', 33469203, 'Asia'],

    ['Malaysia', 'Kuala Lumpur', 32365999, 'Asia'],

    ['Yemen', 'Sana\'a', 29825964, 'Asia'],

    ['Nepal', 'Kathmandu', 29136808, 'Asia'],

    ['North Korea', 'Pyongyang', 25778816, 'Asia'],

    ['Taiwan', 'Taipei', 23816775, 'Asia'],

    ['Sri Lanka', 'Colombo', 21413249, 'Asia'],

    ['Kazakhstan', 'Nur-Sultan', 18776707, 'Asia'],

    ['Syria', 'Damascus', 17500658, 'Asia'],

    ['Cambodia', 'Phnom Penh', 16718965, 'Asia'],

    ['Jordan', 'Amman', 10203134, 'Asia'],

    ['Azerbaijan', 'Baku', 10139177, 'Asia'],

    ['United Arab Emirates', 'Abu Dhabi', 9890402, 'Asia'],

    ['Tajikistan', 'Dushanbe', 9537645, 'Asia'],

    ['Israel', 'Jerusalem', 8655535, 'Asia'],

    ['Hong Kong', 'Hong Kong', 7496981, 'Asia'],

    ['Laos', 'Vientiane', 7275560, 'Asia'],

    ['Lebanon', 'Beirut', 6825445, 'Asia'],

    ['Kyrgyzstan', 'Bishkek', 6524195, 'Asia'],

    ['Turkmenistan', 'Ashgabat', 6031200, 'Asia'],

    ['Singapore', 'Singapore', 5850342, 'Asia'],

    ['Oman', 'Muscat', 5106626, 'Asia'],

    ['Palestine', 'Ramallah', 5101414, 'Asia'],

    ['Kuwait', 'Kuwait City', 4270571, 'Asia'],

    ['Georgia', 'Tbilisi', 3989167, 'Asia'],

    ['Mongolia', 'Ulaanbaatar', 3278290, 'Asia'],

    ['Armenia', 'Yerevan', 2963243, 'Asia'],

    ['Qatar', 'Doha', 2881053, 'Asia'],

    ['Bahrain', 'Manama', 1701575, 'Asia'],

    ['Timor-Leste', 'Dili', 1318445, 'Asia'],

    ['Cyprus', 'Nicosia', 1207359, 'Asia'],

    ['Bhutan', 'Thimphu', 771608, 'Asia'],

    ['Macau', 'Macau', 649335, 'Asia'],

    ['Maldives', 'Malé', 540542, 'Asia'],

    ['Brunei', 'Bandar Seri Begawan', 437483, 'Asia'],

    ['Ethiopia', 'Addis Ababa', 114963588, 'Africa'],

    ['Egypt', 'Cairo', 102334404, 'Africa'],

    ['DR Congo', 'Kinshasa', 89561403, 'Africa'],

    ['Tanzania', 'Dodoma', 59734218, 'Africa'],

    ['South Africa', 'Pretoria', 59308690, 'Africa'],

    ['Kenya', 'Nairobi', 53771296, 'Africa'],

    ['Uganda', 'Kampala', 45741007, 'Africa'],

    ['Algeria', 'Algiers', 43851044, 'Africa'],

    ['Sudan', 'Khartoum', 43849260, 'Africa'],

    ['Morocco', 'Rabat', 36910560, 'Africa'],

    ['Angola', 'Luanda', 32866272, 'Africa'],

    ['Mozambique', 'Maputo', 31255435, 'Africa'],

    ['Ghana', 'Accra', 31072940, 'Africa'],

    ['Madagascar', 'Antananarivo', 27691018, 'Africa'],

    ['Cameroon', 'Yaoundé', 26545863, 'Africa'],

    ['Ivory Coast', 'Yamoussoukro', 26378274, 'Africa'],

    ['Niger', 'Niamey', 24206644, 'Africa'],

    ['Burkina Faso', 'Ouagadougou', 20903273, 'Africa'],

    ['Mali', 'Bamako', 20250833, 'Africa'],

    ['Malawi', 'Lilongwe', 19129952, 'Africa'],

    ['Zambia', 'Lusaka', 18383955, 'Africa'],

    ['Senegal', 'Dakar', 16743927, 'Africa'],

    ['Chad', 'N\'Djamena', 16425864, 'Africa'],

    ['Somalia', 'Mogadishu', 15893222, 'Africa'],

    ['Zimbabwe', 'Harare', 14862924, 'Africa'],

    ['Guinea', 'Conakry', 13132795, 'Africa'],

    ['Rwanda', 'Kigali', 12952218, 'Africa'],

    ['Benin', 'Porto-Novo', 12123200, 'Africa'],

    ['Burundi', 'Gitega', 11890784, 'Africa'],

    ['Tunisia', 'Tunis', 11818619, 'Africa'],

    ['South Sudan', 'Juba', 11193725, 'Africa'],

    ['Togo', 'Lomé', 8278724, 'Africa'],

    ['Sierra Leone', 'Freetown', 7976983, 'Africa'],

    ['Libya', 'Tripoli', 6871292, 'Africa'],

    ['Liberia', 'Monrovia', 5057681, 'Africa'],

    ['Central African Republic', 'Bangui', 4829767, 'Africa'],

    ['Mauritania', 'Nouakchott', 4649658, 'Africa'],

    ['Eritrea', 'Asmara', 3546421, 'Africa'],

    ['Namibia', 'Windhoek', 2540905, 'Africa'],

    ['Gambia', 'Banjul', 2416668, 'Africa'],

    ['Botswana', 'Gaborone', 2351627, 'Africa'],

    ['Gabon', 'Libreville', 2225734, 'Africa'],

    ['Lesotho', 'Maseru', 2142249, 'Africa'],

    ['Guinea-Bissau', 'Bissau', 1968001, 'Africa'],

    ['Equatorial Guinea', 'Malabo', 1402985, 'Africa'],

    ['Mauritius', 'Port Louis', 1271768, 'Africa'],

    ['Eswatini', 'Mbabane', 1160164, 'Africa'],

    ['Djibouti', 'Djibouti', 988000, 'Africa'],

    ['Comoros', 'Moroni', 869601, 'Africa'],

    ['Western Sahara', 'El Aaiún', 597339, 'Africa'],

    ['Cabo Verde', 'Praia', 555987, 'Africa'],

    ['Seychelles', 'Victoria', 98347, 'Africa'],

    ['São Tomé and Príncipe', 'São Tomé', 219159, 'Africa'],

    ['Russia', 'Moscow', 145934462, 'Europe'],

    ['Germany', 'Berlin', 83783942, 'Europe'],

    ['United Kingdom', 'London', 67886011, 'Europe'],

    ['Italy', 'Rome', 60461826, 'Europe'],

    ['Spain', 'Madrid', 46754778, 'Europe'],

    ['Ukraine', 'Kyiv', 43733762, 'Europe'],

    ['Poland', 'Warsaw', 37846611, 'Europe'],

    ['Romania', 'Bucharest', 19237691, 'Europe'],

    ['Netherlands', 'Amsterdam', 17134872, 'Europe'],

    ['Belgium', 'Brussels', 11589623, 'Europe'],

    ['Czech Republic', 'Prague', 10708981, 'Europe'],

    ['Greece', 'Athens', 10423054, 'Europe'],

    ['Portugal', 'Lisbon', 10196709, 'Europe'],

    ['Sweden', 'Stockholm', 10099265, 'Europe'],

    ['Hungary', 'Budapest', 9660351, 'Europe'],

    ['Belarus', 'Minsk', 9449323, 'Europe'],

    ['Austria', 'Vienna', 9006398, 'Europe'],

    ['Serbia', 'Belgrade', 8737371, 'Europe'],

    ['Switzerland', 'Bern', 8654622, 'Europe'],

    ['Bulgaria', 'Sofia', 6948445, 'Europe'],

    ['Denmark', 'Copenhagen', 5792202, 'Europe'],

    ['Finland', 'Helsinki', 5540720, 'Europe'],

    ['Slovakia', 'Bratislava', 5459642, 'Europe'],

    ['Norway', 'Oslo', 5421241, 'Europe'],

    ['Ireland', 'Dublin', 4937786, 'Europe'],

    ['Croatia', 'Zagreb', 4105267, 'Europe'],

    ['Moldova', 'Chisinau', 4033963, 'Europe'],

    ['Bosnia and Herzegovina', 'Sarajevo', 3280819, 'Europe'],

    ['Albania', 'Tirana', 2877797, 'Europe'],

    ['Lithuania', 'Vilnius', 2722289, 'Europe'],

    ['North Macedonia', 'Skopje', 2083374, 'Europe'],

    ['Slovenia', 'Ljubljana', 2078938, 'Europe'],

    ['Latvia', 'Riga', 1886198, 'Europe'],

    ['Kosovo', 'Pristina', 1873000, 'Europe'],

    ['Estonia', 'Tallinn', 1326535, 'Europe'],

    ['Cyprus', 'Nicosia', 1207359, 'Europe'],

    ['Montenegro', 'Podgorica', 628066, 'Europe'],

    ['Luxembourg', 'Luxembourg City', 634814, 'Europe'],

    ['Malta', 'Valletta', 516100, 'Europe'],

    ['Iceland', 'Reykjavik', 366425, 'Europe'],

    ['Andorra', 'Andorra la Vella', 77265, 'Europe'],

    ['Monaco', 'Monaco', 39242, 'Europe'],

    ['Liechtenstein', 'Vaduz', 38128, 'Europe'],

    ['San Marino', 'San Marino', 33931, 'Europe'],

    ['Vatican City', 'Vatican City', 801, 'Europe'],

    ['Mexico', 'Mexico City', 128932753, 'North America'],

    ['Canada', 'Ottawa', 37742154, 'North America'],

    ['Guatemala', 'Guatemala City', 17915568, 'North America'],

    ['Haiti', 'Port-au-Prince', 11402528, 'North America'],

    ['Cuba', 'Havana', 11326616, 'North America'],

    ['Dominican Republic', 'Santo Domingo', 10847910, 'North America'],

    ['Honduras', 'Tegucigalpa', 9904607, 'North America'],

    ['Nicaragua', 'Managua', 6624554, 'North America'],

    ['El Salvador', 'San Salvador', 6486205, 'North America'],

    ['Costa Rica', 'San José', 5094118, 'North America'],

    ['Panama', 'Panama City', 4314767, 'North America'],

    ['Jamaica', 'Kingston', 2961167, 'North America'],

    ['Puerto Rico', 'San Juan', 2860853, 'North America'],

    ['Trinidad and Tobago', 'Port of Spain', 1399488, 'North America'],

    ['Bahamas', 'Nassau', 393248, 'North America'],

    ['Belize', 'Belmopan', 397621, 'North America'],

    ['Barbados', 'Bridgetown', 287375, 'North America'],

    ['Saint Lucia', 'Castries', 183627, 'North America'],

    ['Grenada', 'St. George\'s', 112523, 'North America'],

    ['Saint Vincent and the Grenadines', 'Kingstown', 110940, 'North America'],

    ['Antigua and Barbuda', 'Saint John\'s', 97929, 'North America'],

    ['Dominica', 'Roseau', 71986, 'North America'],

    ['Saint Kitts and Nevis', 'Basseterre', 53199, 'North America'],

    ['Colombia', 'Bogotá', 50882891, 'South America'],

    ['Argentina', 'Buenos Aires', 45195774, 'South America'],

    ['Peru', 'Lima', 32971854, 'South America'],

    ['Venezuela', 'Caracas', 28435940, 'South America'],

    ['Chile', 'Santiago', 19116201, 'South America'],

    ['Ecuador', 'Quito', 17643054, 'South America'],

    ['Bolivia', 'Sucre', 11673021, 'South America'],

    ['Paraguay', 'Asunción', 7132538, 'South America'],

    ['Uruguay', 'Montevideo', 3473730, 'South America'],

    ['Guyana', 'Georgetown', 786552, 'South America'],

    ['Suriname', 'Paramaribo', 586632, 'South America'],

    ['French Guiana', 'Cayenne', 298682, 'South America'],

    ['Papua New Guinea', 'Port Moresby', 8947024, 'Oceania'],

    ['New Zealand', 'Wellington', 4822233, 'Oceania'],

    ['Fiji', 'Suva', 896445, 'Oceania'],

    ['Solomon Islands', 'Honiara', 686884, 'Oceania'],

    ['Vanuatu', 'Port Vila', 307145, 'Oceania'],

    ['New Caledonia', 'Nouméa', 285498, 'Oceania'],

    ['French Polynesia', 'Papeete', 280908, 'Oceania'],

    ['Samoa', 'Apia', 198414, 'Oceania'],

    ['Kiribati', 'Tarawa', 119449, 'Oceania'],

    ['Micronesia', 'Palikir', 115023, 'Oceania'],

    ['Tonga', 'Nuku\'alofa', 105695, 'Oceania'],

    ['Marshall Islands', 'Majuro', 59190, 'Oceania'],

    ['Palau', 'Ngerulmud', 18094, 'Oceania'],

    ['Tuvalu', 'Funafuti', 11792, 'Oceania'],

    ['Nauru', 'Yaren', 10824, 'Oceania']

        ];

       

        additionalCountries.forEach(country => {

            db.run(

                "INSERT INTO countries (name, capital, population, continent) VALUES (?, ?, ?, ?)",

                country

            );

        });

       

        // Save the new database

        saveDatabase();

    }

   

    // Display all countries

    displayAllCountries();

   

    // Set "All" buttons as active by default

    document.querySelector('.filter-btn[data-filter="continent"][data-value=""]').classList.add('active');

    document.querySelector('.filter-btn[data-filter="population"][data-value="all"]').classList.add('active');

});

 

// Function to save the database to localStorage

function saveDatabase() {

    const data = db.export();

    const array = Array.from(data);

    localStorage.setItem('countriesDB', JSON.stringify(array));

    console.log("Database saved to localStorage");

}

 

// Function to display all countries

function displayAllCountries() {

    const result = db.exec("SELECT * FROM countries ORDER BY name");

    const countriesList = document.getElementById('countries-list');

    countriesList.innerHTML = '';

   

    if (result.length > 0) {

        result[0].values.forEach(country => {

            const countryCard = createCountryCard(country);

            countriesList.appendChild(countryCard);

        });

    } else {

        countriesList.innerHTML = '<p>No countries in the database yet.</p>';

    }

}

 

// Function to create a country card element

function createCountryCard(country) {

    const [id, name, capital, population, continent] = country;

   

    const card = document.createElement('div');

    card.className = 'country-card';

   

    card.innerHTML = `

        <h3>${name}</h3>

        <p><strong>Capital:</strong> ${capital}</p>

        <p><strong>Population:</strong> ${population.toLocaleString()}</p>

        <p><strong>Continent:</strong> ${continent}</p>

    `;

   

    return card;

}

 

// Tab switching functionality

const tabButtons = document.querySelectorAll('.tab-btn');

const tabContents = document.querySelectorAll('.tab-content');

 

tabButtons.forEach(button => {

    button.addEventListener('click', () => {

        // Remove active class from all buttons and contents

        tabButtons.forEach(btn => btn.classList.remove('active'));

        tabContents.forEach(content => content.classList.remove('active'));

       

        // Add active class to clicked button and corresponding content

        button.classList.add('active');

        const tabId = button.getAttribute('data-tab');

        document.getElementById(tabId).classList.add('active');

    });

});

 

// Add country form submission

const addCountryForm = document.getElementById('add-country-form');

addCountryForm.addEventListener('submit', function(e) {

    e.preventDefault();

   

    const name = document.getElementById('name').value;

    const capital = document.getElementById('capital').value;

    const population = parseInt(document.getElementById('population').value);

    const continent = document.getElementById('continent').value;

   

    // Insert the new country

    db.run(

        "INSERT INTO countries (name, capital, population, continent) VALUES (?, ?, ?, ?)",

        [name, capital, population, continent]

    );

   

    // Save the database after adding a country

    saveDatabase();

   

    // Clear the form

    addCountryForm.reset();

   

    // Show a success message

    alert(`${name} has been added to the database!`);

   

    // Update the countries list

    displayAllCountries();

   

    // Switch to the view tab

    tabButtons[0].click();

});

 

// Add event listeners to all filter buttons

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.filter-btn').forEach(button => {

        button.addEventListener('click', function() {

            const filterType = this.getAttribute('data-filter');

            const filterValue = this.getAttribute('data-value');

           

            // Update active button styling

            document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(btn => {

                btn.classList.remove('active');

            });

            this.classList.add('active');

           

            // Update current filters

            currentFilters[filterType] = filterValue;

           

            // Apply filters

            applyFilters();

        });

    });

});

 

// Function to apply all current filters

function applyFilters() {

    let query = "SELECT * FROM countries WHERE 1=1";

    let params = [];

   

    // Apply continent filter

    if (currentFilters.continent) {

        query += " AND continent = ?";

        params.push(currentFilters.continent);

    }

   

    // Apply population filter

    if (currentFilters.population !== "all") {

        switch(currentFilters.population) {

            case "small":

                query += " AND population < 10000000";

                break;

            case "medium":

                query += " AND population >= 10000000 AND population < 100000000";

                break;

            case "large":

                query += " AND population >= 100000000 AND population < 500000000";

                break;

            case "huge":

                query += " AND population >= 500000000";

                break;

        }

    }

   

    // Add ordering

    query += " ORDER BY name";

   

    // Execute query

    const results = db.exec(query, params);

    displaySearchResults(results);

}

 

// Function to display search results

function displaySearchResults(results) {

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = '';

   

    if (results.length > 0 && results[0].values.length > 0) {

        // Add result count

        const countElement = document.createElement('div');

        countElement.className = 'result-count';

        countElement.textContent = `Found ${results[0].values.length} countries`;

        searchResults.appendChild(countElement);

       

        // Add results

        results[0].values.forEach(country => {

            const countryCard = createCountryCard(country);

            searchResults.appendChild(countryCard);

        });

    } else {

        searchResults.innerHTML = '<p>No countries match your search criteria.</p>';

    }

}

 

// Add functionality to view raw database

document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('view-raw-data')) {

        document.getElementById('view-raw-data').addEventListener('click', function() {

            const rawDataElement = document.getElementById('raw-data');

           

            // Toggle visibility

            if (rawDataElement.style.display === 'none') {

                // Run a query to get all data

                const result = db.exec("SELECT * FROM countries");

               

                // Format the result as JSON

                let formattedData = "DATABASE CONTENT:\n\n";

                formattedData += "Table: countries\n";

                formattedData += "Columns: " + result[0].columns.join(", ") + "\n\n";

               

                // Add each row

                result[0].values.forEach(row => {

                    formattedData += JSON.stringify(row) + "\n";

                });

               

                // Display the data

                rawDataElement.textContent = formattedData;

                rawDataElement.style.display = 'block';

                this.textContent = 'Hide Raw Database';

            } else {

                // Hide the data

                rawDataElement.style.display = 'none';

                this.textContent = 'View Raw Database';

            }

        });

    }

   

    if (document.getElementById('export-db')) {

        // Add functionality to export database

        document.getElementById('export-db').addEventListener('click', function() {

            // Export the database to a Uint8Array

            const data = db.export();

           

            // Create a blob from the data

            const blob = new Blob([data], {type: 'application/octet-stream'});

           

            // Create a download link

            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;

            a.download = 'countries-database.sqlite';

            a.click();

           

            // Clean up

            URL.revokeObjectURL(url);

        });

    }

});

 

document.getElementById('run-query').addEventListener('click', function() {

    const queryText = document.getElementById('sql-input').value.trim();

    const resultsContainer = document.getElementById('query-results');

   

    if (!queryText) {

      resultsContainer.innerHTML = '<p>Please enter a SQL query</p>';

      return;

    }

   

    try {

      // Execute the query

      const results = db.exec(queryText);

     

      // Display results

      if (results.length > 0) {

        // Create table for results

        let tableHTML = '<table class="results-table"><thead><tr>';

       

        // Add column headers

        results[0].columns.forEach(column => {

          tableHTML += `<th>${column}</th>`;

        });

        tableHTML += '</tr></thead><tbody>';

       

        // Add rows

        results[0].values.forEach(row => {

          tableHTML += '<tr>';

          row.forEach(cell => {

            tableHTML += `<td>${cell}</td>`;

          });

          tableHTML += '</tr>';

        });

       

        tableHTML += '</tbody></table>';

        resultsContainer.innerHTML = `<p>Query returned ${results[0].values.length} results:</p>` + tableHTML;

      } else {

        resultsContainer.innerHTML = '<p>Query executed successfully but returned no results</p>';

      }

    } catch (error) {

      resultsContainer.innerHTML = `<p>Error executing query:</p><pre class="error-message">${error.message}</pre>`;

    }

  });

 

  document.getElementById('reset-db').addEventListener('click', function() {

    localStorage.removeItem('countriesDB');

    location.reload();

});