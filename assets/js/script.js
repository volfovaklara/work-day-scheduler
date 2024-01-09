function setCurrentDay() {
    const currentDayStr = dayjs().format("dddd, MMMM DD");
    const currentDayEl = $("#currentDay");
    currentDayEl.text(currentDayStr);
}

function initialisePage() {
    setCurrentDay();
    const timetableEl = $("#timetable");

    // Loop through hours (from 9 to 19) and create rows with event listeners
    for (let hour = 9; hour <= 19; hour++) {
        const savedText = localStorage.getItem(`hour_${hour}`) || "";
        const row = createRow(hour, savedText, 12);
        timetableEl.append(row);

        // Add event listener to the button in each row
        const button = row.find('.saveBtn');
        button.on('click', function() {
            const textArea = row.find('.time-block');
            const savedText = textArea.val();

            // Save to localStorage using a key that includes the hour
            localStorage.setItem(`hour_${hour}`, savedText);
        });

        // Color code the time block based on past, present, or future
        const textCol = row.find('.time-block');
        colorCodeTimeBlock(textCol, hour);
    }
}

function createRow(rowHour, savedText, currentHour) {
    var newRow = $("<div>").addClass("row");
    var hourCol = $("<div>").addClass("col hour").text(formatHourNumber(rowHour));
    var textCol = $("<textarea>").addClass("col time-block").val(savedText);
    var buttonCol = $("<button>").addClass("col saveBtn").text("Save");
    newRow.append(hourCol, textCol, buttonCol);
    return newRow;
}

function colorCodeTimeBlock(element, hour) {
    const currentHour = dayjs().hour();

    if (hour < currentHour) {
        element.addClass('past');
    } else if (hour === currentHour) {
        element.addClass('present');
    } else {
        element.addClass('future');
    }
}

function formatHourNumber(hourNumber) {
    var hourString = "";
    if (hourNumber > 12) {
        hourNumber = hourNumber - 12;
        hourString = hourNumber.toString();
        hourString = hourString + "PM";
    } else if (hourNumber === 12) {
        hourString = "12PM";
    } else if (hourNumber === 0) {
        hourString = "12AM";
    } else {
        hourString = hourNumber.toString();
        hourString = hourString + "AM";
    }
    return hourString;
}

initialisePage();
