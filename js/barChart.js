
    function barChart(chartDetail){
      chartDetail = chartDetail || {};
      chartDetail.chartNode = chartDetail.chartNode || "";
      chartDetail.title = chartDetail.title || "Bar Chart";
      chartDetail.subTitle = chartDetail.subTitle || "";
      chartDetail.XTitle = chartDetail.XTitle || "";
      chartDetail.XCat = chartDetail.XCat || [];
      chartDetail.YTitle = chartDetail.YTitle || "";
      chartDetail.bottomTitle = chartDetail.bottomTitle || "Chart";
      chartDetail.data = chartDetail.data || [];
      //console.log(chartDetail);
      Highcharts.chart(chartDetail.chartNode, {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: chartDetail.title
        },
        subtitle: {
            text: chartDetail.subTitle
        },
        xAxis: {
            categories: chartDetail.XCat,        
            title: {
                text: chartDetail.XTitle
            }
        },
        yAxis: {
            title: {
                text: chartDetail.YTitle
            }
        },
        series: [{
            name: chartDetail.bottomTitle,
            data: chartDetail.data
        }]
      });
    }