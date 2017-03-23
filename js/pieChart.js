
    function pieChart(chartDetail){
      chartDetail = chartDetail || {};
      chartDetail.chartNode = chartDetail.chartNode || "";
      chartDetail.title = chartDetail.title || "Pie Chart";
      chartDetail.subTitle = chartDetail.subTitle || "";
      chartDetail.data = chartDetail.data || [];
      //console.log(chartDetail);
      Highcharts.chart(chartDetail.chartNode, {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: chartDetail.title
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  }
              }
          },
          series: [{
              name: chartDetail.subTitle,
              colorByPoint: true,
              data: chartDetail.data
            }]
      });
    }