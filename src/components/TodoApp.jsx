import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "./TodoApp.css";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputName.trim()) {
      const newTodo = {
        name: inputName,
        description: inputDesc,
        status: "Not Completed",
      };
      setTodos([...todos, newTodo]);
      setInputName("");
      setInputDesc("");
    }
  };

  const editTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setInputName(todos[index].name);
    setInputDesc(todos[index].description);
  };

  const saveEditTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex].name = inputName;
    updatedTodos[editIndex].description = inputDesc;
    setTodos(updatedTodos);
    setIsEditing(false);
    setInputName("");
    setInputDesc("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleStatus = (index) => {
    const newTodos = [...todos];
    newTodos[index].status =
      newTodos[index].status === "Completed" ? "Not Completed" : "Completed";
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    return todo.status === statusFilter;
  });

  return (
    <div className="container mt-4 ">
      <div className="sticky-header">
        <h2 className="text-center mb-4"><b>My Todo</b></h2>
        <div className="row mb-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Todo Name"
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              value={inputDesc}
              onChange={(e) => setInputDesc(e.target.value)}
              placeholder="Todo Description"
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={isEditing ? saveEditTodo : addTodo}
            >
              {isEditing ? "Save Todo" : "Add Todo"}
            </button>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-12 text-end">
            <label className="me-2">Status Filter :</label>
            <select
              className="form-select d-inline w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>
      </div>

      <h4 className="mb-3">My Todos</h4>

      <div className="row">
        {filteredTodos.map((todo, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card p-3 bg-light">
              <p>
                <strong>Name: </strong>
                {todo.name}
              </p>
              <p>
                <strong>Description: </strong>
                {todo.description}
              </p>
              <p>
                <strong>Status: </strong>
                <select
                  className={`form-select w-auto ${
                    todo.status === "Completed"
                      ? "bg-success text-white"
                      : "bg-danger text-white"
                  }`}
                  value={todo.status}
                  onChange={() => toggleStatus(index)}
                >
                  <option value="Not Completed">Not Completed</option>
                  <option value="Completed">Completed</option>
                </select>
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning"
                  onClick={() => editTodo(index)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
