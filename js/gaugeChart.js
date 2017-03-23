    
    function gaugeChart(chartDetail){
      chartDetail = chartDetail || {};
      chartDetail.chartNode = chartDetail.chartNode || "";
      chartDetail.title = chartDetail.title || "Gauge Chart";
      chartDetail.valTitle = chartDetail.valTitle || "kbps";
      chartDetail.dataDelay = chartDetail.dataDelay || "2000";
      chartDetail.dataInit = chartDetail.dataInit || "0";
      chartDetail.data = chartDetail.dataSeries || function(){
          var point,
              newVal,
              inc;

          if (chartSpeed) {
              point = chartSpeed.series[0].points[0];
              inc = Math.round((Math.random() - 0.5) * 100);
              newVal = point.y + inc;

              if (newVal < 0 || newVal > 200) {
                  newVal = point.y - inc;
              }

              point.update(newVal);
          }
      };
      
      var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
      };

      // The speed gauge
      var chartSpeed = Highcharts.chart(chartDetail.chartNode, Highcharts.merge(gaugeOptions, {
          yAxis: {
              min: 0,
              max: 200,
              title: {
                  text: chartDetail.title
              }
          },

          credits: {
              enabled: false
          },

          series: [{
              name: chartDetail.title,
              data: [chartDetail.dataInit],
              dataLabels: {
                  format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                      ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                         '<span style="font-size:12px;color:silver">kbps</span></div>'
              },
              tooltip: {
                  valueSuffix: chartDetail.valTitle
              }
          }]

      }));

      // Bring life to the dials
      var gaugeInterval = setInterval(function () {
          // Speed
          chartDetail.data(chartSpeed);
      }, chartDetail.dataDelay);
      window.intervals.push(gaugeInterval);

    }