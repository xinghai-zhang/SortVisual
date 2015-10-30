var w = 300, h = 100, num = 30, dataset,
    padding = 2,
    states = {"default": 0, "finished": 1, "current": 2, "compare": 3, "minimal": 4, "hide": 5},
    colors = ["#B7C4CF", "#3565A1", "#D55511", "#74A82A", "#A42F11", "#fff"],
    color_default = "#6A6BCD", color_highlight = "#C24787", svg;



// init the graph
setDataset(num);
setRects(dataset);
// generate random dataset
function setDataset(len) {
    len = len || 20;
    
    var i = 0;
    
    dataset = [];
    
    for (; i < len; i++) {
        dataset[i] = { num: (Math.random() * len * 2) | 0, 
                       state: states.default };
    }
    
    scale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d.num; })])
                .range([9, h]);
}

// create rect in svg
function setRects(set) {
    document.getElementById("graph").innerHTML = "";
    
    svg = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
    
    var rects = svg.selectAll("rect")
                    .data(set)
                    .enter()
                    .append("rect");
    
    rects.attr("x", function(d, i) {
        return i * (w / set.length);
    });
    
    rects.attr("y", function(d, i) {
        return h - scale(d.num);
    });
    
    rects.attr("width", function(d, i) {
        return (w / set.length) - padding;
    });
    
    rects.attr("height", function(d, i) {
        return scale(d.num);
    });
    
    rects.attr("fill", function(d, i) {
        return colors[d.state];
    });
}
                      