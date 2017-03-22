(function() {
var words = [
"San Jose", "San Antonio", "Santa Rosa", "Santa Cruz", "San Juan", "San Miguel", "Santa Maria", "San Pedro", "San Francisco", "San Isidro", "Buena Vista", "Santa Ana", "San Rafael", "Santa Rita", "Santa Lucia", "Buenavista", "San Vicente", "San Luis", "Santa Barbara", "San Lorenzo", "La Esperanza", "Santo Domingo", "San Pablo", "Buenos Aires", "Concepcion", "Phumi Ba", "San Agustin", "Santa Teresa", "Santa Elena", "Victoria", "Santa Clara", "Santiago", "San Nicolas", "San Carlos", "Santa Isabel", "San Andres", "San Roque", "San Martin", "El Carmen", "Pueblo Nuevo", "Santa Fe", "San Felipe", "Rosario", "La Union", "La Laguna", "Esperanza", "El Porvenir", "La Palma", "San Ramon", "El Rosario", "Las Delicias", "La Florida", "San Fernando", "San Joaquin", "Ojo De Agua", "Bella Vista", "La Cruz", "San Cristobal", "El Palmar", "El Limon", "Guadalupe", "El Paraiso", "El Rincon", "Las Palmas", "La Ceiba", "Santo Tomas", "San Marcos", "La Loma", "Belen", "Las Mercedes", "Las Flores", "Mikhaylovka", "Union", "Manga", "La Paz", "Carrizal", "San Ignacio", "La Victoria", "Kamenka", "Paraiso", "Aleksandrovka", "El Rodeo", "Santa Ines", "Ivanovka", "Nikolayevka", "Las Cruces", "Miraflores", "San Jeronimo", "Soledad", "Candelaria", "Alekseyevka", "Berezovka", "A", "La Concepcion", "Los Angeles", "El Naranjo", "Bellavista", "Dolores", "Carmen", "San Sebastian"
];
var fill = d3.scale.category20();
wordmap = {};
words.map(function(d) {
    word_list = d.split(' ');
    for (i in word_list) {
        w = word_list[i];
        if (!wordmap.hasOwnProperty(w)) {
            wordmap[w] = 0;
        }
        wordmap[w]++;
    }
});

d3.layout.cloud().size([200, 150])
    .words(d3.entries(wordmap).map(function(d) {
        return {text: d.key, size: d.value};
    }))
    .padding(1)
    .rotate(0)
    .font("Impact")
    .fontSize(function(d) { return d.size * 10; })
    .on("end", draw)
    .start();

function draw(words) {
    d3.select("#wordcld").append("svg")
        .attr("width", 200)
        .attr("height", 150)
    .append("g")
        .attr("transform", "translate(200,100)")
    .selectAll("text")
        .data(words)
    .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}
})();
