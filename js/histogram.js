function useDiscretScale(container){
	d3.select(container).select('svg').remove();
	var distributionData = constructDistrib(rawDistributionData).entries.slice(0, 30)
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
	    width = 800 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(distributionData, function (d) {
			return d.count;
		})
	]);
	var y1 = d3.scale.linear().range([height,0]);
	y1.domain([0,1]);
	var axey = d3.svg.axis().scale(y).orient('left');
	var formatPercent = d3.format('.0%');
	var axey1 = d3.svg.axis().scale(y1).orient('right').tickFormat(formatPercent);
	svg.append('g').attr('class', 'axis_d3_h1_axes').call(axey).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.8em').style('text-anchor', 'end').text('Nb Req')
		svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(' + width + ' ,0)').call(axey1);
	
	var x = d3.scale.ordinal().rangeRoundBands([0,width], 0.1);
	x.domain(distributionData.map(function (d) {return d.key;}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});

}

function finalizeHistogram(container){
	d3.select(container).select('svg').remove();
	var distributionDataFull = constructDistrib(rawDistributionData)
	var distributionData = distributionDataFull.entries.slice(0, 30)
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
	    width = 800 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select("#histo_1").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(distributionData, function (d) {
			return d.count;
		})
	]);
	var y1 = d3.scale.linear().range([height,0]);
	y1.domain([0,1]);
	var axey = d3.svg.axis().scale(y).orient('left');
	var formatPercent = d3.format('.0%');
	var axey1 = d3.svg.axis().scale(y1).orient('right').tickFormat(formatPercent);
	svg.append('g').attr('class', 'axis_d3_h1_axes').call(axey).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.8em').style('text-anchor', 'end').text('Nb Req')
		svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(' + width + ' ,0)').call(axey1);
	
	var x = d3.scale.ordinal().rangeRoundBands([0,width], 0.1);
	x.domain(distributionData.map(function (d) {return d.key;}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});


  	var ygrid = d3.svg.axis().scale(y1).orient('left');
    svg.append('g').attr('class', 'grid').call(ygrid.tickSize(-width, 0, 0).tickFormat(''));

	svg.selectAll('.bar').data(distributionData).enter().append('rect').attr('class', 'bar').style('fill', 'steelblue').style('fill-opacity', 0.7)
	.attr('x', function (d) {
    	return x(d.key);
  	})
  	.attr('width', x.rangeBand()).attr('y', function (d) {
    	return y(d.count);
  	}).attr('height', function (d) {
    	return height - y(d.count);
  	});

  	var line = d3.svg.line().interpolate('basis').x(function (d) {
      return x(d.key);
    }).y(function (d) {
      return y1(d.totalcount / distributionDataFull.total);
    });
  	svg.datum(distributionData);
  	svg.append('path').attr('class', 'line').attr('d', line).style('stroke', 'orange')
  	.style('fill', 'none').style('stroke-width', '2px');


}



