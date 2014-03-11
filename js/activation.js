var lazyLoad = {

  "2-1": function(){cleanSvg('#d3_slide_circl');simpleCircle('#d3_slide_circl')},
  "2-2": function(){cleanSvg('#d3_slide_rect');simpleRect('#d3_slide_rect')},
  "2-3": function(){cleanSvg('#d3_slide_path');simplePath('#d3_slide_path')},

  "3-5": function(){cleanSvg('#select_data_to_circle');mapData("#select_data_to_circle")},

  "4-6": function(){cleanSvg('#d3_h1_axes');drawSimpleAxes('#d3_h1_axes')},
  "4-8": function(){cleanSvg('#d3_h1_axes_css');drawSimpleAxesWithCss('#d3_h1_axes_css')},
  "4-10": function(){cleanSvg('#d3_h1_path1');graph1Path('#d3_h1_path1')},
  "4-12": function(){cleanSvg('#d3_h1_final');graphFinal('#d3_h1_final')},

  "5-3": function(){cleanSvg('#histo_axes');useDiscretScale('#histo_axes')},
  "5-7": function(){cleanSvg('#histo_1');finalizeHistogram('#histo_1')},

  "8-1": function(){cleanSvg('#force_layout_1');drawForceGraphFromLinkedin('#force_layout_1')},
  "8-2": function(){cleanSvg('#force_layout_2');drawForceGraphFromLinkedin3('#force_layout_2')},

}

function cleanSvg(container){
  d3.select(container).select("svg").remove();
}

Reveal.addEventListener('slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    if(f = lazyLoad[event.indexh+'-'+event.indexv]){
      f.apply()
    }
} );
