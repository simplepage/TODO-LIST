import { MdDeleteForever } from "react-icons/md";
import {useState} from 'react';
const App = () => {

  const [inputValue,setInputValue] = useState("");

  const [todo,setTodo] = useState(()=>{
    let localData = localStorage.getItem("todoKey");
    if(!localData){
          return [];
    }
    else{
      return JSON.parse(localData);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputValue==""){
      return;
    }

    if(todo.includes(inputValue)){
        setInputValue("");
        return;
    }

    setTodo([...todo,inputValue]);
    setInputValue("");
  }

  localStorage.setItem("todoKey",JSON.stringify(todo));

  const handleDelete = (indexNumber) => {
    let newTodo=todo.filter((val,i)=>{
      return(i!==indexNumber);
    });
    setTodo(newTodo);
  }

  const handleClearAll = () => {
    setTodo([]);
  }


  return(
    <>
    <div className="main">
           <p className="text">Todo List</p>
        <div className="p2">
          <form onSubmit={handleSubmit}>
             <input type="text" value={inputValue} onChange={(event)=>setInputValue(event.target.value)}/>
             <input type="submit" value="Add"/>
          </form>  
        </div>
        <ul>
          {todo.map((v,i)=>{
            return(
              <li key={i}><div>{i+1}.</div> <div>{v}</div> <div className="btn" onClick={()=>handleDelete(i)}><MdDeleteForever /></div></li>
            )
          })}
        </ul>
        <div className="clear"><button onClick={handleClearAll}>Clear All</button></div>
    </div>
    </>
  );
};
export default App;