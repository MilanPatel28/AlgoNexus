// Declaring the global variables
const maxRows = 20;
const minRows = 1;

var seekSequence = [];
var seekTime = 0;
var headPosition;
var diskSize = 0;

// Function to take inputs
function takeInput() 
{
  // Declaring and Accessing some variables
  var table = document.getElementById("req-seq");
  var count = table.rows.length;
  var arr = [];
  
  // Taking the inputs and storing it into array
  for (let i = 1; i < count; i++) {
    var inpId = "req-seq" + i;
    arr[i] = document.getElementById(inpId).value;
    let num = parseInt(arr[i]);
    
    // Handling the exceptions
    if (!Number.isInteger(num)) {
      alert(
        "Please enter Integer value in #" +
          i +
          " textbox of Request Position Column."
      );
      return undefined;
    }
    if (num > diskSize || num < 0) {
      alert("Invalid Request at Position #" + i + ".");
      return undefined;
    }
  }
  return arr;
}

// Function to add Rows in input table
function addRow() 
{

  // Accessing the table
  var table = document.getElementById("req-seq"); 
  
  // Counting the length of table
  var count = table.rows.length; 
  
  // Disabling the remove row button, if there is only one row left
  if (count == minRows + 1) 
  { 
    var removeBtn = document.getElementById("remove");
    removeBtn.disabled = false;
  }

  // Disabling the add row button, if there 20 rows already
  if (count == maxRows) 
  {
    var addBtn = document.getElementById("add");
    addBtn.disabled = true;
  }

  // Handling the exception
  if (count < minRows + 1 || count > maxRows) return;

  // Adding the new row into the table and storing it in variable
  var row = table.insertRow(count);
  var th = document.createElement("th");

  // Assigning the count to newly added row
  th.innerHTML = count;
  th.scope = "row";

  // Accessing the 'td' element 
  var td = document.createElement("td");

  // Accessing the input element
  var input = document.createElement("input");
  input.type = "text";
  input.id = "req-seq" + count;

  // Appending the new child row into the table
  td.appendChild(input);
  row.appendChild(th);
  row.appendChild(td);
}

// Function to remove the row from input table
function removeRow() 
{

  // Accessing the table
  var table = document.getElementById("req-seq");

  // Counting the length of table
  var count = table.rows.length;
  
  // Decresing the count variable, as one row is going to be removed
  count--;

  // Disabling the add row button, if there are 20 rows already
  if (count == maxRows) 
  {
    var addBtn = document.getElementById("add");
    addBtn.disabled = false;
  }

  // Desabling the  remove row button, if there is only one row left
  if (count == minRows + 1) 
  {
    var removeBtn = document.getElementById("remove");
    removeBtn.disabled = true;
  }

  // Handling the exception
  if (count < minRows + 1 || count > maxRows) return;
  
  // Deleting the row from the table
  table.deleteRow(count);
}

// Function for C-LOOK calculation
function clook() {

  // Declaring and Accessing the variables
  var headPos = 0;
  headPos = document.getElementById("head-pos").value;
  diskSize = document.getElementById("disk-size").value;
  headPos = parseInt(headPos);
  headPosition = headPos;
  
  // Typecasting the disksize into integer
  diskSize = parseInt(diskSize);

  // Handling the exceptions by giving the alerts
  if (!Number.isInteger(headPos) || !Number.isInteger(diskSize)) 
  {
    alert("Please enter an Integer in Disk Size and Head Position.");
    return false;
  }
  
  if (headPos < 0 || diskSize < 0) 
  {
    alert("Invalid Input, Disk Size or Head Position should not be negative.");
    return false;
  }
  
  if (headPos > diskSize) 
  {
    alert(
      "Invalid Head Position. Head Position should be less than or equal to Disk Size."
    );
    return false;
  }

  // Accessing some variables
  var direction = document.getElementById("Right").checked;
  
  // Storing the inputs into 'arr' variable
  var arr = takeInput();
  if (arr === undefined) return false;

  // Disabling the execution buttons while process in running
  $("#btn-clook").prop("disabled", true);
  $("#btn-look").prop("disabled", true);

  // Storing answer into 'answer' varible
  var answer = clookScheduling(arr, headPos, direction);
  
  // Accessing variables
  var result = document.getElementById("result");
  var seekCnt = document.createElement("p");
  
  // Displaying Total Seek Count and Seek Sequence
  seekCnt.innerHTML = "Total Seek Count: " + answer.seekCount;
  var seekSq = document.createElement("p");
  seekSq.innerHTML = "Seek Sequence: " + answer.seekSeq;
  result.innerHTML = "";

  // Switching the visibility from hidden to visible
  $(".output").css("visibility", "visible");

  // Adding Seek Count and Seek Sequnce into 'result' variable
  result.appendChild(seekCnt);
  result.appendChild(seekSq);
  seekSequence = answer.seekSeq;
  seekTime = answer.seekCount;
}

