const reader = require("line-reader");


reader.eachLine("/Users/charlesohanlon/Desktop/Web\ Dev/professcore/datad.csv", (line) => {
    const course = line.split(",");
    console.log(course[3] + course[4]);
});