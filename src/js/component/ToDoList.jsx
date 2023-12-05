import React, { useEffect, useState } from "react";

const ToDoList = () => {

    const [list, setList] = useState([]);
    const [valorInput, setValorInput] = useState("");

    //crear usuario

    fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo', {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

    // actualizar "lista"

    async function getUsers() {
        const resApiDos = await fetch("https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo");
        const user = await resApiDos.json();
        console.log(user);
    }

    

    // delete user 

    function deleteUser(){
        fetch('https://playground.4geeks.com/apis/fake/todos/user/AndreDuardo', {
        method: 'DELETE',
        });
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
        .then((json) => console.log(json));
    }

    async function printList(){
        const resApiDos = await fetch("https://playground.4geeks.com/apis/fake/todos/user/eurorincon");
        const user = await resApiDos.json();
        setList(user); 
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
                    onKeyDown={e => (e.key == "Enter") ? (setList(list.concat(valorInput)), setValorInput("")): null } 
                    onChange={e => setValorInput(e.target.value)}/>
                </li>
                {list.map((listItem,listIndex) => (
                    <li key={listIndex} className="elmentolista list-group-item d-flex justify-content-between px-5">{listItem}
                    <i 
                        className="fa-solid fa-x icono" 
                        onClick={() => (
                            setList(
                                list.filter(
                                    (relleno, currentIndex) => (listIndex != currentIndex)
                                )
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
            <button className="btn btn-primary" onClick={deleteUser}> elimina una lista </button>
            <button className="btn btn-primary" onClick={printList}> imprime la variable list </button>
            <button className="btn btn-primary" onClick={getUsers}> genera el usuario?</button>
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