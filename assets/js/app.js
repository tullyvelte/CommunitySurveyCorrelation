// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// Whenever the window resizes, call the handleResize function
d3.select(window).on("resize", handleResize);

// When the browser loads, loadChart() is called
loadChart();

function handleResize() {
    var svgArea = d3.select("svg");

    // If there is already an svg container on the page, remove it and reload the chart
    if (!svgArea.empty()) {
        svgArea.remove();
        loadChart();
    }
}

// Load chart is called on page load and when the window resizes
function loadChart() {
    // Define SVG area dimensions
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    // Define the chart's margins as an object
    var chartMargin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    // Inside the SVG area, append an SVG group, move it down and to the right
    var svg = d3
        .select(".chartbox")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")");

    // Configure a band scale, with a range between 0 and the chartWidth and a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand().range([0, chartWidth]).padding(0.1);

    // Create a linear scale, with a range between the chartHeight and 0.
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

    // Load data from hours-of-tv-watched.csv
    d3.csv("/data/netWorkingData.csv", function(error, netWorkingData) {

    // Throw an error if one exists
        if (error) {
            throw error;
        }

        // Print the tvData
        console.log(tvData);
}};
