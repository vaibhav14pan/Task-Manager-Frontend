import { createSlice } from "@reduxjs/toolkit"

const taskSlice=createSlice({
    name:"tasks",
    initialState:{
        tasks:[],
    },
    reducers:{
        setUserTasks:(state,action)=>{
            state.tasks = action.payload.map(task => task);

        },
        addTask:(state,action)=>{
            const newTask=action.payload;
            const prevTasks=state.tasks;
            state.tasks=[...prevTasks,newTask];

        },
        deleteTask:(state,action)=>{
            const id=action.payload;
            const updatedTasks = state.tasks.filter((task, i) => task._id!==id);
            state.tasks=updatedTasks;
        },
    }
})

export const {addTask,deleteTask,setUserTasks} = taskSlice.actions;
export default taskSlice.reducer