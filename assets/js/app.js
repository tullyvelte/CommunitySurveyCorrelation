d3.csv('data/netNotWorking.csv', function (data) {
    // Variables
    var body = d3.select('body')
      var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      var h = 600 - margin.top - margin.bottom
      var w = 900 - margin.left - margin.right
      var formatPercent = d3.format('.2%')
      // Scales
    // var colorScale = d3.schemeCategory20()
    var xScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.notWorkingTotal })]),
          d3.max([0,d3.max(data,function (d) { return d.notWorkingTotal })])
          ])
      .range([0,w])
    var yScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.noNetValue })]),
          d3.max([0,d3.max(data,function (d) { return d.noNetValue })])
          ])
      .range([h,0])
      // SVG
      var svg = body.append('svg')
          .attr('height',h + margin.top + margin.bottom)
          .attr('width',w + margin.left + margin.right)
        .append('g')
          .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
      // X-axis
      var xAxis = d3.axisBottom(xScale)
        // .scale(xScale)
        // .tickFormat(formatPercent)
        .ticks(10)
        // .orient('bottom')
    // Y-axis
      var yAxis = d3.axisLeft(yScale)
        // .scale(yScale)
        // .tickFormat(formatPercent)
        .ticks(10)
        // .orient('left')
    // Circles
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
      .append('circle')
        .attr('cx',function (d) { return xScale(d.notWorkingTotal) })
        .attr('cy',function (d) { return yScale(d.noNetValue) })
        .attr('r','10')
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill','cadetblue')
        .attr("opacity", .5)
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('r',20)
            .attr('stroke-width',2)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('r',10)
            .attr('stroke-width',1)
        })
      .append('title') // Tooltip
        .text(function (d) { return d.state + ' \n Did Not Work: ' + d.notWorkingTotal + ' %' + ' \n 30 Days Offline ' + d.noNetValue + ' %'})
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x',w)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Percent Population That Has Not Worked in past 12 Months')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Percent Population That Has Not Been Online in 30 Days')
  })

// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 500;

// // Define the chart's margins as an object
// var margin = {
//     top: 60,
//     right: 60,
//     bottom: 60,
//     left: 60
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - margin.left - margin.right;
// var chartHeight = svgHeight - margin.top - margin.bottom;

// // Select body, append SVG area to it, and set its dimensions
// var svg = d3
//     .select("plot")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight)
//     // Append a group area, then set its margins
//     .append("g")
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// // Load data from miles-walked-this-month.csv
// d3.csv("data/netNotWorking.csv", function(error, surveyData) {

//     // Throw an error if one occurs
//     if (error) {
//         throw error;
//     }

//     // Print the milesData
//     console.log(surveyData);

//     // Format the date and cast the miles value to a number
//     surveyData.forEach(function(data) {
//         data.notWorkingTotal = +data.notWorkingTotal;
//         data.noNetValue = +data.noNetValue;
//     });

//     // Compute the scales’ domains.
//   x.domain(d3.extent(data, function(d) { return data.notWorkingTotal; })).nice();
//   y.domain(d3.extent(data, function(d) { return data.noNetValue; })).nice();

//   // Add the x-axis.
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.svg.axis().scale(x).orient("bottom"));

//   // Add the y-axis.
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(d3.svg.axis().scale(y).orient("left"));

//   // Add the points!
//   svg.selectAll(".point")
//       .data(data)
//     .enter().append("path")
//       .attr("class", "point")
//       .attr("d", d3.svg.symbol().type("triangle-up"))
//       .attr("transform", function(d) { return "translate(" + x(data.notWorkingTotal) + "," + y(data.noNetValue) + ")"; });
// });

// //     // Configure a time scale with a range between 0 and the chartWidth
// //     var xTimeScale = d3.scaleLinear().range([0, chartWidth]);

// //     // Configure a linear scale with a range between the chartHeight and 0
// //     var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

// //     // Set the domain for the xTimeScale function
// //     // d3.extent returns the an array containing the min and max values for the property specified
// //     xLinearScale.domain(d3.extent(surveyData, function(data) {
// //         return data.notWorkingTotal;
// //     }));

// //     // Set the domain for the xLinearScale function
// //     yLinearScale.domain([0, d3.max(surveyData, function(data) {
// //         return data.noNetValue;
// //     })]);

// //     // Create two new functions passing the scales in as arguments
// //     // These will be used to create the chart's axes
// //     var bottomAxis = d3.axisBottom(xLinearScale);
// //     var leftAxis = d3.axisLeft(yLinearScale);


// //     // Append an SVG path and plot its points using the line function
// //     svg
// //         .append("g")
// //     // The drawLine function returns the instructions for creating the line for milesData
// //         .attr("d", drawLine(milesData))
// //         .attr("class", "line");

// //     // Append an SVG group element to the SVG area, create the left axis inside of it
// //     svg.append("g")
// //         .attr("class", "axis")
// //         .call(leftAxis);

// //     // Append an SVG group element to the SVG area, create the bottom axis inside of it
// //     // Translate the bottom axis to the bottom of the page
// //     svg.append("g")
// //         .attr("class", "axis")
// //         .attr("transform", "translate(0, " + chartHeight + ")")
// //         .call(bottomAxis);
// // });


// // // D3 Scatterplot Assignment

// // // Students:
// // // =========
// // // Follow your written instructions and create a scatter plot with D3.js.

// // // Whenever the window resizes, call the handleResize function
// // d3.select(window).on("resize", handleResize);

// // // When the browser loads, loadChart() is called
// // loadChart();

// // function handleResize() {
// //     var svgArea = d3.select("svg");

// //     // If there is already an svg container on the page, remove it and reload the chart
// //     if (!svgArea.empty()) {
// //         svgArea.remove();
// //         loadChart();
// //     }
// // }

// // // Load chart is called on page load and when the window resizes
// // function loadChart() {
// //     // Define SVG area dimensions
// //     var svgWidth = window.innerWidth;
// //     var svgHeight = window.innerHeight;

// //     // Define the chart's margins as an object
// //     var chartMargin = {
// //         top: 30,
// //         right: 30,
// //         bottom: 30,
// //         left: 30
// //     };

// //     // Define dimensions of the chart area
// //     var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// //     var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// //     // Select body, append SVG area to it, and set the dimensions
// //     // Inside the SVG area, append an SVG group, move it down and to the right
// //     var svg = d3
// //         .select(".chartbox")
// //         .append("svg")
// //         .attr("height", svgHeight)
// //         .attr("width", svgWidth)
// //         .append("g")
// //         .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")");

// //     // Configure a band scale, with a range between 0 and the chartWidth and a padding of 0.1 (10%)
// //     var xBandScale = d3.scaleBand().range([0, chartWidth]).padding(0.1);

// //     // Create a linear scale, with a range between the chartHeight and 0.
// //     var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

// //     // Load data from hours-of-tv-watched.csv
// //     d3.csv("/data/netWorkingData.csv", function(error, netWorkingData) {

// //     // Throw an error if one exists
// //         if (error) {
// //             throw error;
// //         }

// //         // Print the tvData
// //         console.log(tvData);
// // }};
