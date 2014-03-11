function drawSimpleAxes(container){
	var margin = {top: 50, right: 30, bottom: 100, left: 30},
	    width = 960 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(displayPerfData, function (d) {
			return d.count;
		})
	]);
	var axey = d3.svg.axis().scale(y).orient('left');
	svg.append('g').call(axey);


	var x = d3.time.scale().range([0,width]);
	x.domain(d3.extent(displayPerfData, function (d) {
		return new Date(d.time * 1000);
	}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});
}

function drawSimpleAxesWithCss(container){
	var margin = {top: 50, right: 30, bottom: 100, left: 50},
			width = 960 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

	var svg = d3.select(container).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(displayPerfData, function (d) {
			return d.count;
		})
	]);
	var axey = d3.svg.axis().scale(y).orient('left');
	svg.append('g').attr('class', 'axis_d3_h1_axes').call(axey);


	var x = d3.time.scale().range([0,width]);
	x.domain(d3.extent(displayPerfData, function (d) {
		return new Date(d.time * 1000);
	}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});
}


function graph1Path(container){

	var margin = {top: 50, right: 30, bottom: 100, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(displayPerfData, function (d) {
			return d.count;
		})
	]);
	var axey = d3.svg.axis().scale(y).orient('left');
	svg.append('g').attr('class', 'axis_d3_h1_axes').call(axey);


	var x = d3.time.scale().range([0,width]);
	x.domain(d3.extent(displayPerfData, function (d) {
		return new Date(d.time * 1000);
	}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});

	var line = d3.svg.line()
		.x(function (d) {return x(d.time * 1000);})
		.y(function (d) {return y(d.count);});
	svg.append('path').datum(displayPerfData).attr('class', 'line_d3_h1_axes').attr('d', line);

}

function graphFinal(container){
	var margin = {top: 50, right: 30, bottom: 100, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scale.linear().range([height,0]);
	y.domain([0,d3.max(displayPerfData, function (d) {
			return d.count;
		})
	]);
	var axey = d3.svg.axis().scale(y).orient('left');
	svg.append('g').attr('class', 'axis_d3_h1_axes').call(axey).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.8em').style('text-anchor', 'end').text('Req / s')


	var x = d3.time.scale().range([0,width]);
	x.domain(d3.extent(displayPerfData, function (d) {
		return new Date(d.time * 1000);
	}));
	var axex = d3.svg.axis().scale(x).orient('bottom');
	var xaxis = svg.append('g').attr('class', 'axis_d3_h1_axes').attr('transform', 'translate(0,' + height + ')').call(axex);
	xaxis.selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', function () {
		return 'rotate(-60)';
	});

	var line = d3.svg.line()
		.interpolate("linear")
		.x(function (d) {return x(d.time * 1000);})
		.y(function (d) {return y(d.count);});
    svg.append('path').datum(displayPerfData).attr('class', 'line_d3_h1_axes').attr('d', line);
    /*svg.append('g').selectAll('.point').data(displayPerfData).enter().append("circle")
    	.attr("cx", function (d) {return x(d.time * 1000);})
    	.attr("cy", function (d) {return y(d.count);})
    	.attr("r", 5)
    	.attr("class", "point")
*/
	var legend = svg.append('g').attr('class', 'legend').attr('transform', 'translate(0, ' + (0 - margin.top / 2) + ')');
	legend.append('circle').attr('cx', width - 10).attr('cy', 10).attr('r', 5).style('fill', 'steelblue').style('stroke', 'black');
	legend.append('text').attr('x', width - 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'end').text('My website traffic');

	var brush = d3.svg.brush().x(this.x).on('brushend', function () {
		//var interval = brush.extent();
		//these.scope.$emit('setDate', interval[0], interval[1]);
	});
	svg.append('g').attr('class', 'brush').call(brush).selectAll('rect').attr('height', height).attr('fill-opacity', 0.2);
}
