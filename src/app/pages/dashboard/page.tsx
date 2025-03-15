'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash, LogOut, Edit, CheckCircle } from "lucide-react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import MotivationClock from "@/sections/Motivationclock";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/");
    } else {
      setIsLoggedIn(true);
      setUserId(user.uid);
      fetchTasks(user.uid);
    }

    return () => {
      // Cleanup function to avoid memory leaks
      setTasks([]);
    };
  }, [router]); // Add 'router' to the dependency array

  const fetchTasks = async (uid: string) => {
    try {
      setLoading(true);
      const taskRef = collection(db, `users/${uid}/tasks`);
      const querySnapshot = await getDocs(taskRef);
      const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "" && userId) {
      try {
        const taskRef = collection(db, `users/${userId}/tasks`);
        if (editIndex !== null) {
          const taskDoc = doc(db, `users/${userId}/tasks`, tasks[editIndex].id);
          await updateDoc(taskDoc, { text: newTask });
          setEditIndex(null);
        } else {
          await addDoc(taskRef, { text: newTask, completed: false });
        }
        setNewTask("");
        fetchTasks(userId);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (userId) {
        await deleteDoc(doc(db, `users/${userId}/tasks`, id));
        fetchTasks(userId);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = async (index: number) => {
    try {
      if (userId) {
        const taskRef = doc(db, `users/${userId}/tasks`, tasks[index].id);
        await updateDoc(taskRef, { completed: !tasks[index].completed });
        fetchTasks(userId);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (!isLoggedIn) return null;

  const pendingTasks = tasks.length - completedTasks;
  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [{
      data: [completedTasks, pendingTasks],
      backgroundColor: ["#4CAF50", "#FF5733"],
    }],
  };

  const lineData = {
    labels: tasks.map((_, index) => `Week ${index + 1}`),
    datasets: [{
      label: "Tasks Completed Over Time",
      data: tasks.map(task => task.completed ? 1 : 0),
      borderColor: "#00A8FF",
      fill: false,
    }],
  };

  const barData = {
    labels: ["Work", "Personal", "Urgent"],
    datasets: [{
      label: "Tasks by Category",
      data: tasks.reduce((acc, task) => {
        if (task.category === "Work") acc[0]++;
        else if (task.category === "Personal") acc[1]++;
        else if (task.category === "Urgent") acc[2]++;
        return acc;
      }, [0, 0, 0]),
      backgroundColor: ["#FF8C00", "#00A86B", "#8A2BE2"],
    }],
  };

  return (
    <>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 text-white">
        <div className="fixed top-4 left-4 z-50">
          <button
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 justify-center items-center p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl p-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-lg mt-16"
          >
            <h1 className="text-4xl font-extrabold text-center mb-4">Task Manager</h1>
            <p className="text-lg text-center opacity-80">Welcome back, dude!</p>
            <p className="text-lg text-center opacity-80">Total Tasks: {totalTasks}</p> {/* Display total tasks */}

            <div className="mt-8 flex gap-2">
              <label htmlFor="new-task" className="sr-only">New Task</label>
              <input
                id="new-task"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a new task"
                autoFocus={editIndex !== null}
              />
              <button
                onClick={addTask}
                className={`px-4 py-2 rounded-lg shadow-md transition flex items-center ${editIndex !== null ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                <Plus size={20} />
              </button>
            </div>

            {loading ? (
              <p className="text-center mt-6 opacity-70">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-center opacity-70 mt-6">No tasks added yet.</p>
            ) : (
              <ul className="space-y-3 mt-6">
                {tasks.map((task, index) => (
                  <li
                    key={task.id}
                    className={`flex justify-between items-center p-4 rounded-lg shadow-md transition ${task.completed ? "bg-green-500" : "bg-white/20"}`}
                  >
                    <span className={task.completed ? "line-through" : ""}>{task.text}</span>
                    <div className="flex gap-2">
                      <button onClick={() => editTask(index)} className="text-blue-400 hover:text-blue-600">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => toggleComplete(index)} className="text-green-400 hover:text-green-600">
                        <CheckCircle size={20} />
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                        <Trash size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
      {/* Adding Graphs, Extending features */}
      <div className="relative p-8  overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradientMove opacity-80"></div>

        {/* Blurry Glow Effect */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-30"></div>

        {/* Main Content */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900">Task Status</h2>
            <Pie data={pieData} />
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900">Tasks Completed Over Time</h2>
            <Line data={lineData} />
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900">Tasks by Category</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>

      <style>
        {`
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradientMove {
      background-size: 200% 200%;
      animation: gradientMove 6s ease infinite;
    }
  `}
      </style>
      <MotivationClock />

    </>
  );
}
