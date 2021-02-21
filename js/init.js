var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  console.log("TAB" + n)
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "Get Started!"
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 2)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else if (n == x.length -1 ){
    entries = getAllEntries();
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    displayPounds(entries)
    displayRecommendations(entries)
  }else {
    if(n != 0){
      document.getElementById("nextBtn").innerHTML = "Next";
    } 
  }
  console.log(x.length)
  console.log(n)
  // ... and run a function that displays the correct step indicator:
  //fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  console.log(currentTab)
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    //document.getElementById("regForm").submit();
    console.log(document.getElementsByName("formentry"))
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select");
  console.log(y.value)
  for( i = 0; i < y.length; i++){
    console.log(y[i].value);
  }
  for( i = 0; i < z.length; i++){
    console.log(z[i].value);
  }
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  //if (valid) {
  //  document.getElementsByClassName("step")[currentTab].className += " finish";
  //}
  return valid; // return the valid status
}
/*
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}*/
function getAllEntries(){
  y = document.getElementsByTagName("input")
  z = document.getElementsByTagName("select")
  entries = []
  for(i = 0; i < 3; i++){
    entries.push(y[i].value)
  }
  entries.push(z[0].value)
  for(i = 3; i < y.length; i++){
    entries.push(y[i].value)
  }
  console.log("ENTRIES" + entries)
  return entries
}

function displayPounds(formData)
{
 
  vehicle = formData[1] * formData[2]  * 19.6
  if(formData[3] == "yes"){
    vehicle = vehicle * 99.96
  }

  //on average: planes emit 90kg/198.416lbs of CO2 per hour of flight time

  travel = formData[4] * 198.416;
  electricity = (formData[7] / 0.1188) * 947.2 * 12

  var pounds = (vehicle + electricity + travel).toLocaleString();
  let to_write = "Your annual CO<sub>2</sub> emissions are: " + pounds + " lbs";
  document.getElementById("co2").innerHTML = to_write;

}

function displayRecommendations(formData){
  
let recommendations= [];


// Currently the array is: 

    // [0: zipcode, 1: mpg of car, 2: # of miles driven in a week, 3: car maintenance, 4: travel/year
    // 5: # lightbulbs, 6: daily light consumption, 7: # times AC was used, 8: elec bill, 9: water bill ]
if (formData[2] > 300){
  recommendations.push("<li>You drove " + formData[2] + 
  " miles this week. Consider opting for more public transportation.</li>")
}

if (formData[4] > 40){
  recommendations.push("<li>On average, you spend " + formData[4] + 
  " hours flying per year. Consider looking into more efficient flightpaths for your trips.</li>")
}

if (formData[5] > 30){
  recommendations.push("<li>You are currently using " + formData[5] + 
  " lightbulbs. Consider using lightbulbs with a lower wattage.</li>")
}

if (formData[7] > 20){
  recommendations.push("<li>You used the AC/Heater " + formData[7] + 
  " times this week. Consider turning up the thermostat by a few degrees.</li>")
}

if (formData[8] > 150){
  recommendations.push("<li>You spent $" + formData[8] + 
  " on electricity this month. Consider using energy star appliances.</li>")
}
if (formData[9] > 150){
  recommendations.push("<li>You spent $" + formData[9] + 
  " on water this month. Consider taking quicker showers.</li>")
}

if (recommendations.length == 0){
  document.getElementById("first").innerHTML = "Congrats! Your CO<sub>2</sub> emissions are lower than the national average."
}
for(let i=0; i<recommendations.length; i++) 
  {
      if (i == 0){
        document.getElementById("first").innerHTML = recommendations[i]
      }
      else{
      document.getElementById("first").innerHTML += recommendations[i]
      }
  }
      
}