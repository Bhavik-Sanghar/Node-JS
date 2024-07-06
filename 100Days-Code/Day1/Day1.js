const fs = require('fs');


fs.readFile("data.json", "utf-8", (err, jsonData) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {
        const data = JSON.parse(jsonData);
        let totalAge = 0;
        data.forEach(person => {
            totalAge += person.age;
        });
        const averageAge = totalAge / data.length;
        console.log("Average Age:", averageAge);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});
