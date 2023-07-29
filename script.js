// Current date
$(function () {
  // Get the current date using Day.js
  var currentDate = dayjs().format("MMMM D, YYYY");
  
  // Set the text of the #currentDay element to the current date
  $("#currentDay").text(currentDate);
});

// Time Boxes from 9am - 5pm
$(function () {

  for (var i = 9; i <= 17; i++) {
    var timeBlockId = "hour-" + i;
    var displayHour = i > 12 ? i - 12 + "PM" : i + "AM"; // Convert to 12-hour format
    
    // Creates time-block element 
    var timeBlock = $("<div>").attr("id", timeBlockId).addClass("row time-block");
    
    // Creates hour element
    var hour = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(displayHour);
    
    // Creates textarea element
    var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
    
    // Creates save button element
    var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
    saveBtn.append(saveIcon);
    timeBlock.append(hour, textarea, saveBtn);
    $(".container-lg").append(timeBlock);
  }
});

// Listner for save button 
$(function () {
  // Listner for save button 
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });
});

// Gets the users input from local storage
$(function () {
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });
});

// Listner for save button
$(function () {

  var currentHour = dayjs().format("H");
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    
    // Compare the hour to the current hour and add the appropriate class
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
    
    // Changes text box, green if empty and red if not empty
    var textarea = $(this).find(".description");
    if (textarea.val().trim() === "") {
      textarea.css("background-color", "green"); // green 
    } else {
      textarea.css("background-color", "red"); // red 
    }
    
    // Input event listener to the textarea
    textarea.on("input", function () {
      if (textarea.val().trim() === "") {
        textarea.css("background-color", "green"); // green background for empty textarea
      } else {
        textarea.css("background-color", "red"); // red background for non-empty textarea
      }
    });
  });
});