// Function to reload the page
function resetPage() 
{
  location.reload();
}

// function for LOOK calculation
function look() 
{
  // Accessing and Declaring variables
  var headPos = 0;
  headPos = document.getElementById("head-pos").value;
  diskSize = document.getElementById("disk-size").value;
  
  // Typecasting the head position into integer
  headPos = parseInt(headPos);
  headPosition = headPos;

  // Typecasting the disksize int integer
  diskSize = parseInt(diskSize);

  // Handling the exceptions by giving the alerts
  if (!Number.isInteger(headPos) || !Number.isInteger(diskSize)) 
  {
    alert("Please enter an Integer in Disk Size and Head Position.");
    return false;
  }
  
  if (headPos < 0 || diskSize < 0) 
  {
    alert("Invalid Input, Disk Size or Head Position should not be negative.");
    return false;
  }
  
  if (headPos > diskSize) 
  {
    alert(
      "Invalid Head Position. Head Position should be less than or equal to Disk Size."
    );
    return false;
  }

  // Accessing variables
  var direction = document.getElementById("Right").checked;
  
  
  // Storing the inputs into 'arr' variable 
  var arr = takeInput();
  if (arr === undefined) return false;

  // Desabling the execution buttons while process in running
  $("#btn-clook").prop("disabled", true);
  $("#btn-look").prop("disabled", true);

  // Storing answer into 'answer' varible
  var answer = lookScheduling(arr, headPos, direction);

  // Accessing variables
  var result = document.getElementById("result");
  var seekCnt = document.createElement("p");

  // Displaying Total Seek Count and Seek Sequence
  seekCnt.innerHTML = "Total Seek Count: " + answer.seekCount;
  var seekSq = document.createElement("p");
  seekSq.innerHTML = "Seek Sequence: " + answer.seekSeq;
  result.innerHTML = "";

  // Switching the visibility from hidden to visible
  $(".output").css("visibility", "visible");

  // Adding Seek Count and Seek Sequence into 'result' variable
  result.appendChild(seekCnt);
  result.appendChild(seekSq);
  seekSequence = answer.seekSeq;
  seekTime = answer.seekCount;
}

