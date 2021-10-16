//ChangeEvent represents any events that involves changes in the input
import React, {FC, ChangeEvent, useState} from 'react';
import './App.css';
import {ITask} from './interfaces';
import TodoTask from './Componets/TodoTask';

const App: FC = () => {

  // <string> passes the type of the state
  const [task, setTask] = useState<string>("");
  // (0) means it will start from 0 
  const [deadline, setDeadline] = useState<number>(0);
  //todoList is an array of type ITask <ITask[]>
  const [todoList, setTodoList] = useState<ITask[]>([]);

  //function that's called whenever there's change in input, will set state
  //we currently only have 2 inputs - task and deadline
  // we can write conditional statements inside here to find out which input we're talking about
  // don't forget to pass this handleChange to the input below e.g onChange={handleChange}
  // <HTMLInputElement> is a type for variables like event
  // every function should return something, but in this scenario, we don't need it to return anything so we use :void
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //if "task" input is calling this change function, setTask, else setDeadline
    if(event.target.name === "task" ) {
      setTask(event.target.value);
    } else {
    // (event.target.value) is used for string, as we declared deadline above as a number, we need to convert this string to number using (Number(event.target.value))
    setDeadline(Number(event.target.value));
    }
  };

  const addTask = () : void => {
    //we put task and deadline into an object called newTask
    const newTask ={taskName: task, deadline: deadline};
        // line below means we're adding new TASK to the old todoList, which is an array (old todoList is referred by using ...todoList)
    setTodoList([...todoList, newTask]);
    //This 2 lines at the bottoms "resets" the form after users submit
    setTask("");
    setDeadline(0);
  };

  //create variable of task we want to delete, give it a type of string
  const completeTask = (taskNameToDelete:string): void => {
    //this function filters the whole list and if the taskName is not the taskNameToDelete, it will keep the task on the list
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))

  };


  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
        {/* onChange={handleChange} is to pass the handleChange above to this 2 input */}
        {/* name is to differentiate the 2 inputs for the handleChange above */}
          <input 
          type="text" 
          placeholder="Task..." 
          name="task" 
          value={task}
          onChange={handleChange} 
          />
          <input 
          type="number" 
          placeholder="Deadline (in Days)..."
           name="deadline" 
           value={deadline}
           onChange={handleChange}
           />

        </div>

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="todoList">
        {/* map through every element in list and return a new task to be display them on the screen */}
        {/* key is the index of the element in this todoList */}
        {todoList.map((task: ITask, key:number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask}/>;
      })}

      </div>
    </div>
  );
};

export default App;
