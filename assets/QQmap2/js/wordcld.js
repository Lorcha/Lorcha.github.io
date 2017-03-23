
(function() {
    var fill = d3.scale.category20();
    //what range of font sizes do we want, we will scale the word counts
    var fontSize = d3.scale.log().range([60, 90]);

    //create my cloud object
    var mycloud = d3.layout.cloud().size([300, 200])
          .words([])
          .padding(2)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          // .rotate(function() { return 0; })
          .font("Impact")
          .fontSize(function(d) { return fontSize(d.size); })
          .on("end", draw)

    //render the cloud with animations
     function draw(words) {
        //fade existing tag cloud out
        d3.select("#wordcld").selectAll("svg").selectAll("g")
            .transition()
                .duration(500)
                .style("opacity", 1e-6)
                .remove();

        //render new tag cloud
        d3.select("#wordcld").selectAll("svg")
            .append("g")
                 .attr("transform", "translate(100,100)")
                .selectAll("text")
                .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return ((d.size)* 1) + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .style("opacity", 1e-6)
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .transition()
            .duration(500)
            .style("opacity", 1)
            .text(function(d) { return d.text; });
      }

var j_obj;



var xhr = new XMLHttpRequest();
xhr.open('GET', "http://vm-3dfx:8090/beijing/beijing/116/40", true);
xhr.send();
xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4) {
      j_obj = JSON.parse(xhr.responseText);
      
       get_words(j_obj[0]['attributes']);


    }
}


    function get_words(obj) {
        //make ajax call
          var words_array = [];
          for (key in obj){
            if (obj[key] > 100) {
              alert(key);
            words_array.push({text: key, size: obj[key]} ) }
          }
          //render cloud
          mycloud.stop().words(words_array).start();
    };

    //create SVG container



    //render first cloud


    //start streaming
    //var interval = setInterval(function(){get_words()}, 4000);
})();


