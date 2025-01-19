
import {createSlice} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:JSON.parse(localStorage.getItem('user')),
        token:cookies.get('jwt'),
    },
    reducers:{
        setCredentials:(state,action)=>{

            const{user,token} = action.payload;
            state.user=user;
            state.token=token;
            const expires = new Date(Date.now() + 6000000); 
            cookies.set('jwt', token,{expires});
            localStorage.setItem('user',JSON.stringify(user));
        },
        logOut:(state)=>{
            state.user=null;
            state.token=null;
            cookies.remove('jwt');
            localStorage.removeItem('user');
        }
    },
})

export const {setCredentials,logOut} = authSlice.actions;

export default authSlice.reducer;