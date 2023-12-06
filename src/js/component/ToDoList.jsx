import React, { useEffect, useState } from "react";

const ToDoList = () => {

    const [list, setList] = useState([]);
    const [valorInput, setValorInput] = useState("");

    //crear usuario

    function createUser() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo', {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => {
            getAllTask()
            response.json()
        })
    }

    async function getAllTask(){
        try {
            const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo')
            const data = await response.json()
            if (response.status == 404){
                createUser() // se supone que si la respuesta es 404 not found debo crear al usuario
                console.log("dio error asi que cree a andres") // este console nomas es para verificar que funcione  
            }
            else if (response.ok){
                setList(data)
                console.log(list)
            }    
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Whatever you code here will execute only after the first time the component renders
        getAllTask()
        console.log("se activo el use efect de get all task")
    }, []); 

    // fetch metodo get del usuario para ver que hay en el API esto es solo para probar porque añadi varios botones para ir testeando

    async function getUsers() {
        const resApiDos = await fetch("https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo");
        const user = await resApiDos.json();
        console.log(user);
    }

    // delete user, el problema es si elimino el usuario luego debo recargar la pagina para que se cree o podria usar otro boton

    function deleteUser(){
        fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo', {
        method: 'DELETE',
        });
        console.log("elimine a andres")   
    }

    function updateUser(){
        fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo', {
            method: 'PUT',
            body: JSON.stringify(list),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        console.log("actualice el usuario");
    }

    useEffect(() => {
        // Whatever you code here will execute only after the first time the component renders
        updateUser()
        console.log("se activo el use efect del update user")
    }, [list]); // puse como segundo argumento el list para que cada vez que list sufra un cambio se ejecute el updateUser
    
    // esta funcion es solamente para pruebas manuales con el boton extra que puse

    function printList(){
        console.log(list)
    }
    
    // este objeto feo es para añadir tareas en un formato compatible con el API, creo que se puede mejorar pero no se me ocurrio mas nada

    const objAux = {
        done: false,
        id: 24,
        label: valorInput,
    }

    // funcion para activarse con el enter la escribi aqui por escribir la verdad podria ir en la linea del onkeyDown
    const enterIsPress =()=>{
        //setList(list.concat(objAux))
        setList(...list,{"label": valorInput,"done": false})
        setValorInput("")
    }

    return (
        <div className="mx-5 mt-5">
            <ul className="lista list-group">
                <h1 className="text-center">
                    Todo List
                </h1>
                <li className="list-group-item px-5">
                    <input className="casillaInput" type="text" name="" placeholder={(list.length === 0) ? "No hay tareas agregue alguna" : "Agregue otra tarea" } 
                    id="" value={valorInput} 
                    onKeyDown={e => (e.key == "Enter") ? enterIsPress(): null } 
                    onChange={e => setValorInput(e.target.value)}/>
                </li>
                {list.map((listItem,listIndex) => (
                    <li key={listIndex} className="elmentolista list-group-item d-flex justify-content-between px-5">{listItem.label}
                    <i 
                        className="fa-solid fa-x icono" 
                        onClick={() => (
                            setList(
                                list.filter(
                                    (rello,currentIndex) => (listIndex != currentIndex)
                                ),
                            )
                            )      
                            }>
                        </i> 
                    </li>
                ))}
                <li className="list-group-item px-5">
                    Usted tiene {list.length} tareas pendientes
                </li>
            </ul>
            <h1>Botones de accionamiento manual para pruebas</h1>
            <button className="btn btn-primary m-1" onClick={deleteUser}> elimina usuario </button>
            <button className="btn btn-primary m-1" onClick={printList}> imprime list en consola </button>
            <button className="btn btn-primary m-1" onClick={getUsers}> get los valores del usuario en la api</button>
            <button className="btn btn-secondary m-1" onClick={updateUser}>sube la lista ala api usa el metodo put</button>
        </div>
    );
};

export default ToDoList;


//async function getUsers() {
    //    const resApiDos = await fetch("https://playground.4geeks.com/apis/fake/todos/user");
    //    const user = await resApiDos.json();
    //    setList(user);
    //}

    //getUsers();
    // nota quiero agregar un dropdown que permita seleccionar el usuario que luego se reescribiria en la url del fecth y asi 
    // podria cambiar las tareas segun el usuario

    //async function getTask() {
    //    const resApi = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Aleska");
    //    const datos = await resApi.json();
    //    setList(datos);
    //}
    
    //getTask();