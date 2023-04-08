// Function for pushing the data for calculations
function pushData() {
  $(".result").css("visibility","visible");

  // Declaring the local variable
  pages = [];

  // Accessing the variables
  let inputText = document.getElementById("references").value;
  let frames = Number(document.querySelector(".noofframes").value);

  // Handling the excpetions by giving the alerts
  if (
    inputText == "" ||
    inputText == 0 ||
    frames == 0 ||
    frames == "" ||
    frames <= 0
  ) 
  {
    alert("Please enter appropriate data in the fields");
  } 
  else 
  {
    inputText = inputText.trim();                             // Removing the extra spaces from the input string
    inputText = inputText.split(" ");                         // Splitting the numbers of the input string
    inputText = inputText.filter((num) => num.trim() != "");  // Removing the extra spaces in between the input string
    inputText = inputText.filter((num) => Number(num) > -1);  // Removing the negative numbers from the input string
    
    // Storing the input data into the local variable
    for (let i = 0; i < inputText.length; i++) 
    {
      // Typecasting the elements of 'inputText' into Number
      inputText[i] = Number(inputText[i]);
      pages.push(Number(inputText[i]));
    }

    // Declaring and initializing the local variable
    let faults = 0;

    // Function call for getting page faults
    faults = pageFaults(pages, pages.length, frames);

    // Function call for calculations
    buildSchedule(frames, pages, faults);
  }
}

// Function to calculate the number of faults
function pageFaults(pages, n, noOfFrames) 
{
  // Declaring and Initializing local variables
  let data = new Set();
  var indexes = [];
  let r = noOfFrames + 3;
  let tableArr = new Array(r);

  // Storing the input into 'tableArr' table
  for (let i = 0; i < r; i++) {
    tableArr[i] = Array(pages.length + 2).fill(" ");
  }

  // Entering the values into first column of the table
  tableArr[0][0] = "t";
  tableArr[1][0] = "ref";
  for (let i = 2; i < r - 1; i++) tableArr[i][0] = "f";
  tableArr[r - 1][0] = "hit";

  // Entering the index into the table
  for (let j = 0; j <= pages.length; j++) 
  {
    tableArr[0][j + 1] = j;
  }

  // Calculating the number of faults  
  let page_faults = 0;
  for (let i = 0; i < n; i++) 
  {
    tableArr[1][2 + i] = pages[i];      // Entering the input sequence into the table
    let prev_page_faults = page_faults; // Comparing previous page faults and current page faults 
    if (data.size < noOfFrames)         // Condition to check whether all frames are occupied or not
    {
      if (!data.has(pages[i]))          // Condition for fault 
      {
        data.add(pages[i]);             // Adding the sequence member to 'data' variable
        page_faults++;                  // Incrementing the number of page faluts
        indexes.push(pages[i]);         // Pushing the sequence member into 'indexes' variable
      }
    } 
    else 
    {
      if (!data.has(pages[i]))          // Condition for fault
      {
        let val = indexes[0];           // Storing the first element of 'indexes' into 'val' variable
        indexes.shift();                // Removing the first element from 'indexes' variable
        data.delete(val);               // Deleting the sequence memeber from 'data'
        data.add(pages[i]);             // Adding the sequence member to 'data' variable 
        indexes.push(pages[i]);         // Pushing the sequence member into 'indexes' variable
        page_faults++;                  // Incrementing the number of page faluts
      }
    }

    // Entering the symbols at the last row of the table
    if (prev_page_faults === page_faults) // Condition for hit condition
    {
      tableArr[r - 1][i + 2] = "✓";
    } 
    else 
    {
      tableArr[r - 1][i + 2] = "✗";
    }

    // Declaring and Initializing local variables
    let k = indexes.length - 1, ind = 0;
    
    // Entering the output sequence into the table
    while (k >= 0) 
    {
      tableArr[2 + ind][2 + i] = indexes[k];
      ind++;
      k--;
    }
  }

  // Function call for building the table
  buildTable(tableArr, n);
  return page_faults;
}

// Function to build the table
function buildTable(arr, n) 
{
  // Accessing the element
  const part2 = document.querySelector(".part2");
  part2.innerHTML = "";

  // Declaring and initializing the local variables
  var mytable = "<table>";
  let i = 0, j = 0;

  // Traversing and Entering the values into the table
  for (var CELL of arr) 
  {
    mytable += `<tr class="r${i}">`;
    for (var CELLi of CELL) {
      if (CELLi === "✗" || CELLi == "✓") {
        mytable += `<td class="c${j} ${CELLi}">` + CELLi + "</td>";
      } else {
        mytable += `<td class="c${j} ">` + CELLi + "</td>";
      }
      j++;
    }
    j = 0;
    mytable += "</tr>";
    i++;
  }

  // Closing the 'table' tag
  mytable += "</table>";
  part2.innerHTML = mytable;

  // If the values are more then we add a scroll bar to see the table
  if(n>30) {
    $(".part2").css("overflow-x","scroll");
    $(".part2").css("width","95%");
  }
  $(".part2").css("margin-bottom","20px");
}

// Function for calculations
function buildSchedule(frames, pages, faults) 
{
  // Accessing the variables
  const part1 = document.querySelector(".part1");
  part1.innerHTML = "";
  const head = document.createElement("div");
  head.id = "head";
  head.innerHTML = `<h2>Calculations:</h2>`;
  part1.appendChild(head);
  const base = document.createElement("div");
  base.id = "base";

  // Declaring and initializing the local variable
  const count = {};

  pages.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
  });

  const distinctPages = Object.keys(count).length; // Calculating the distinctPages

  // Displaying the calculations
  base.innerHTML = `<ul>
        <li>Total frames: ${frames}</li>
        <li>Reference string length: ${pages.length} references</li>
        <li>String: ${pages}</li>
        <li>Total references: ${pages.length}</li>
        <li>Total distinct references: ${distinctPages}</li>
        <li>Hits: ${pages.length - faults}</li>
        <li>Faults: ${faults}</li>
        <li><b>Hit rate:</b> ${pages.length - faults}/${pages.length} = <b>${(
    (1 - faults / pages.length) *
    100
  ).toFixed(2)}</b>%</li>
        <li><b>Fault rate:</b> ${faults}/${pages.length} = <b>${(
    (faults / pages.length) *
    100
  ).toFixed(2)}</b>%</li>
      </ul>`;

  part1.appendChild(base);
}

// Function to reload the page
function resetPage() {
  location.reload();
}