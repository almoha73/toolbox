import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CheckCircle2, Circle } from "lucide-react";

const TodoListe = () => {
	type Todo = {
		text: string;
		completed: boolean;
	};

	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");
		if (storedTodos && storedTodos.length > 0) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodo.trim()) {
			setTodos([{ text: newTodo.trim(), completed: false }, ...todos]);
			setNewTodo("");
		}
	};

	const toggleTodo = (index: number) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const removeTodo = (index: number) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16">
			<Navbar />

			<main className="max-w-3xl mx-auto p-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl mt-10"
				>
					<div className="flex items-center gap-4 mb-8">
						<div className="bg-blue-500/10 text-blue-500 p-3 rounded-2xl">
							<Plus className="w-8 h-8" />
						</div>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Todo Liste</h1>
							<p className="text-neutral-400">Gérez vos tâches efficacement</p>
						</div>
					</div>

					<form onSubmit={addTodo} className="flex gap-3 mb-8">
						<input
							className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-5 py-4 outline-none transition-all placeholder:text-neutral-600"
							type="text"
							placeholder="Que devez-vous accomplir aujourd'hui ?"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
						/>
						<button
							type="submit"
							disabled={!newTodo.trim()}
							className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-4 font-semibold transition-colors flex items-center gap-2"
						>
							Ajouter
						</button>
					</form>

					<div className="space-y-3">
						<AnimatePresence>
							{todos.length === 0 ? (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-center py-12 text-neutral-500"
								>
									Aucune tâche pour le moment. Ajoutez-en une !
								</motion.div>
							) : (
								todos.map((todo, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, height: 0, mb: 0 }}
										animate={{ opacity: 1, height: 'auto', mb: 12 }}
										exit={{ opacity: 0, height: 0, mb: 0, scale: 0.95 }}
										transition={{ duration: 0.2 }}
									>
										<div
											className={`group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer \${
                        todo.completed 
                          ? 'bg-neutral-950 border-neutral-800 opacity-60' 
                          : 'bg-neutral-800/30 border-neutral-700 hover:border-neutral-600'
                      }`}
											onClick={() => toggleTodo(index)}
										>
											<div className="flex items-center gap-4">
												<button className={`\${todo.completed ? 'text-blue-500' : 'text-neutral-500 group-hover:text-neutral-400'} transition-colors`}>
													{todo.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
												</button>
												<span className={`text-lg transition-all \${todo.completed ? 'line-through text-neutral-500' : 'text-neutral-200'}`}>
													{todo.text}
												</span>
											</div>
											<button
												className="opacity-0 group-hover:opacity-100 p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
												onClick={(e) => {
													e.stopPropagation();
													removeTodo(index);
												}}
											>
												<X className="w-5 h-5" />
											</button>
										</div>
									</motion.div>
								))
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</main>
		</div>
	);
};

export default TodoListe;
