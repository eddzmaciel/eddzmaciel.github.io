$(document).ready(function() {
    var map_canvas = $('.map-canvas');
    var x_point = map_canvas.data('x');
    var y_point = map_canvas.data('y');
    var zoom  = map_canvas.data('zoom');
    if (map_canvas.lenght > 0) {
        map_canvas.gmap3({
            center:[48.8620722, 2.352047],
            zoom: 16,
            scrollwheel: false,
            streetViewControl: false,
            draggable: true,
            mapTypeControl: false,
            scaleControl: false,

          }).marker([
            {position:[48.8620722, 2.352047]}
          ]);
    }
    else {
        console.log(true);
    }
});
