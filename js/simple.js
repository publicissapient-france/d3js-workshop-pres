var mapData = function(container){
	var svg = d3.select(container).append("svg").attr("width", 150).attr("height", 150)
	svg.selectAll("circle")
		.data(complexData)
		.enter().append("circle")
		.attr("cx", function(d){return d.x})
		.attr("cy", function(d){return d.y})
		.attr("r", function(d){return d.count})
		.attr("fill", "red")
		.attr("stroke", "black")
}

var simpleCircle = function(container){
	var svg = d3.select(container)
		.append("svg");
	svg
		.attr("width", 150)
		.attr("height", 150);
	svg.append("circle")
		.attr("cx", 50)
		.attr("cy", 50)
		.attr("r", 30)
		.attr("fill","red")
		.attr("stroke","black")
}

var simpleRect = function(container){
	console.log(container)
	var svg = d3.select(container)
		.append("svg");
	svg
		.attr("width", 150)
		.attr("height", 150);
	svg.append("rect")
		.attr("x", 10)
		.attr("y", 10)
		.attr("width", 50)
		.attr("height", 100)
		.attr("fill","blue")
		.attr("stroke","black")
}


var simplePath = function(container){
	var lineData = [ { "x": -5,   "y": 25},  { "x": -4,  "y": 16},
	                  { "x": -3,  "y": 9}, { "x": -2,  "y": 4},
	                  { "x": -1,  "y": 1},  { "x": 0, "y": 0},
	                  { "x": 1,   "y": 1},  { "x": 2,  "y": 4},
	                  { "x": 3,  "y": 9}, { "x": 4,  "y": 16},
	                  { "x": 5,  "y": 25}];
	var lineFunction = d3.svg.line()
		.x(function(d) { return (d.x * 20) + 150; })
		.y(function(d) { return -(d.y * 5) + 180; })
		.interpolate("basis");
	var svg = d3.select(container)
		.append("svg")
		.attr("width", 300)
		.attr("height", 200);
	var lineGraph = svg.append("path")
	    .attr("d", lineFunction(lineData))
	    .attr("stroke", "blue")
	    .attr("stroke-width", 3)
	    .attr("fill", "none");
}
