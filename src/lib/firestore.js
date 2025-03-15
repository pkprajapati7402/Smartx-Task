import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { auth } from "./firebase"; // Import Firebase auth to check user

/**
 * 🟢 Add a New Task to Firestore
 * @param {string} taskText - The task description.
 */
export async function addTask(taskText) {
  const user = auth.currentUser; // Ensure user is logged in
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    const taskRef = await addDoc(collection(db, "tasks"), {
      userId: user.uid,
      text: taskText,
      completed: false,
      createdAt: new Date(),
    });
    return taskRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

/**
 * 🔵 Fetch All Tasks of a User from Firestore
 */
export async function getTasks() {
  const user = auth.currentUser; // Ensure user is logged in
  if (!user) {
    console.error("User not authenticated.");
    return [];
  }

  try {
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

/**
 * 🟡 Update Task Completion Status
 * @param {string} taskId - The Firestore task ID.
 * @param {boolean} completed - The updated completion status.
 */
export async function updateTask(taskId, completed) {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    await updateDoc(doc(db, "tasks", taskId), { completed });
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

/**
 * 🔴 Delete a Task from Firestore
 * @param {string} taskId - The Firestore task ID.
 */
export async function deleteTask(taskId) {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
