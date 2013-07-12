$.extend( jQuery.easing,
  {
    easeOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
  });


$.fn.moveBox = function(o) {
  var defs = {
    width: 0,
    duration: 500
  }
  var confs = $.extend(defs,o);
  
  var size = {
    x: $(window).width(),
    y: $(window).height()
  };
  var scroll = {
    x: $(window).scrollLeft(),
    y: $(window).scrollTop()
  };
  var height = this.outerHeight();
  var y      = 0;
  var x      = 0;

  // vertically center
  y = scroll.x + ((size.x - confs.width) / 2);

  x = (scroll.y - height) - 80;

  this.animate({
    left  : y,
    top   : scroll.y + ((size.y - height) / 2)
  }, {
    duration  : confs.duration,
    queue     : false,
    easing    : 'easeOutBack'
  });
}

$.fn.shake = function(o){
  var defs = {
    'distance': 10,
    'duration': 75,
    'transition': 'easeOutBack',
    'loops': 2
  }

  var cfgs = $.extend(defs,o);

  var x = cfgs.distance;
  var d = cfgs.duration;
  var t = cfgs.transition;
  var o = cfgs.loops;
  var l = this.position().left;
  var e = this;
  var i;

  for (i=0; i<o; i++){
    e.animate({
      left: l+x
    }, d, t);
    e.animate({
      left: l-x
    }, d, t);
  };

  e.animate({
    left: l+x
  }, d, t);
  e.animate({
    left: l
  },   d, t);

  return this;
}

jQuery.extend({
  msgbox:function(m,o){
    var defaults = {
      width: 420,
      buttons:{},
      type:'alert' // alert / info /error / prompt / confirm
    }

    var cfg = $.extend(defaults,o);

    var div_overlay = $('<div>').addClass('jquery-msgbox-overlay');
    var div_msgbox  = $('<div>').addClass('jquery-msgbox').css({
      'width'     : cfg.width
    });

    div_msgbox.bind('close',function(){
      div_msgbox.remove();
      div_overlay.fadeOut(100,function(){
        $(this).remove();
      })
    });

    var type = 'jquery-msgbox-'+cfg.type;

    var div_wrapper = $('<div>').addClass('jquery-msgbox-wrapper').addClass(type).html(m).css({
      height       : 'auto',
      'min-height' : 80,
      'zoom'       : 1
    });

    var div_botoes = $('<div>').addClass('jquery-msgbox-buttons');

    if(!Object.keys(cfg.buttons).length){
      cfg.buttons['Ok'] = function(box){
        box.trigger('close');
      }
    }

    for (i in cfg.buttons){
      $('<button>').text(i).click(function(){
        cfg.buttons[i](div_msgbox);
      }).appendTo(div_botoes);
    }

    div_overlay.click(function(){
      div_msgbox.shake();
    });

    div_msgbox.append(div_wrapper);
    div_msgbox.append(div_botoes);

    div_overlay.appendTo('body').fadeIn(200,function(){
      div_msgbox.appendTo('body').css({
        display : 'block',
        left    : ( ($(document).width() - cfg.width) / 2)
      }).moveBox({
        width:cfg.width
      });
    });
  }
})
