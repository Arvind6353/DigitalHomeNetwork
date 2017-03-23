
window.intervals = [];

var appModule = angular.module('myApp', ['ui.bootstrap', "ngRoute"]);

appModule.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "js/template/login.html"
    })
    .when("/login", {
        templateUrl : "js/template/login.html"
    })
    .when("/main", {
        templateUrl : "js/template/main.html",
        controller: "mainCtrl"
    })
    .otherwise({
        templateUrl : "js/template/login.html"
    });
});

appModule.controller('mainCtrl', ['$scope', function($scope) {

    $scope.ispFinishLoading = function() {
        $scope.today = new Date();
        $scope.isConnected = true;
        $scope.toggleConnection = function() {
            $scope.isConnected = !$scope.isConnected;
        }
        gaugeChart({
            "chartNode": $(".gaugeContainer1")[0],
            "title": "Upload Data",
            "valTitle": "kbps",
            "dataInit": 80,
            "dataDelay": 1000,
            "dataSeries": function(chartSpeed) {
                var point,
                    newVal,
                    inc;

                if (chartSpeed && chartSpeed.series) {
                    point = chartSpeed.series[0].points[0] || 0;
                    inc = Math.round((Math.random() - 0.5) * 100);
                    newVal = point.y + inc;

                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }
                    if ($scope.isConnected) {
                        point.update(newVal);
                    } else {
                        point.update(0);
                    }
                }
            }
        });
        gaugeChart({
            "chartNode": $(".gaugeContainer2")[0],
            "title": "Download Data",
            "valTitle": "kbps",
            "dataInit": 80,
            "dataDelay": 1000,
            "dataSeries": function(chartSpeed) {
                var point,
                    newVal,
                    inc;

                if (chartSpeed && chartSpeed.series) {
                    point = chartSpeed.series[0].points[0];
                    inc = Math.round((Math.random() - 0.5) * 100);
                    newVal = point.y + inc;

                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    if ($scope.isConnected) {
                        point.update(newVal);
                    } else {
                        point.update(0);
                    }
                }
            }
        });
        gaugeChart({
            "chartNode": $(".gaugeContainer3")[0],
            "title": "Upload Speed",
            "valTitle": "kbps",
            "dataInit": 80,
            "dataDelay": 1000,
            "dataSeries": function(chartSpeed) {
                var point,
                    newVal,
                    inc;

                if (chartSpeed && chartSpeed.series) {
                    point = chartSpeed.series[0].points[0];
                    inc = Math.round((Math.random() - 0.5) * 100);
                    newVal = point.y + inc;

                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    if ($scope.isConnected) {
                        point.update(newVal);
                    } else {
                        point.update(0);
                    }
                }
            }
        });
        gaugeChart({
            "chartNode": $(".gaugeContainer4")[0],
            "title": "Download Speed",
            "valTitle": "kbps",
            "dataInit": 80,
            "dataDelay": 1000,
            "dataSeries": function(chartSpeed) {
                var point,
                    newVal,
                    inc;

                if (chartSpeed && chartSpeed.series) {
                    point = chartSpeed.series[0].points[0];
                    inc = Math.round((Math.random() - 0.5) * 100);
                    newVal = point.y + inc;

                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    if ($scope.isConnected) {
                        point.update(newVal);
                    } else {
                        point.update(0);
                    }
                }
            }
        });
    }

    $scope.deviceFinishLoading = function() {
        $('#datetimepicker1, #datetimepicker2').datetimepicker({
            "showClose" : true,
            "keepOpen" : true,
            "defaultDate": new Date()
        });
        $(".deviceExportBtn").click(function() {
            var data = [];
            $(".accordNoData div").text("");
            var tableBodyElem = $(this).parents("#device").find("table thead, table tbody");
            for (var i = 0; i < tableBodyElem.length; i++) {
                data.push([]);
                var tempElem = tableBodyElem.eq(i).find("tr:first").find("td,th");
                for (var j = 0; j < tempElem.length; j++) {
                    data[i].push((tempElem.eq(j).text()).trim());
                }
            }
            exportAsCSV(data, "deviceData");
            $(".accordNoData div").text("No Data Available");
        });
        $scope.tableAccordObj2 = {
            //data : sampledata
            "dataUrl": "js/data/device.json",
            "startDate": "devStartDate",
            "endDate": "devEndDate",
            "connectStatus": "isDevConnected",
            "layout": [{
                field: 'deviceName',
                name: "Device Name"
            }, {
                field: 'deviceVendor',
                name: "Device Vendor"
            }, {
                field: 'deviceIp',
                name: "Device IP"
            }, {
                field: 'bandwidth',
                name: "Bandwidth Used"
            }, {
                field: 'deviceAppCount',
                name: "Application Count"
            }, {
                field: 'deviceCategory',
                name: "Categories"
            }, {
                field: 'loggedTime',
                name: "Time"
            }, {
                field: 'isConnected',
                name: "Status"
            }],
            "innerDivHtml": './js/TableAccord/tableAccordInner.html',
            "innerDivScript": function(row, index, head, id, that) {
                var topN = [];
                var cat = [];
                for( var tn = 0; tn < row.application.length; tn++ ){
                    var temp = [row.application[tn].name, parseInt(row.application[tn].data)];
                    topN.push(temp);
                    cat.push(row.application[tn].name);
                }
                barChart({
                    "chartNode": $('#device .barContainer').eq(that.$index)[0],
                    "title": "Top N Applications",
                    "XTitle": "Application",
                    "XCat": cat,
                    "YTitle": "MBPS",
                    "data": topN
                });
                heartRateChart({
                    "chartNode": $('#device .heartRateContainer').eq(that.$index)[0],
                    "title": row[head[0].field],
                    "dataDelay": 1000,
                    "dataSeries": function(series) {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        if ($scope.isConnected && row.isConnected == "Connected") {
                            series.addPoint([x, y], true, true);
                        } else {
                            series.addPoint([x, 0], true, true);
                        }
                    }
                });
            }
        };
        $(".deviceSearchBtn").click(function() {
            var devStartDate = $("#datetimepicker1 input").val();
            var devEndDate = $("#datetimepicker2 input").val();
            var statusVal = $(".connectDeviceStatus").val();
            if ((new Date(devEndDate) - new Date(devStartDate)) < 0) {
                alert("Start Date cannot be less then End Date.");
            } else {
                $scope.devStartDate = devStartDate;
                $scope.devEndDate = devEndDate;
                $scope.isDevConnected = statusVal;
                $scope.$apply();
            }
            //$scope.tableAccordObj2.refresh( shuffle( $scope.tableAccordObj2.data ) );
        });
        $(".deviceResetBtn").click(function() {
            $("#datetimepicker1 input").val("");
            $("#datetimepicker2 input").val("");
            $(".connectDeviceStatus").val("");
            $(".deviceSearchBtn").trigger("click");
        });
    }

    $scope.appFinishLoading = function() {
        $('#datetimepicker3, #datetimepicker4').datetimepicker({
            "showClose" : true,
            "keepOpen" : true,
            defaultDate: new Date()
        });
        $(".appExportBtn").click(function() {
            $(".accordNoData div").text("");
            var data = [];
            var tableBodyElem = $(this).parents("#application").find("table thead, table tbody");
            for (var i = 0; i < tableBodyElem.length; i++) {
                data.push([]);
                var tempElem = tableBodyElem.eq(i).find("tr:first").find("td,th");
                for (var j = 0; j < tempElem.length; j++) {
                    data[i].push((tempElem.eq(j).text()).trim());
                }
            }
            exportAsCSV(data, "applicationData");
            $(".accordNoData div").text("No Data Available");
        });
        var topN = [["Moto Phone",10],["HP Laptop",40],["HP System",60],["PS4",20],["Sony Phone",100]];
        var cat = ["Moto Phone", "HP Laptop", "HP System", "PS4", "Sony Phone"];
        barChart({
            "chartNode": $(".appBarContainer")[0],
            "title": "Top Application By Data Usage",
            "XTitle": "Device",
            "XCat": cat,
            "YTitle": "MBPS",
            "data": topN
        });
        pieChart({
            "chartNode": $(".appPieContainer")[0],
            "title": "Top Application Accessed",
            "data": [{
                name: 'Microsoft',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        });
        $scope.tableAccordObj3 = {
            //data : sampledata
            "dataUrl": "js/data/app.json",
            "startDate": "appStartDate",
            "endDate": "appEndDate",
            "connectStatus": "isAppConnected",
            "layout": [{
                field: 'appName',
                name: "Application"
            }, {
                field: 'deviceTopN',
                name: "Device"
            }, {
                field: 'bandwidth',
                name: "Data Used"
            }, {
                field: 'deviceCount',
                name: "Device Count"
            }, {
                field: 'loggedTime',
                name: "Time"
            }],
            "innerDivHtml": './js/TableAccord/tableAccordInner.html',
            "innerDivScript": function(row, index, head, id, that) {
                var topN = [];
                var cat = [];
                for( var tn = 0; tn < row.device.length; tn++ ){
                    var temp = [row.device[tn].name, parseInt(row.device[tn].data)];
                    topN.push(temp);
                    cat.push(row.device[tn].name);
                }
                barChart({
                    "chartNode": $('#application table-accord .barContainer').eq(that.$index)[0],
                    "title": "Top N Devices",
                    "XTitle": "Device",
                    "XCat": cat,
                    "YTitle": "MBPS",
                    "data": topN
                });
                heartRateChart({
                    "chartNode": $('#application .heartRateContainer').eq(that.$index)[0],
                    "title": row[head[0].field],
                    "dataDelay": 1000,
                    "dataSeries": function(series) {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        if ($scope.isConnected) {
                            series.addPoint([x, y], true, true);
                        } else {
                            series.addPoint([x, 0], true, true);
                        }
                    }
                });
            }
        };
        $(".appSearchBtn").click(function() {
            var appStartDate = $("#datetimepicker3 input").val();
            var appEndDate = $("#datetimepicker4 input").val();
            if ((new Date(appEndDate) - new Date(appStartDate)) < 0) {
                alert("Start Date cannot be less then End Date.");
            } else {
                $scope.appStartDate = appStartDate;
                $scope.appEndDate = appEndDate;
                $scope.$apply();
            }
            // $scope.tableAccordObj3.refresh( shuffle( $scope.tableAccordObj3.data ) );
        });
        $(".appResetBtn").click(function() {
            $("#datetimepicker3 input").val("");
            $("#datetimepicker4 input").val("");
            $(".appSearchBtn").trigger("click");
        });
    }

    function exportAsCSV(data, filename) {
        data = data || [
            []
        ];
        filename = filename ? filename + ".csv" : "my_data.csv";
        var dataSample = [
            ["name1", "city1", "some other info"],
            ["name2", "city2", "more info"]
        ];
        var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(infoArray, index) {

            dataString = infoArray.join(",");
            csvContent += index < infoArray.length ? dataString + "\n" : dataString;

        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);

        link.click(); // This will download the data file named "my_data.csv".
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}]);

appModule.filter("dateFilter", dateFilter);
function dateFilter() {
    return function(input, start, end, scope) {
        start = start ? scope.$eval(start) : start;
        end = end ? scope.$eval(end) : end;
        var inputDate = new Date(input),
            startDate = new Date(start),
            endDate = new Date(end),
            result = [];
        if (!start) {
            return input;
        }

        for (var i = 0, len = input.length; i < len; i++) {
            inputDate = new Date(input[i].loggedTime);
            if (startDate < inputDate && inputDate < endDate) {
                result.push(input[i]);
            }
        }
        return result;
    };   
};