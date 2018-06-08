// function test(day){
// switch(day){
// case sat:
// a=4;
// b=12;
// //var c=document.getElementById("saturday");
// forecast('saturday',a,b);
// break;
// case sun:
// a=13;
// b=20;
// forecast('sunday',a,b);
// break;
// }
// function forecast(id,a,b){
  // function createChart()
  // {
  //   $("button").click(function() {
  //     alert(this.id); // or alert($(this).attr('id'));
  // });
  // }
 
  var tempData;
$('button').click(function(){
  // alert(this.id);
  var a=0;
    var b=7;
  if(this.id=="friday")
  {
    c=a;
    d=b;
  }
  else  if(this.id=="saturday")
  {
    c=a+8;
    d=b+8;
  }
  else if(this.id=="sunday")
  {
    c=a+16;
    d=b+16;
  }
  else if(this.id=="monday")
  {
    c=a+24;
    d=b+24;
  }
  else if(this.id=="tuesday")
  {
    c=a+32;
    d=b+32;
  }
  


    console.log('Button Clicked');
        var cityName = $('#cityInput').val();
        $('table').hide();
        $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=c6692183353a35f1d73dbe6f90af94ba`,
            success: (data) => {
              tempData = data;
              var iconId = tempData.list[0].weather[0].icon;
              var icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
              $('#r1').attr('src', icon);
                console.log('In success callback');
                console.log(data);
                listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
                console.log(listOfDates);
                var len=listOfDates.length;
                console.log(len+"is the length");  

                firstList=listOfDates.slice(c, d);
                // firstlist=listOfDates[0];
                listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
                console.log(listOfTemp.length);
                secondList=listOfTemp.slice(c, d);
                plotChart(secondList  , firstList);
            },
            error: (err) => {
                console.log('In error callback');
                console.log(err);
            }
        });

    var plotChart=function(secondList, firstlist){
        console.log("Button clicked");
        $('#chart-container').show();
        $('#chart').show();
        var cityName=$('#cityInput').val();
//         Highcharts.chart('chart-container', {
//             chart: {
//               type: 'spline'
//             },
//             title: {
//               text: 'Monthly Average Temperature'
//             },
//             subtitle: {
//               text: 'Source: WorldClimate.com'
//             },
//             xAxis: {
//               categories: firstlist
//             },
//             yAxis: {
//               title: {
//                 text: 'Temperature'
//               },
//               labels: {
//                 formatter: function () {
//                   return this.value + '°';
//                 }
//               }
//             },
//             tooltip: {
//               crosshairs: true,
//               shared: true
//             },
//             plotOptions: {
//               spline: {
//                 marker: {
//                   radius: 4,
//                   lineColor: '#666666',
//                   lineWidth: 1
//                 }
//               }
//             },
//             series: [{
//               name: cityName,
             
//               data: secondList
//             }]
//     });
// }
Highcharts.chart('chart-container', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Monthly Average Temperature'
  },
  subtitle: {
    text: 'Source: WorldClimate.com'
  },
  xAxis: {
    categories: firstlist
  },
  yAxis: {
    title: {
      text: 'Temperature (°C)'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    }
  },
  series: [{
    name: cityName,
    data: secondList
  }]
});
    }
})
// chart.options.plotOptions.line.marker.enabled
// $('.highcharts-point highcharts-color-0').click(function(){

//   //  var iconId = tempData.list[0].weather[0].icon;
//   //             var icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
//   //             $('img').attr('src', icon);


// })