// Function for Mathematical Calculation of C-LOOK 
function clookScheduling(arr, headPos, direction) 
{
  // Declaring and Initializing Variables
  var seekCount = 0;
  var left = [],
    right = [],
    seekSeq = [];
  
  // Storing the input sequence into two arrays 
  for (let i = 0; i < arr.length; i++) 
  {
    // If sequence member is equal or smaller than head position, it will be stored in left array 
    if (arr[i] <= headPos) 
    {
      left.push(arr[i]);
    } 
    else if (arr[i] > headPos)   // If sequence member is larger than head position, it will be stored in right array
    {
      right.push(arr[i]);
    }
  }
  
  // Sorting both the arrays
  left.sort(function (a, b) 
  {
    return a - b;
  });
  
  right.sort(function (a, b) 
  {
    return a - b;
  });

  // means the direction is right (moving from left to right)
  if (direction == true) 
  {
    // Storing the sequence, if left array is empty
    if(left.length==0) 
    {
      seekCount = (right[right.length - 1] - headPos);
      seekSeq = right;
    } 
    // Storing the sequence, if right array is empty
    else if (right.length==0) 
    {
      seekCount = (headPos - left[0]) + (left[left.length-1] - left[0]);
      seekSeq = left;
    }
    else 
    { 
      // Storing the sequence, if both the arrays are non-empty
      seekCount = (right[0] - headPos) + (right[right.length-1] - right[0]) + (right[right.length-1] - left[0]) + (left[left.length-1] - left[0]);
      seekSeq = right.concat(left);
    }
  } 
  else 
  {
    // Storing the sequence, if left array is empty
    if(left.length == 0) 
    {
      var revRight = right.reverse();
      seekCount = revRight[revRight.length - 1] - headPos;
      seekSeq = revRight;
    }
    // Storing the sequence, if right array is empty
    else if(right.length == 0) 
    {
      var revLeft = left.reverse();
      seekCount = headPos - revLeft[revLeft.length - 1];
      seekSeq = revLeft;
    }
    else 
    {
      // Storing the sequence, if both the arrays are non-empty
      seekCount = (headPos - left[0]) + (right[right.length-1] - left[0]) + (right[right.length-1] - right[0]);
      seekSeq = (left.reverse()).concat(right.reverse());
    }
  }
  return { 
    seekCount, seekSeq 
  };
}

// Function for Mathematical Calculation of LOOK
function lookScheduling(arr, headPos, direction) 
{
  // Declaring and Initializing Variables
  var seekCount = 0;
  var left = [],
    right = [],
    seekSeq = [];

  // Storing the input sequence into two arrays
  for (let i = 0; i < arr.length; i++) 
  {
    // If sequence member is equal or smaller than head position, it will be stored in left array
    if (arr[i] <= headPos) 
    {
      left.push(arr[i]);
    } 
    else if (arr[i] > headPos)  // If sequence member is larger than head position, it will be stored in right array
    {
      right.push(arr[i]);
    }
  }

  // Sorting both the arrays
  left.sort(function (a, b) 
  {
    return a - b;
  });

  right.sort(function (a, b) 
  {
    return a - b;
  });


  // means the direction is right (moving from left to right)
  if (direction == true) 
  {
    // Storing the sequence, if left array is empty
    if(left.length == 0) {
      seekCount = (right[right.length - 1] - headPos);
      seekSeq = right;
    }
    // Storing the sequence, if right array is empty
    else if (right.length == 0) {
      var revLeft = left.reverse();
      seekCount = (headPos - revLeft[revLeft.length - 1]);
      seekSeq = left;
    }
    // Storing the sequence, if both the arrays are non-empty
    else 
    {
      var revLeft = left.reverse();
      seekCount = (right[right.length-1] - headPos) + (right[right.length-1] - revLeft[0]) + (revLeft[0] - revLeft[revLeft.length-1]);
      seekSeq = right.concat(revLeft);
    }
  } 
  else 
  {
    // if the left array is empty
    if(left.length == 0) 
    {
      seekCount = (right[right.length - 1] - headPos);
      seekSeq = right;
    }
    // if the right array is empty
    else if (right.length == 0) 
    {
      var revLeft = left.reverse();
      seekCount = (headPos - revLeft[revLeft.length - 1]);
      seekSeq = left;
    }
    // if the both arrays are non empty
    else 
    {
      var revLeft = left.reverse();
      seekSeq = revLeft.concat(right);
      seekCount = (headPos - revLeft[revLeft.length-1]) + (right[right.length - 1] - revLeft[revLeft.length - 1]);
    }
  }
  return { 
    seekCount, seekSeq 
  };
}