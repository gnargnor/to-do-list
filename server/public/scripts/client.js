var editing = false;
var editID = 0;

$(document).ready(function(){
  console.log('jq sourcery');
  addEventListeners();
  getTasks();
});

function addEventListeners(){
  $('#task').on('focus', function(){
    console.log('task text fun time');
  });

  $('#priority').on('focus', function(){
    console.log('priority number one');
  });

  $('#addTask').on('click', function(){
    console.log('tons of butt');
    if (editing) {
      $.ajax({
        type: 'PUT',
        url: 'task/edit',
        data: {
          id: editID,
          task: $('#task').val(),
          priority: $('#priority').val()
        },
        success: function(response){
          console.log(typeOf(response.editID));
          getTasks();
        }
    });

    } else {

    $.ajax({
      type: 'POST',
      url: '/task/add',
      data:
        {
          task: $('#task').val(),
          priority: $('#priority').val(),
        },
      success: function(response){
        console.log(response);
        getTasks();
      },
    });
  }
  });

  $('#appendTasks').on('click', '#delete', function(){
    console.log('Delete task: ' + $(this).data('task'));
    var delID = ($(this).data('cid').toString());
    console.log(delID);
    $.ajax({
      type: 'DELETE',
      url: '/task/delete/' + delID,
      success: function(response){
        getTasks();
      }
    });
  });


  $('#appendTasks').on('click', '#edit', function(){
    editing = true;
    console.log("edit clicked: ", $(this).data('task'));
    var edit = 'Editing ' + $(this).data('task') + '(priority: ' + $(this).data('priority') + ')';
    $('h4').text(edit);
    editID = $(this).data('cid');
    $('#task').val($(this).data('task'));
    $('#priority').val($(this).data('priority'));
  });
}

function getTasks(){
  $('#appendTasks').empty();
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response){
      console.log(response);
      for (var i = 0; i < response.length; i++){
        var curTask = response[i];
        $('#appendTasks').append('<tr></tr>');
        var $el = $('#appendTasks').children().last();
        $el.append('<td>' + curTask.task + '</td>');
        $el.append('<td>' + curTask.priority + '</td>');
        $el.append('<td><button id="delete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '">del</button>' +
                   '<button id="edit" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '">edit</button>' +
                   '<button id="complete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '">complete</button></td>');
      }
    }
  });
}
