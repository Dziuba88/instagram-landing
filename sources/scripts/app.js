// Create chart
  var options = {
    title: { show: false },
    legend: { show: false },
    grid: { top: '60px', left: '15px', right: '15px', bottom: '40px', containLabel: true },
    xAxis: {
      show: false,
      type: 'category',
      data: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      axisLine: { show: false },
      axisLabel: { show: false },
      scale: true,
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: { lineStyle: {color: '#fff', opacity: 0} },
      splitLine: {
        lineStyle: {
          color: ['#fff', '#fff'],
          opacity: 0.25,
          width: 2
        }
      },
      axisTick: { lineStyle: { width: 0 } },
      axisLabel: { rotate: 90 },
    },
    series: [{
      data: [{ value: 200, symbol: 'none', label: { show: false } }, 260, 235, 246, { value: 265, symbol: 'none', label: { show: false} }, 260, 479, 620, 790],
      type: 'line',
      clickable: false,
      lineStyle: {
        color: "#FFD960",
        width: 4,
        opacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.16)',
        shadowBlur: 1,
        shadowOffsetY: 10,
      },
      itemStyle: {
        color: '#ffffff',
        borderColor: '#8243F8',
        borderWidth: 1,
        borderType: 'solid',
        shadowColor: 'rgba(0, 0, 0, 0.16)',
        shadowBlur: 7,
        shadowOffsetY: 3,
        opacity: 1
      },
      smooth: true,
      symbol: 'circle',
      symbolSize: 15,
      showAllSymbol: true,
      label: {
        show: true,
        backgroundColor: {
          image: 'img/chart_label.svg'
        },
        shadowColor: 'rgba(0, 0, 0, 0.16)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        padding: [8, 10, 15, 20],
        position: 'top',
        color: '#946EE4',
        distance: 5,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: '"Avenir"'
      },
    }],
    animationDelay: 1000,
    animationDuration: 3000,
    animationThreshold: 150,
    animationDelayUpdate: 0,
    animationDurationUpdate: 1000
  }
  var chart1 = echarts.init(document.getElementById("chart1"));
  var chart2 = echarts.init(document.getElementById("chart2"));
  $(window).on('resize', function () {
    if (chart1 != null && chart1 != undefined) {
      setTimeout(function () { chart1.resize() }, 100);
    };
    if (chart2 != null && chart2 != undefined) {
      setTimeout(function () { chart2.resize() }, 100);
    };
  });
  /*setTimeout(function () {
    chart1.setOption(options, true);
    chart2.setOption(options, true);
  }, 100);*/
// ADD Class on Visible Element
  var $animation_elements = $('[data-inview]');
  var $window = $(window);

  function setConter(element) {
    var countTo = element.attr('data-count');
    $({ countNum: element.text() }).animate({
      countNum: countTo
    },
      {
        duration: 1500,
        easing: 'linear',
        step: function () {
          element.text(Math.floor(this.countNum));
        },
        complete: function () {
          element.text(this.countNum)
          element.parent('.counter').addClass('counted');
        }
      });
  };

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function () {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      if ((element_top_position <= window_bottom_position) /*&& (element_top_position <= window_bottom_position)*/) {
        if ($($element).attr('data-count')) {
          setTimeout(function () {setConter($element)}, 250);
        } else if ($($element).attr("data-chart") == "1") {
          setTimeout(function () {
            //chart1.clear();
            chart1.setOption(options);
          }, 300);
        } else if ($($element).attr("data-chart") == "2") {
          setTimeout(function () {
            //chart2.clear();
            chart2.setOption(options);
          }, 300);
        } else {
          setTimeout(function () {$element.addClass('in-view')}, 250);
        }
      } /*else {
        if ($($element).attr('data-count')) {
          $element.text('0');
          $element.parent('.counter').removeClass('counted');
        } else if ($($element).attr("data-chart") == "1") {
          chart1.clear();
        } else if ($($element).attr("data-chart") == "2") {
          chart2.clear();
        } else {
          $element.removeClass('in-view');
        }
      }*/
    });
  };

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

$(document).ready(function() {
  console.log('Document Ready!');

  var tooltipSlider = document.getElementById('slider-tooltip');
  var tooltipSliderValue = document.getElementById('slider-value');
  noUiSlider.create(tooltipSlider, {
    start: [2000],
    tooltips: [wNumb({ decimals: 0 })],
    step: 500,
    pips: {
      mode: 'range',
      density: 10000
    },
    range: {
      'min': 0,
      'max': 10000
    }
  });
  tooltipSlider.noUiSlider.on('update', function (values, handle) {
    tooltipSliderValue.innerHTML = values[handle];
  });

  $(".twentytwenty-container").twentytwenty({
    no_overlay: true,
    move_with_handle_only: true,
    click_to_move: false
  });

  /*$('#priceTable').owlCarousel({
    thumbs: false,
    center: true,
    dots: false,
    items: 3,
    loop: true,
    smartSpeed: 0,
    responsiveRefreshRate: 0,
    responsive: {
      0: {
        items: 1,
        margin: 1
      },
      769: {
        items: 3
      }
    }
  });*/

  $('#clients').owlCarousel({
    thumbs: true,
    thumbsPrerendered: true,
    thumbItemClass: 'owl-thumb',
    dots: false,
    items: 1,
    //loop: true,
    //smartSpeed: 0,
    responsiveRefreshRate: 0,
  });

  $('input[type=email]').on('focus', function () {
    $(this).parent().addClass('focus')
  });

  $('input[type=email]').on('blur', function () {
    $(this).parent().removeClass('focus')
  });

  $('[data-scrollbar]').mCustomScrollbar({
    theme: "minimal-dark",
    scrollInertia: 250,
    alwaysShowScrollbar: true
  });

  $('[data-mfp-src]').magnificPopup({
    disableOn: 0,
    fixedBgPos: true,
    fixedContentPos: true,
    callbacks: {
      beforeOpen: function () {
        $('html, body').css('overflow', 'hidden');
      },
      beforeClose: function () {
        $('html, body').css('overflow', '');
      },
      open: function () {
        $('[data-scrollbar]').mCustomScrollbar({
          theme: "minimal-dark",
          scrollInertia: 250,
          alwaysShowScrollbar: true
        });
      }
    }
  });

  $('[data-close=modal]').click(function () {
    $.magnificPopup.close();
  });





});