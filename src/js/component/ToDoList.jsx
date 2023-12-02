import React, { useState } from "react";

const ToDoList = () => {

    const [list, setList] = useState([]);

    async function getTask() {
        const resApi = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Aleska");
        const datos = await resApi.json();
        setList(datos);
    }
    
    getTask();

    return (
        <div className="mx-5 mt-5">
            <ul className="lista list-group">
                <h1 className="text-center">
                    Todo List
                </h1>
                {list.map((listItem, listIndex) => {
                    return (
                        <li className="list-group-item" key={listIndex}> {listItem.label} </li>
                    )
                }  )}
                <li className="list-group-item px-5">
                    Usted tiene {list.length} tareas pendientes
                </li>
            </ul>
        </div>
    );
};

export default ToDoList;