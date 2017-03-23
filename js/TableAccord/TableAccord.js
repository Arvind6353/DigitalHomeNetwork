
    appModule.directive('tableAccord', function($http, $compile) {
      return {
        templateUrl: './js/TableAccord/TableAccord.html',
        scope: true,
        link: function(scope, iElement, iAttrs, $scope) {
          scope.attrValue = iAttrs.value;
          scope.tableAccordDetails = scope[iAttrs.value] || {};
          scope.tableAccordDetails.data = scope.tableAccordDetails.data || [];
          scope.tableAccordDetails.dataUrl = scope.tableAccordDetails.dataUrl || "";
          if( scope.tableAccordDetails.dataUrl ){
            $http.get(scope.tableAccordDetails.dataUrl)
            .success( function(response, status, headers, config) {
                 //console.log(response);
                 scope.tableAccordDetails.data = response;
                 scope.dataInit();
            })
            .error(function(errResp) {
                 console.log("error fetching url");
            });
          }
          else{
            scope.dataInit();
          }
          scope.dataInit = function(options){
              options = options || {};
              scope.tableAccordArr = scope.tableAccordDetails.data;
              scope.objLength = scope.tableAccordDetails.layout.length ? ( scope.tableAccordDetails.layout.length || 1 ) : 1 ;
              scope.disSearch = {};
              scope.sortType = ''; 
              scope.sortReverse = false;
              scope.$watch(scope.tableAccordDetails.connectStatus, function() { 
                var connectStatus = scope[scope.tableAccordDetails.connectStatus];
                  scope.disSearch.isConnected = connectStatus;
              });
              scope.tableAccordDetails.refresh = function(data){
                scope.tableAccordDetails.data = data || scope.tableAccordDetails.data;
                scope.dataInit({"isRefresh":true});
                scope.$apply();
                // $compile(iElement)(scope);
              }
              scope.sortClick = function($event, head){
                scope.sortType = head.field;
                scope.sortReverse = !scope.sortReverse;
              };
              scope.expandRow = function($event, row){
                var that = $event.currentTarget;
                var firstTd = $(that).find(".tdFirst");
                if( !firstTd.hasClass("tdDownArrow") ){
                  firstTd.addClass("tdDownArrow");
                }
                else{
                  firstTd.removeClass("tdDownArrow");
                }
                $(that).next().fadeToggle();
                $(that).next().find(".innerDiv").slideToggle();
                setTimeout(function(){ window.dispatchEvent(new Event('resize')); },300);
                //console.log(row);
              };
          };
        }
      };
    })