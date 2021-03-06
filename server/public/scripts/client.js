var editing = false;
var editID = 0;

$(document).ready(function(){
  console.log('jq sourcery');
  addEventListeners();
  getTasks();
});


//Event listeners
function addEventListeners(){
  $('#task').on('focus', function(){
    console.log('task text fun time');
  });

  $('#priority').on('focus', function(){
    console.log('priority number one');
  });

  $('#addTask').on('click', function(){
    console.log('buttons');
    if (editing) {
      editing = false;
      $.ajax({
        type: 'PUT',
        url: 'task/edit',
        data: {
          id: editID,
          task: $('#task').val(),
          priority: $('#priority').val(),
          completed: false
        },
        success: function(response){
          // console.log(typeOf(response.editID));
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
          completed: 'false'
        },
      success: function(response){
        // console.log(response);
        getTasks();
      },
    });
  }
  });

  $('#appendTasks').on('click', '#delete', function(){
    if (editing){
      alert('Currently editing. Commit edit and retry.');
    } else {
      var delID = ($(this).data('cid').toString());
      $.ajax({
        type: 'DELETE',
        url: '/task/delete/' + delID,
        success: function(response){
          getTasks();
        }
      });
    }
  });

  $('#appendTasks').on('click', '#completed', function(){
    // console.log('completed targeted');
    if (editing){
      alert('Currently editing. Commit edit and retry.');
    } else {
      var comID = $(this).data('cid').toString();
      $.ajax({
        type: 'PUT',
        url: '/task/completed',
        data: {
                id: comID,
                task: $(this).data('task'),
                priority: $(this).data('priority'),
                completed: $(this).data('completed')
              },
        success: function(response){
          console.log('success :', response);
          // $('.success').append('<p class="proud">Proud of U</p>').fadeOut(3000);
          getTasks();
        }
      });
    }
  });


  $('#appendTasks').on('click', '#edit', function(){
    editing = true;
    console.log("edit clicked: ", $(this).data('task'));
    var edit = 'Editing ' + $(this).data('task') + ' (priority: ' + $(this).data('priority') + ')';
    $('h4').text(edit);
    editID = $(this).data('cid').toString();
    $('#task').val($(this).data('task'));
    $('#priority').val($(this).data('priority'));
  });
}//end event listeners



function getTasks(){
  //empties appendTasksDiv
  $('#appendTasks').empty();
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response){
//       console.log(response);
//       //cycles through
//       for (var i = 0; i < response.length; i++){
//         console.log('editing: ', editing);
//         var curTask = response[i];
//         var $el = $('#appendTasks').children().last();
//         if (curTask.completed === 'false'){
//           $('#appendTasks').append('<tr class="incomplete">');
//           $el.append('<td>' + curTask.task + '</td>');
//           $el.append('<td>' + curTask.priority + '</td>');
//           $el.append('<td><button id="delete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">del</button>' +
//                      '<button id="edit" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">edit</button>' +
//                      '<button id="completed" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">completed</button></td></tr>');
//         } else {
//           $('#appendTasks').append('<tr class="completed">');
//           $el.append('<td>' + curTask.task + '</td>');
//           $el.append('<td>' + curTask.priority + '</td>');
//           $el.append('<td><button id="delete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">del</button>' +
//                      '<button id="edit" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">edit</button>' +
//                      '<button id="completed" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">completed</button></td></tr>');
//         }
//       }





console.log(response);
//cycles through
for (var i = 0; i < response.length; i++){
  console.log('editing: ', editing);
  var curTask = response[i];
  console.log(curTask);
  $('#appendTasks').append('<tr></tr>');
  var $el = $('#appendTasks').children().last();
  if (curTask.completed === 'false'){
    if(curTask.pid === 1){
      $el.addClass('high');
    } else if (curTask.pid === 2){
      $el.addClass('medium');
    } else if (curTask.pid === 3){
      $el.addClass('low');
    }
    $el.append('<td>' + curTask.task + '</td>');
    $el.append('<td>' + curTask.priority + '</td>');
    $el.append('<td><button id="delete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">del</button>' +
               '<button id="edit" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">edit</button>' +
               '<button id="completed" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">completed</button></td>');
  } else {
    $el.addClass('completed');
    $el.append('<td>' + curTask.task + '</td>');
    $el.append('<td>' + curTask.priority + '</td>');
    $el.append('<td><button id="delete" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">del</button>' +
               '<button id="edit" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">edit</button>' +
               '<button id="completed" data-cid="' + curTask.id +'" data-task="' + curTask.task + '" data-priority="' + curTask.priority + '" data-completed="' + curTask.completed + '">completed</button></td>');
  }
}

}
});
}
