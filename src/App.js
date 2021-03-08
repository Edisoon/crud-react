import React, {useState, useEffect} from 'react';
import { isEmpty, size } from 'lodash';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { RiErrorWarningLine } from "react-icons/ri";
import { getCollection, addDocument, updateDocument, deleteDocument } from './actions';

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () =>{
      const result = await getCollection("tasks")
      if(result.statusRespose){
        setTasks(result.data)
      }
    })()
  }, [])

  const validForm = () =>{
    let isValid = true
    setError(null)
    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid = false
    }
    return isValid
  }

  const addTask = async (e) => {
    e.preventDefault()

    if(!validForm()){
      return
    }

    const result = await addDocument("tasks", {name: task})

    if(!result.statusRespose){
      setError(result.error)
      return
    }

    setTasks([...tasks, {id: result.data.id, name: task}])
    setTask('')
  }
  const saveTask = async(e) => {
    e.preventDefault()

    if(!validForm()){
      return
    }
    const result = await updateDocument('tasks', id, {name: task})
    if(!result.statusRespose){
      setError(result.error)
      return
    }
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask('')
    setId("")
  }

  const deleteTask = async(id) =>{
    const result = await deleteDocument('tasks', id)
    if(!result.statusRespose){
      setError(result.error)
      return
    }
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }
  const editTask = (theTask) =>{
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4> 
          {
            size(tasks) === 0 ? (
              <li className="list-group-item">
                <h6 className="text-center text-danger">Sin tareas agregadas</h6>
              </li>
             ) : (
                <ul className="list-group">
                {
                tasks.map((task) =>(
                  <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-outline-danger btn-sm float-right mx-1">
                    <FaTrashAlt/>
                  </button>
                  <button 
                    className="btn btn-outline-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                    >
                    <FaPen/>
                    </button>
                  </li>
                ))
              }
              </ul>
             )
          }

        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {
              error && <span className="text-danger text-center mb-2"><RiErrorWarningLine/> {error}</span>
            }
            <input
              type="text"
              className="form-control mb-2 mt-2"
              placeholder="Ingresa la tarea.."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className={editMode ? "btn btn-outline-warning btn-block" : "btn btn-outline-dark btn-block"}
            type="submit">{editMode ? "Guardar" : "Agregar"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
