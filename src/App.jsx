import { useEffect } from "react";
import { useState } from "react";

import './App.css'
import AddTodo from "./component/AddTodo";
import Todos from "./component/Todos";
import TodoMenu from "./component/TodoMenu";
import { addToodo, getTodos } from "./service/TodoService";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [copyTodos, setCopyTodos] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('ALL');

  useEffect(() => {
    fetchTodos();
  }, [])

  async function fetchTodos() {
    try {
      const response = await getTodos();
      const todos = await response.json();
      setTodos(todos)
      setCopyTodos(todos);
      setSelectedMenu("ALL");
    } catch (error) {
      console.log(error);
    }
  }

  async function submitForm(event) {
    setDisabled(state => false);
    event.preventDefault();
    const form = event.target;
    const inputs = form.elements;

    const obj = {};
    Array.from(inputs).forEach(input => {
      if (input.type !== "submit") {
        obj[input.name] = input.value;
      }
    });

    try {
      const response = await addToodo(obj);
      if (response.status === 201) {
        const data = await response.json();
        // setTodos([data, ...allTodos])
        fetchTodos();
        form.reset();
      } else {
        console.error(response.statusText)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  }

  function filterTodos(state) {
    if (state == 'ALL') {
      setCopyTodos(allTodos);
    } else if (state === "PENDING") {
      setCopyTodos(allTodos.filter(todo => !todo.completed));
    } else {
      setCopyTodos(allTodos.filter(todo => todo.completed));
    }
  }

  return <main>
    <div className="bg-white p-4 rounded-md shadow-lg w-96">
      <h2 className="text-center text-xl">Todo app</h2>
      <AddTodo onSubmit={submitForm} disabled={disabled} />
      <TodoMenu filterTodos={filterTodos} selectedMenu={selectedMenu} setselectedMenu={selectedMenu} fetchTodos={fetchTodos}/>
      <hr />
      <Todos todos={copyTodos} fetchTodos={fetchTodos} />
    </div>
  </main>

}
export default App;





















































// import { useEffect } from "react";
// import { useState } from "react";

// import './App.css'
// import AddTodo from "./component/AddTodo";
// import Todos from "./component/Todos";
// import TodoMenu from "./component/TodoMenu";
// import { addToodo, getTodos } from "./service/TodoService";

// function App() {
//   const [disabled, setDisabled] = useState(false);
//   const [allTodos, setTodos] = useState([]);
//   const [copyTodos, setCopyTodos] = useState([]);

//   useEffect(() => {
//     fetchTodos() ;
//   },[])

//   async function fetchTodos(){
//       try {
//         const response = await getTodos();
//         const todos = await response.json();
//         // console.log(todos);
//         setTodos(todos)
//         setCopyTodos(todos);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//   async function submitForm(event) {
//     setDisabled(state => false);
//     event.preventDefault();
//     const form = event.target;
//     const inputs = form.elements;

//     const obj = {};
//     Array.from(inputs).forEach(input => {
//       if (input.type !== "submit") {
//         obj[input.name] = input.value;
//       }
//     });

//     // const response = await fetch("http://localhost:1200/todos",{
//     //   method: "POST",
//     //   body: JSON.stringify(obj),
//     //   headers: {
//     //     'content-type': "application/json"
//     //   }
//     // });


//     try {
//       const response = await addToodo(obj);
//       if (response.status === 201) {
//         const data = await response.json();
//         setTodos([data, ...allTodos])
//         form.reset();
//       } else {
//         console.error(response.statusText)
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setDisabled(false);
//     }
//   }

//   function filterTodos(state) {
//     if(state == 'ALL') {
//       setCopyTodos(allTodos);
//     }else if (state === "PENDING") {
//       setCopyTodos(allTodos.filter(todo => !todo.completed));
//     }else{
//       setCopyTodos(allTodos.filter(todo => todo.completed));
//   }
// }

//   return <main>
//     <div className="bg-white p-4 rounded-md shadow-lg w-96">
//       <h2 className="text-center text-xl">Todo app</h2>
//       <AddTodo onSubmit={submitForm} disabled={disabled} />
//       <TodoMenu filterTodos={filterTodos}/>
//       <hr />
//       <Todos todos={copyTodos} fetchTodos={fetchTodos}/>
//     </div>
//   </main>

// }
// export default App;



























// import { useEffect } from "react";
// import { useState } from "react";

// import './App.css'
// import AddTodo from "./component/AddTodo";
// import Todos from "./component/Todos";
// import TodoMenu from "./component/TodoMenu";

// function App() {
//   const [allTodos, setTodos] = useState([]);
//   useEffect(() => {
//     async function fetchTodos() {

//       try {
//         const response = await fetch("http://localhost:1200/todos");

//         const todos = await response.json();

//         console.log(todos);
//         setTodos(todos)

//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchTodos();
//   }, [])


//   //   async function fetchTodos(){
//   //   try {
//   //     const response = await fetch("http://localhost:1200/todos");
//   //     const todos = await response.json();
//   //     console.log(todos);
//   //     setTodos(todos)

//   //   }catch (error) {
//   //     console.log(error);
//   //   }
//   // }

//   //   fetchTodos();

// async function submitForm(event) {
//   event.preventDefault();
//   const form = event.target;
//   const inputs = form.elements;
//   // console.log(inputs);

//   const obj = {};

//   Array.from(inputs).forEach(input => {
//     if (input.type !== "submit") {
//       obj[input.name] = input.value;
//     }
//   });
//   // console.log(obj);

//   // const json = JSON.stringify(obj);
//   // console.log(json);

//   const response = await fetch("http://localhost:1200/todos",{
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: {
//       'content-type': "application/json"
//     }
//   });
//       // console.log(response.status);

//       if (response.status === 201) {
//         const data = await response.json();
//         setTodos([data, ...allTodos])
//       } else {
//         console.error(response.statusText)
//       }
// }


//   return <main>
//     {/* <div className="bg-white p-4 rounded-md shadow-lg w-96 max-h-96 overflow-y-auto"> */}
//     <div className="bg-white p-4 rounded-md shadow-lg w-96">
//       <h2 className="text-center text-xl">Todo app</h2>

//       {/* <section className="mt-4">
//         <form onSubmit={submitForm} className="flex justify-between gap-2">
//           <input type="text" name="title" placeholder="add a new task" />
//           <input type="submit" value="add"/>
//         </form>
//       </section> */}

//       <AddTodo onSubmit={submitForm}/>

//       {/* <section className="mt-4 flex justify-between">
//         <div className="flex gap-2">
//         <button>All</button>
//         <button>Pending</button>
//         <button>Completed</button>
//         </div> 
//         <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800">Clear all</button>
//       </section> */}

//       <TodoMenu/>

//         <hr/>

//       {/* <section className="mt-4 max-h-20 overflow-y-auto">
//         {allTodos.map(todo =>
//           <div className="flex gap-4 items-center" key={todo.id}>
//             <input type="checkbox" />
//             <p>{todo.title}</p>
//           </div>
//         )}
//       </section> */}

//       <Todos todos={allTodos}/>
//     </div>  
//   </main>

// }
// export default App;












































