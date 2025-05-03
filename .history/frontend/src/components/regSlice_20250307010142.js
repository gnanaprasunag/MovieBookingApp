import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from '../config/axios'


export const handleEditProfile=createAsyncThunk(
  "users/handleEditProfile",async({editId,formData}, { rejectWithValue })=>{
      try{
          const response=await axios.put(`/api/users/change-profile/${editId}`,formData, { headers: { 'Authorization': localStorage.getItem('token')}})
          console.log("reload response in regslice editprofile",response.data)
          return response.data
      }
      catch(err){
        console.log("editprofile error",err)
        if(err.response.data.error){
          let array=[err.response.data.error]
          
          return rejectWithValue({
            serverErrors: array
        })}
      else if(err.response.data.errors){
          let array=err.response.data.errors.map((ele)=>{return ele.msg})
          return rejectWithValue({
            serverErrors: array
        })
      }
      }
  })
export const handleRegister = createAsyncThunk(
  "users/handleRegister",async (formData, { rejectWithValue }) => {
    try{
      const response = await axios.post('/api/users/register', formData)
      console.log("handleRegister in regslice",response.data)
      //const navigate = useNavigate()
      toast('Successfully Registered', { autoClose: 1000 })
      console.log("response in login",response)
      return response.data
      
  } 
  catch(err) {
    if(err.response.data.error){
      let array=[err.response.data.error]
      
      return rejectWithValue({
        serverErrors: array
    })}
  else if(err.response.data.errors){
      let array=err.response.data.errors.map((ele)=>{return ele.msg})
      return rejectWithValue({
        serverErrors: array
    })
  }
}
  }
)

export const handleReload=createAsyncThunk(
    "users/handleReload",async( _,{rejectWithValue })=>{
      console.log("inreload")
        try{
          console.log("before axios in reload")
            const response=await axios.get('/api/users/account', { headers: { 'Authorization': localStorage.getItem('token')}})
            console.log("reload response",response.data)
            return response.data
        }
        catch(err){console.log("reload error",err)
          if(err.response.data.error){
            let array=[err.response.data.error]
            console.log("error in reload",array)
            return rejectWithValue({
              serverErrors: array
          })}
        else if(err.response.data.errors){
            let array=err.response.data.errors.map((ele)=>{return ele.msg})
            return rejectWithValue({
              serverErrors: array
          })
        }
        }
    })


    
export const handlemailcheck = createAsyncThunk(
  "users/handleEmailcheck",async ({email}, { rejectWithValue }) => {
  try {
      const response = await axios.post('/api/users/mailcheck', {email})
      console.log("res in mailcheck",response)
      console.log("suxcess in mail check")
  
    console.log("response.data.user in handlelogin",response.data.user)
    return response.data
     
      //const userResponse = await axios.get('/api/users/account', { headers: { 'Authorization': localStorage.getItem('token')}})
      //dispatch({ type: 'LOGIN_USER', payload: userResponse.data })
      
  } catch(err) {
    
      return rejectWithValue({
        serverErrors: ['email id is not present']
    })
  
  
  }
})

export const handleLogin = createAsyncThunk(
  "users/handleLogin",async (formData, { rejectWithValue }) => {
  try {
      const response = await axios.post('/api/users/login', formData,{ headers: { 'Authorization': localStorage.getItem('token')}})
      console.log("in login")
      localStorage.setItem('token', response.data.token)
      console.log("token inslice",localStorage.getItem("token"))
    toast('successfully logged in')
    console.log("response.data.user in handlelogin",response.data.user)
    return response.data
      
  } catch(err) {
    if(err.response.data.error){
      let array=[err.response.data.error]
      console.log("in if in login")
      return rejectWithValue({
        serverErrors: array
    })}
  else if(err.response.data.errors){
    console.log("in elseif login")
      let array=err.response.data.errors.map((ele)=>{return ele.msg})
      console.log("array in elseif in login",array)
      return rejectWithValue({
        serverErrors: array
    })
  }
  }
})


const userSlice = createSlice({
  name: "users",
  initialState: { user:null,isLoggedin:false,error:null,
    status: "idle",editId: null },
  reducers: {
    handleEditId:(state,action)=>{
      console.log("editid in regslice",action.payload)
      state.editId=action.payload
},
    handleLogout: (state, action) => {
      localStorage.removeItem('token')
      state.user=null
      state.isLoggedin=false
      state.error= null
      state.editId= null
      state.status= "idle"
      toast("successfully logged out")  
    },
    handleServerErrors:(state,action)=>{
      state.error=action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleRegister.pending, (state) => {
      console.log("state handleRegister pend",state)
      state.status = "loading";
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      console.log("state handleRegister full",state)
      state.status = "success";
      state.user=action.payload
      state.error=null
      console.log("action pauyload in handleregister fullfilled",action.payload)
    });
    builder.addCase(handleRegister.rejected, (state, action) => {
      console.log("state handleRegister reject",state)
      console.log("action in register reject",action.payload.serverErrors)
      state.error=action.payload.serverErrors;
     
    });
  
  builder.addCase(handleLogin.pending, (state) => {
    console.log("state handleLogin pend",state)
    state.status = "loading";
  });
  builder.addCase(handleLogin.fulfilled, (state, action) => {
    console.log("state handleLogin full",state)
    console.log("action handleLogin full",action)
    state.isLoggedin=true
    state.user= action.payload.user
    state.error=null
    
  });
  builder.addCase(handleLogin.rejected, (state, action) => {
    console.log("action in login reject",action)
    state.error=action.payload.serverErrors;
  });
  builder.addCase(handleReload.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    //console.log("action handleRelaod full payload user",action.payload.user)
    state.isLoggedin=true
    state.error=null
    state.user= action.payload
    
  });
  builder.addCase(handleEditProfile.fulfilled, (state, action) => {
    //console.log("action handleRelaod full payload user",action.payload.user)
    state.editId=null
    state.error=null
    state.user= action.payload
    
  });
  builder.addCase(handleEditProfile.rejected, (state, action) => {
    console.log("state handleEditProfile reject",state)
    state.error=action.payload.serverErrors;
  });
},
});

export const { handleLogout,handleServerErrors,handleEditId} =userSlice.actions;
export default userSlice.reducer;
