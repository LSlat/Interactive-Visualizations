function buildMetadata(sample) {

  // The following function builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample  
  d3.json(`/metadata/${sample}`).then(function(data){

    // Use d3 to select the panel with id of `#sample-metadata`
    var choose = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    choose.html("");

    // Use `Object.entries` to add each key and value pair to the panel
       Object.entries(data).forEach(([key, value]) => {
       choose.append('h6').text(`${key}: ${value}`);
      });
  });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    // 
    // var level = data['WFREQ']

    // // Trig to calc meter point
    // var degrees = 180 - level,
    //     radius = .5;
    // var radians = degrees * Math.PI / 180;
    // var x = radius * Math.cos(radians);
    // var y = radius * Math.sin(radians);

    // // Path: may have to change to create a better triangle
    // var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    //     pathX = String(x),
    //     space = ' ',
    //     pathY = String(y),
    //     pathEnd = ' Z';
    // var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // var data = [{ type: 'scatter',
    //   x: [0], y:[0],
    //     marker: {size: 28, color:'850000'},
    //     showlegend: false,
    //     name: 'speed',
    //     text: level,
    //     hoverinfo: 'text+name'},
    //   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    //   rotation: 90,
    //   text: ['8-9','7-8','6-7','5-6','4-5', '3-4', '2-3', '1-2',
    //             '0-1', ''],
    //   textinfo: 'text',
    //   textposition:'inside',
    //   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
    //                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
    //                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
    //                         'rgba(255, 255, 255, 0)','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
    //                         'rgba(170, 202, 42, .5)']},
    //   labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    //   hoverinfo: 'label',
    //   hole: .5,
    //   type: 'pie',
    //   showlegend: false
    // }];

    // var layout = {
    //   shapes:[{
    //       type: 'path',
    //       path: path,
    //       fillcolor: '850000',
    //       line: {
    //         color: '850000'
    //       }
    //     }],
    //   title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    //   height: 500,
    //   width: 500,
    //   xaxis: {zeroline:false, showticklabels:false,
    //             showgrid: false, range: [-1, 1]},
    //   yaxis: {zeroline:false, showticklabels:false,
    //             showgrid: false, range: [-1, 1]}
    // };

// //     Plotly.newPlot('gauge', data, layout);
// // }
// );
};

function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(data) {

      // Get the top ten sample_values, along with otu_ids and otu_labels
      var top_values = data['sample_values'].slice(0,10)
      var top_ids = data['otu_ids'].slice(0,10)
      var top_labels = data['otu_labels'].slice(0,10)

      // Build a Pie Chart
      var data2 = [{
      values: top_values,
      labels: top_ids,
      hovertext: top_labels,
      type: "pie"
      }];
      var layout = {height: 750, width: 800};
    
      Plotly.newPlot("pie", data2, layout);      
      
   // Build a Bubble Chart using the sample data
      var x_value = data['otu_ids']
      var y_value = data['sample_values']
      var hover_labels = data['otu_labels']
      
        var trace1 = [{
        x: x_value,
        y: y_value,
        text: hover_labels,
        mode: 'markers',
        marker: {
          color: x_value, 
          // [
          //   ' aliceblue ',
          //   ' aqua ',
          //   ' aquamarine ',
          //   ' azure ',
          //   ' beige ',
          //   ' rosybrown ',
          //   ' saddlebrown ',
          //   ' salmon ',
          //   ' blue ',
          //   ' blueviolet ',
          //   ' brown ',
          //   ' burlywood ',
          //   ' cadetblue ',
          //   ' chartreuse ',
          //   ' chocolate ',
          //   ' coral ',
          //   ' sandybrown ',
          //   ' royalblue ',
          //   ' crimson ',
          //   ' cyan ',
          //   ' mediumblue ',
          //   ' mediumorchid ',
          //   ' mediumpurple ',
          //   ' mediumseagreen ',
          //   ' mediumslateblue ',
          //   ' mediumspringgreen ',
          //   ' mediumturquoise ',
          //   ' mediumvioletred ',
          //   ' midnightblue ',
          //   ' cornflowerblue ',
          //   ' mistyrose ',
          //   ' moccasin ',
          //   ' red ',
          //   ' navy ',
          //   ' purple ',
          //   ' olive ',
          //   ' olivedrab ',
          //   ' orange ',
          //   ' orangered ',
          //   ' peachpuff ',
          //   ' peru ',
          //   ' yellow ',
          //   ' plum ',
          //   ' dodgerblue ',
          //   ' firebrick ',
          //   ' violet ',
          //   ' forestgreen ',
          //   ' fuchsia ',
          //   ' gainsboro ',
          //   ' turquoise ',
          //   ' gold ',
          //   ' goldenrod ',
          //   ' gray ',
          //   ' grey ',
          //   ' green ',
          //   ' greenyellow ',
          //   ' honeydew ',
          //   ' hotpink ',
          //   ' indianred ',
          //   ' indigo ',
          //   ' tomato ',
          //   ' khaki ',
          //   ' lavender ',
          //   ' lavenderblush ',
          //   ' lawngreen ',
          //   ' pink ',
          //   ' seagreen ',
          //   ' deepskyblue',
          //   ' sienna ',
          //   ' palevioletred ',
          //   ' skyblue ',
          //   ' slateblue ',
          //   ' slategray ',
          //   ' slategrey ',
          //   ' yellowgreen ',
          //   ' springgreen ',
          //   ' steelblue ',
          //   ' tan ',
          //   ' teal ',
          //   ' thistle ',           
          //   ' limegreen '           
          //  ],             
          size: y_value,
          sizemode: 'area',
          // sizeref: (2.* max(y_value)/(y_value**2)),
          // sizeref: (2.* 1600/(1600**2)),
          sizeref: (20*1600/(1600**2)),
          sizemin: 10          
        }
      }];
      var layout = {height: 600, width: 1200};
        
      Plotly.newPlot('bubble', trace1, layout)
     });
    };    

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log("BuildCharts with firstSample")
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
