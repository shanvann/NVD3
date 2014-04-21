//var fileName = "AVG_debug13.csv";
var fileName = "attn_sweep_2014-04-16_rx18_C_MBRd8f5359b54_80b0459a2_debug13_80211.csv" 
var promise = getParseCSVdata(fileName);
var x_axis_label = 'Time (ms)';
var tered = getPlotData(promise,x_axis_label);

function getPlotData(promise,x_axis_label){
promise.success(function (data) {
	var output_json = csvjson.csv2json(data, {delim: ",",textdelim: "\""});
	plotData = dataToPlot(output_json);
//<script src='readFileAsCsv.js' type='text/javascript'> </script>
/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var chart = nv.models.multiChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;

  chart.xAxis     //Chart x-axis settings
      .axisLabel(x_axis_label)
      .tickFormat(d3.format(',r'));
  
  chart.yAxis1
        .tickFormat(d3.format(',.1f'));

  chart.yAxis2
        .tickFormat(d3.format(',.1f'));

  //chart.yAxis     //Chart y-axis settings
  //    .axisLabel('Rate (mbps)')
  //    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  alert(JSON.stringify(plotData));
  var myData = plotData;   //You need data...

  d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
});
}
/**************************************
 * Simple test data generator
 */
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }
  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}

function getParseCSVdata(fileName){
	return $.ajax({
		type: "GET",
    	url: fileName,
    	datatype: "text"
  	});	
}

function dataToPlot(output_json){
	var result1 = [], result2 = [];
	for (var i = 0; i < output_json.rows.length; i++) {
    result1.push({x: output_json.rows[i]["times"], y: output_json.rows[i].tot_rx_bw});
    result2.push({x: output_json.rows[i]["times"], y: output_json.rows[i]["attn1"]});
	}

	return [
    {
      values: result1,      //values - represents the array of {x,y} data points
      key: 'Sine1 Wave', //key  - the name of the series.
      color: '#ff7f0e',  //color - optional: choose your own line color.
      area: false
    },
    {
      values: result2,      //values - represents the array of {x,y} data points
      key: 'Sine2 Wave', //key  - the name of the series.
      color: '#ff7f0e',  //color - optional: choose your own line color.
      area: false
    }
    ];
}
