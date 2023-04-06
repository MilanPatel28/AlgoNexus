var algorithmChart = document.getElementById("Clook-Chart").getContext('2d');
var chart = new Chart(algorithmChart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'LOOK Disk Scheduling Sequence',
      data: [],
      backgroundColor: "skyblue",
      borderColor: "blue",
      borderWidth: 2,
      hoverBackgroundColor: 'skyblue',
      hoverBorderColor: 'black',
      fill: false,
      lineTension: 0,
      pointRadius: 5
    }]
  },
  plugins: [{
    id: "canvas_Background_color",
    beforeDraw: (chart) => {
      const cht = chart.canvas.getContext('2d');
      cht.save();
      cht.globalCompositeOperation = 'destination-over';
      cht.fillStyle = 'lightblue';
      cht.fillRect(0, 0, chart.width, chart.height);
      cht.restore();
    }
  }],
  options: {
    title: {
      display: true,
      position: "top",
      text: "Look Algorithm Graph",
      fontSize: 20,
      fontColor: "green"
    },
    layout: {
      padding: 10
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "black",
          boxWidth: 42,
        },
        title: {
          color: "yellow"
        }
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        position: 'top',
        max: 100,
        grid: {
          color: 'red',
          borderColor: 'grey',
          tickColor: 'red'
        },
        ticks: {
          color: 'red',
        }
      },
      y: {
        grid: {
          display: false,
          color: 'red',
          borderColor: 'red',
          tickColor: 'red'
        },
        ticks: {
          color: 'red',
        }
      }
    },
  }
});

// Declaring the variables to keep a count of points added, and once added we enable the buttons again
let enablelook = 0;
let enableclook = 0;

// This function is run when we click to execute Look Process
function LookExecute() 
{
  enablelook = 0;
  if(look() === false) return;

  // Reversing the seekSequence array
  seekSequence.reverse();

  // Then inserting the head position into it
  seekSequence.push(headPosition);

  // Reversing the seekSequence array
  seekSequence.reverse();
  let n = seekSequence.length;
  
  // Clearing the previously added points on the chart
  clearPoints(chart);

  // Setting the size of the axis of our chart to the diskSize
  chart.options.scales.x.max = diskSize;

  for (let i=0; i<n; i++) {
    chart.data.labels.push(i); // Push values to the chart data
  }
  chart.update(); // After the values are pushed we update the chart
  
  // Adding the points to the chart
  for (let i=0; i<n; i++) 
  {
    // Function to add the points into the chart, each point is added after a certain time interval
    setTimeout(function() 
    {
      enablelook++;
      addPoints(chart, seekSequence[i], enablelook, n);
    }, 1000*i);
  }
}


function C_LookExecute()
{
  enableclook = 0;
  if(clook() === false) return;
  // Reversing the seekSequence array
  seekSequence.reverse();

  // Then inserting the head position into it
  seekSequence.push(headPosition);

  // Reversing the seekSequence array
  seekSequence.reverse();
  let n = seekSequence.length;

  // Clearing the previously added points on the chart
  clearPoints(chart);

  // Setting the size of the axis of our chart to the diskSize
  chart.options.scales.x.max = diskSize;

  for (let i=0; i<n; i++) {
    chart.data.labels.push(i); // Push values to the chart data
  }
  chart.update(); // After the values are pushed we update the chart
  
  // Adding the points to the chart
  for (let i=0; i<n; i++) 
  {
    // Function to add the points into the chart, each point is added after a certain time interval
    setTimeout(function() 
    {
      enableclook++;
      addPoints(chart, seekSequence[i], enableclook, n);
    }, 1000*i);
  }
}

// Function to clear the points of the chart
function clearPoints(chart) 
{
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  chart.update();
}

// Function to add points to the chart
function addPoints(chart, seekSeqce, temp, n) 
{
  chart.data.datasets[0].data.push(seekSeqce);
  chart.update();
  
  // after all the points are added to the chart, enable the buttons
  if(temp==n) 
  {
    $("#btn-clook").prop("disabled", false);
    $("#btn-look").prop("disabled", false);
  }
}