const fs = require('fs');

// Read the data from the file
fs.readFile("data.json", "utf-8", (err, jsonData) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Try to parse the JSON data
    try {
        const data = JSON.parse(jsonData);

        // Calculate the total age and average age of the people in the data
        let totalAge = 0;
        data.forEach(person => {
            totalAge += person.age;
        });
        const averageAge = totalAge / data.length;

        // Print the average age
        console.log("Average Age:", averageAge);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});