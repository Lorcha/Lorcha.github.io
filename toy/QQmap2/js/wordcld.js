
(function() {
    var fill = d3.scale.category20();
    //what range of font sizes do we want, we will scale the word counts
    var fontSize = d3.scale.log().range([5, 30]);

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
        d3.select("wordcld").selectAll("svg").selectAll("g")
            .transition()
                .duration(1000)
                .style("opacity", 1e-6)
                .remove();

        //render new tag cloud
        d3.select("body").selectAll("svg")
            .append("g")
                 .attr("transform", "translate(300,300)")
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
            .duration(1000)
            .style("opacity", 1)
            .text(function(d) { return d.text; });
      }

    //ajax call

   function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

};
var j_obj;
getJSONP('http://vm-3dfx:8090/beijing/beijing/116/60', function(data){
    console.log(data);
    j_obj = JSON.parse(data);
});  

    function get_words(obj) {
        //make ajax call
  
        d3.json(obj, function(json, error) {
          if (error) return console.warn(error);
          var words_array = [];
          for (key in json){
            words_array.push({text: key, size: json[key]})
          }
          //render cloud
          mycloud.stop().words(words_array).start();
        });
    };

    //create SVG container
    d3.select("wordcld").append("svg")
        .attr("width", 300)
        .attr("height", 200);

    //render first cloud
    get_words(j_obj);

    //start streaming
    //var interval = setInterval(function(){get_words()}, 4000);
})();
