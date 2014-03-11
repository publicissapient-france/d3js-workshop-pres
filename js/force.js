function drawForceGraphFromLinkedin(container){
  var width = 500, height= 500;

  var svg = d3.select(container).append("svg")
    .attr("width", width)
    .attr("height", height);

  var color = d3.scale.category20();

  var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

  var nodes = [{"name": "Julien Buret", id: "me"}]
  var links = []
  var i = 1
  myLinkedin.values.forEach(function(relation){
    nodes.push({"name": relation.firstName + ' ' + relation.lastName, "id": relation.id})
    // All relation linked to me
    links.push({"source": 0, "target": i++})
  })

  force
    .nodes(nodes)
    .links(links)
    .start();

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .style("stroke-width", 1);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", "black")
      .call(force.drag);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

}


function drawForceGraphFromLinkedin2(container){
  var width = 500, height= 500;

  var svg = d3.select(container).append("svg")
    .attr("width", width)
    .attr("height", height);

  var color = d3.scale.category20();

  var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

  var nodes = [{"name": "Julien Buret", "id": "me", "group": "Xebia"}]
  var links = []
  var groups = {"Xebia": {"id": 0, "count": 1}}
  var i = 1
  var groupCount = 1
  myLinkedin.values.forEach(function(relation){
    var group = ""
    var groupId = 1
    if(users[relation.id] != undefined && users[relation.id].positions.values != undefined && users[relation.id].positions.values[0]!= undefined){
      group = users[relation.id].positions.values[0].company.name
      // look if group exists
      if(groups[group]){
        groupId = groups[group].id
        groups[group].count++
      }else{
        groupId = groupCount++
        groups[group] = {"id": groupId, "count": 1}
      }
    }
    nodes.push({"name": relation.firstName + ' ' + relation.lastName, "id": relation.id, "group": groupId})
    // All relation linked to me
    links.push({"source": 0, "target": i++})
  })

  console.log(groups)

  force
    .nodes(nodes)
    .links(links)
    .start();

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .style("stroke-width", 1);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d){return color(d.group)})
      .call(force.drag);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

}



function drawForceGraphFromLinkedin3(container){
  var width = 900, height= 600;

  var svg = d3.select(container).append("svg")
    .attr("width", width)
    .attr("height", height);

  var color = d3.scale.category20();

  var nodes = []
  var links = []
  var groups = {"Xebia": {"id": 1, "count": 1}}
  var i = 1
  var groupCount = 1
  myLinkedin.values.forEach(function(relation){

    var group = ""
    var groupId = 2
    if(users[relation.id] != undefined && users[relation.id].positions.values != undefined && users[relation.id].positions.values[0]!= undefined){
      group = users[relation.id].positions.values[0].company.name
      // look if group exists
      if(groups[group]){
        groupId = groups[group].id
        groups[group].count++
      }else{
        groupId = groupCount++
        groups[group] = {"id": groupId, "count": 1}
      }
      nodes.push({"name": relation.firstName + ' ' + relation.lastName, "id": relation.id, "group": groupId, "radius": 10})

    }
  })

  // Only 5 cluster
  var nbCluster = 8
  var fgg = []
  for(var g in groups){
    fgg.push({"name": g, "id": groups[g].id, "count": groups[g].count})
  }
  fgg.sort(function(a,b){return b.count-a.count})
  // keep four first id
  var mainGroupArray = fgg.slice(0, nbCluster)
  var mainGroup = {}
  mainGroupArray.forEach(function(n){
    mainGroup[n.id]=n.count
  })

  // rewrite all node with a new display groupId
  var clusters = new Array(nbCluster+1);
  nodes.forEach(function(n){
    // if group in main group keep groupId
    if(!mainGroup[n.group]){
      n.displayGroup = 0
    }else{
      n.displayGroup = n.group
    }

    // else display group is other
    clusters[n.displayGroup] = n
  })

  d3.layout.pack()
    .sort(null)
    .size([width, height])
    .children(function(d) { return d.values; })
    .value(function(d) { return d.radius * d.radius; })
    .nodes({values: d3.nest()
      .key(function(d) { return d.cluster; })
      .entries(nodes)});

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.02)
      .charge(0)
      .on("tick", tick)
      .start();

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .style("stroke-width", 1);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){return d.radius})
      .style("fill", function(d){return color(d.displayGroup)})
      .call(force.drag);

  node.transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, d.radius);
      return function(t) { return d.radius = i(t); };
    });

  function tick(e) {
    node
        .each(cluster(clusters, 10 * e.alpha * e.alpha, width, height))
        .each(collide(clusters, nodes, .5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

}

// Move d to be adjacent to the cluster node.
function cluster(clusters, alpha, width, height) {
  return function(d) {
    var cluster = clusters[d.displayGroup];
    if (cluster === d) return;
    var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(clusters, nodes, alpha) {
  var maxRadius = 12, padding=3, clusterPadding=20;
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.displayGroup === quad.point.displayGroup ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
