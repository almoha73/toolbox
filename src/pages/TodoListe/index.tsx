import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";


// todoliste page en typescript avec localstorage

const TodoListe = () => {
	type Todo = {
		// type todo
		text: string;
		completed: boolean;
	};

	const [todos, setTodos] = useState<Todo[]>([]); // liste des todos
	const [newTodo, setNewTodo] = useState(""); // nouvelle todo

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");
		if (storedTodos && storedTodos.length > 0) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		// ajouter une todo que si elle n'est pas vide
		if (newTodo) {
			const newTodos = [...todos, { text: newTodo, completed: false }];
			setTodos(newTodos);
			setNewTodo("");
		}
	};

	const toggleTodo = (index: number) => {
		// cocher une todo
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const removeTodo = (index: number) => {
		// supprimer une todo
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<>
    <Navbar />
			<div
				className="flex flex-col items-center p-4  min-h-screen w-full "
				style={{
					backgroundImage: `url("/images/marissa-grootes-vdaJJbls3xE-unsplash.jpg")`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<h1 className="text-3xl font-bold p-4 mb-4">Todo Liste</h1>
				<div className="flex mb-4 md:w-1/2 ">
					<input
						className="border rounded-l px-4 py-2 w-full"
						type="text"
						placeholder="Entrer une todo"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
					<button
						className="bg-yellow-300 text-black rounded-r px-4 py-2"
						onClick={addTodo}
					>
						Ajouter
					</button>
				</div>
				<ul className=" md:w-1/2 w-full">
					{todos.map((todo, index) => (
						<div
							key={index}
							className="flex flex-row justify-between items-center px-4 py-2 mb-4  bg-amber-300 border rounded-3xl"
						>
							<li
								className={`${
									todo.completed ? "line-through text-gray-500 mb-2" : ""
								} hover:text-gray-500 cursor-pointer py-2 border-gray-200   `}
								onClick={() => toggleTodo(index)}
							>
								{todo.text}
							</li>
							<button
								className="bg-red-500 text-white rounded-full px-2 ml-2"
								onClick={(e) => {
									e.stopPropagation();
									removeTodo(index);
								}}
							>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</div>
					))}
				</ul>
			</div>
		</>
	);
};

export default TodoListe;
