import { useState } from "react"
import { removeTodos } from "../service/TodoService";

function TodoMenu({ filterTodos,selectedMenu, setSelectedMenu, fetchTodos }) {
    const [disabled, setDisabled] = useState(false);
    const [clearBtnText, setclearBtnText] = useState('Clear all');

    async function onClearAll(event) {
        setDisabled(state => true);
        setclearBtnText(state => "removing..")

        try {
            const response = await removeTodos();
            if (response.status == 200) {
                fetchTodos();
                setDisabled(state => false);
                setclearBtnText(state => "Clear all")
            } else {
                console.error("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    }
    // const [selectedMenu, setSelectedMenu] = useState('ALL');

    return (<section className="mt-4 flex justify-between">
        <div className="flex gap-2">
            <button
                className={`${selectedMenu == "ALL" ? "text-blue-500" : ""}`}
                onClick={() => {
                    filterTodos("ALL")
                    setSelectedMenu('ALL');
                }}
            >All</button>

            <button
                className={`${selectedMenu == "PENDING" ? "text-blue-500" : ""}`}
                onClick={() => {
                    filterTodos("PENDING")
                    setSelectedMenu("PENDING")
                }}>Pending</button>

            <button
                className={`${selectedMenu == "COMPLETED" ? "text-blue-500" : ""}`}
                onClick={() => {
                    filterTodos("COMPLETED");
                    setSelectedMenu('COMPLETED');
                }}>Completed</button>
        </div>
        <button 
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800"
        disabled={disabled}
        onClick={onClearAll}
        >Clear all</button>
    </section>)

}

export default TodoMenu;




















