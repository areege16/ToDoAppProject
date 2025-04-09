// change between light and dark Mood
console.log("JavaScript is working!");
const ToggleButton = document.querySelector('.SwitchMood');
ToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
// ///////////////////////////////////////////////////////////////
// Add new Task
let BtnAddTask = document.querySelector('.AddNewTaskBtn');
let TaskAdded = document.querySelector('#todo-list');

BtnAddTask.addEventListener('click', () => {
    let TaskInput = document.querySelector('.NewTask .taskInput');

    if (TaskInput.value.trim() !== "") {
        //create li
        var newTask = document.createElement('li');
        newTask.classList.add('todo-item');

        //create input
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        //create span 
        var textTask = document.createElement('span');
        textTask.classList.add('taskText');
        textTask.textContent = TaskInput.value;

        //create div to group checkbox and textTask
        var contentBox = document.createElement('div');
        contentBox.classList.add('todo-content');

        //create delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('Delete-btn');
        deleteBtn.innerHTML = '<img src="images/icon-cross.svg" alt="Delete">';
 
        // Append checkbox and textTask inside div contentBox
        contentBox.appendChild(checkbox);
        contentBox.appendChild(textTask);

        //add to li then add to ul 
        //  newTask.appendChild(checkbox);
        //  newTask.appendChild(textTask);

         newTask.appendChild(contentBox);
         newTask.appendChild(deleteBtn);
 
        //add to ul 
        TaskAdded.appendChild(newTask);
        updateCountItemsLeft();
        //to clear the TaskAdded  
        TaskInput.value = "";
        //
        TaskInput.focus();

        //to delete element 
        deleteBtn.addEventListener('click', () => {
            TaskAdded.removeChild(newTask);
            updateCountItemsLeft();
        });

        //checkBox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                textTask.style.textDecoration = 'line-through';
                // taskText.classList.add('line-through'); 
            } else {
                textTask.style.textDecoration = 'none';
                // taskText.classList.remove('line-through');
            }
            updateCountItemsLeft();
        });
    }
});

// ///////////////////////////////////////////////////////////////

//get and update count of left tasks 
let itemsLeft = document.querySelector('.itemLeft');
function updateCountItemsLeft() {
    let CountActiveTask = TaskAdded.querySelectorAll('li input[type="checkbox"]:not(:checked)');
    itemsLeft.textContent = `${CountActiveTask.length} items left`;
}

// ///////////////////////////////////////////////////////////////

//filters ALL / Active / Complete 
let AllBtn = document.querySelector('.All');
let ActiveBtn = document.querySelector('.Active');
let CompleteBtn = document.querySelector('.Complete');

function Filters(filterType) {
    let AllTasks = TaskAdded.querySelectorAll('li');

    AllTasks.forEach(task => {
        let checkbox = task.querySelector('input[type="checkbox"]');
        if (filterType == 'all') {
            task.style.display = 'flex';
            SetActiveButton(AllBtn);
        }
        else if (filterType == 'active') {
            task.style.display = !checkbox.checked ? 'flex' : 'none';
            SetActiveButton(ActiveBtn);
        }
        else if (filterType == 'complete') {
            task.style.display = checkbox.checked ? 'flex' : 'none';
            SetActiveButton(CompleteBtn);
        }
    });
}
AllBtn.addEventListener('click', () => Filters('all'));
ActiveBtn.addEventListener('click', () => Filters('active'));
CompleteBtn.addEventListener('click', () => Filters('complete'));

// ////////////////////////////////////////////////////////////////

//change color in footer (ALL /Active /Complete )
function SetActiveButton(button) {
    AllBtn.classList.remove('selected');
    ActiveBtn.classList.remove('selected');
    CompleteBtn.classList.remove('selected');

    button.classList.add('selected');
}
SetActiveButton(AllBtn);

// ///////////////////////////////////////////////////////////////

//Remove All Tasks 
let ClearCompleteBtn = document.querySelector('.Clear-completed');
ClearCompleteBtn.addEventListener('click', () => {
    let AllTasks = TaskAdded.querySelectorAll('li');
    AllTasks.forEach(task => {
        task.remove();
        updateCountItemsLeft();
    });
});
















