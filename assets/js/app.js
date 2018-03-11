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
