import {useState} from "react";
export default function Header(){
 
    const [Todos, setTodos] = useState([])
   
     const[inputValue, setInputValue] = useState("")

     // track editing states
     const [editingId, setEditingId] = useState(null)
     const[newText, setNewText] = useState()

     const Add = () => {
        if(inputValue.trim()){
        const Addtodo = {
            id: Date.now(),
            text: inputValue,
            done: false
        };
        setTodos([...Todos, Addtodo])}
        setInputValue("")
       }

       const StartEditing = (id, text) =>{
          setEditingId(id)
          setNewText(text)
       }
       const save = (id)=>{
        setTodos(Todos.map(todos => todos.id === id? {...todos, text: newText} : todos))
        setEditingId(null);
       }
   
       const Delete = (id) =>{
            const Deleted = Todos.filter(todos => todos.id !== id)
            setTodos(Deleted)
       }

       const Done = (id) =>{
        setTodos(Todos.map(todos => todos.id === id?{...todos, done: !todos.done}:todos))
       }



return <div className="todo-list">
    <h2>Todo List</h2>
    <div>
        <input 
        type="text"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={Add}>Add</button>
    </div>
    <ul>
    {Todos.map(todo =>
        <li key={todo.id}>{
            editingId === todo.id? (
                <>
                 <input 
                 type="text" 
                 value={newText}
                 onChange={(e) => setNewText(e.target.value)} 
                 style={{flex:1,border:"none", paddingTop:"10px"}} />
                     <button style={{border:"none", marginLeft:"6px", background:"#2196F3", cursor:"pointer", padding:"5px 10px"}}
                      onClick={() =>save(todo.id)}
                      >Save</button>
                 </>
                
            ):(
            <><span style={{textDecoration: todo.done? "line-through":"none"}} 
            className="text">{todo.text}</span> 
                <button onClick={()=>Done(todo.id)} className="Done-button">{todo.done? "Undo": "Done"}</button>
                <button onClick={()=>StartEditing(todo.id, todo.text)} className="edit-button">Edit</button>
                <button onClick={() =>Delete(todo.id)} className="delete-button">Delete</button>

                </>
            )
        }</li>
    )}
    </ul>
   
</div>

}