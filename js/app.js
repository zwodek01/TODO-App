let counter = 1;

const list = document.getElementById('list');
// Add Task
function addTask() {
    const inputText = $('#input').val();

    // Alert if input is empty
    if (inputText.length === 0) {
        const newTask = '<div class="div"><p class="to-do__alert">Write a task name</p><button class="to-do__btn--ok to-do__btn to-do__add" id="btnOk">OK</button</div>';
        $('#main').append(newTask);

        // Blur content
        $('#toDoContainer').addClass('blur');

        // Animate scroll to top and hide/show scroll
        $("html").animate({
            scrollTop: 0
        }, "slow");
        $('body').css('overflow', 'hidden');

        $('#btnOk').on('click', function () {
            $('body').css('overflow', 'auto');
        })
        return;
    }


    // Count task, Add new task and description
    const numberItem = $('.to-do__listItem').length + 1;
    const newLi = `<li class="to-do__listItem" id="listItem"><a class="remove">x</a><p class="to-do__text-task-number">Task number ${counter}</p></li>`;
    $('#list').append(newLi);
    const description = '<p class="to-do__text-task-description">' + inputText + '</p> <input class="checkbox" type="checkbox">';
    $(".to-do__listItem:nth-of-type(" + numberItem + ")").append(description);
    counter++;

    // Clear text form input
    $('input').val('');

    // localstorage 

    localStorage["list"] = list.innerHTML;
}


// Remove alert input
$(document).on('click', '#btnOk', function () {
    $('.div').remove();
    $('.to-do__container').removeClass('blur');
})

// Remove last task button
function removeTask() {
    $('.to-do__listItem:last-child').remove();
    counter--;

    // localstorage 

    localStorage["list"] = list.innerHTML;

    //Reset counter
    if ($('.to-do__listItem').length == 0) {
        counter = 1;
    }
}

// localstorage 

if (localStorage["list"]) {
    list.innerHTML = localStorage["list"];
}

// Clear all tasks button
function clearTask() {
    $('.to-do__listItem').remove();
    counter = 1;

    // localstorage 

    localStorage["list"] = list.innerHTML;
}

// Delete Task
$(document).on('click', '.remove', function () {
    $(this).parent().remove();

    // localstorage 
    localStorage["list"] = list.innerHTML;

    //Reset counter
    if ($('.to-do__listItem').length == 0) {
        counter = 1;
    }
});

// Checkbox
$(document).on('change', '.checkbox', function () {
    if ($(this).attr('checked')) {
        $(this).removeAttr('checked');
        $('remove').removeClass('completed');

    } else {
        $(this).attr('checked', 'checked');
    }
    $(this).parent().toggleClass('completed');

    // localstorage 
    localStorage["list"] = list.innerHTML;
});

// Click enter to add task
function enterClick() {
    if (event.keyCode === 13) {
        $('#btnAdd').click();
    }
}

$(document).ready(function () {
    $('#btnAdd').on('click', addTask);
    $('#btnRemove').on('click', removeTask);
    $('#btnClear').on('click', clearTask);
    $('#input').keyup('click', enterClick);
});