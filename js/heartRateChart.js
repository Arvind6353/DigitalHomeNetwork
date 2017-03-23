    
    function heartRateChart(chartDetail){
      chartDetail = chartDetail || {};
      chartDetail.chartNode = chartDetail.chartNode || "";
      chartDetail.title = "Bandwidth by Time" ||  chartDetail.title;
      chartDetail.XTitle = chartDetail.XTitle || "";
      chartDetail.YTitle = chartDetail.YTitle || "kbps";
      chartDetail.dataDelay = chartDetail.dataDelay || 1000;
      chartDetail.data = chartDetail.dataSeries || function(series){
          var x = (new Date()).getTime(), // current time
              y = Math.random();
          series.addPoint([x, y], true, true);
      };
      
      Highcharts.setOptions({
          global: {
              useUTC: false
          }
      });

      var chart;
      $(chartDetail.chartNode).highcharts({
          chart: {
              type: 'line',
              animation: Highcharts.svg, // don't animate in old IE
              marginRight: 10,
              events: {
                  load: function() {

                      // set up the updating of the chart each second
                      var series = this.series[0];
                      var rateInterval = setInterval(function() {
                        if(series.chart) {
                          chartDetail.data(series);
                        }
                      }, chartDetail.dataDelay);
                      window.intervals.push(rateInterval);
                  }
              }
          },
          title: {
              text: chartDetail.title
          },
          xAxis: {
              title: {
                  text: chartDetail.XTitle
              },
              type: 'datetime',
              tickPixelInterval: 150
          },
          yAxis: {
              title: {
                  text: chartDetail.YTitle
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              formatter: function() {
                      return '<b>'+ this.series.name +'</b><br/>'+
                      Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                      Highcharts.numberFormat(this.y, 2);
              }
          },
          legend: {
              enabled: false
          },
          exporting: {
              enabled: false
          },
          series: [{
              name: 'Random data',
              data: (function() {
                  // generate an array of random data
                  var data = [],
                      time = (new Date()).getTime(),
                      i;

                  for (i = -19; i <= 0; i++) {
                      data.push({
                          x: time + i * 1000,
                          y: Math.random()
                      });
                  }
                  return data;
              })()
          }]
      });
    }