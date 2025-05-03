import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../config/axios'


export const reloadSingledate=createAsyncThunk(
  "movies/reloadSingledate",async(_, { rejectWithValue })=>{
      try{
          const response=await axios.get('/api/singledate')
          console.log("reload response",response.data)
          return response.data
      }
      catch(err) {
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


  export const reloadMovies=createAsyncThunk(
    "movies/reloadMovies",async(_, { rejectWithValue })=>{
        try{
            const response=await axios.get('/api/movies')
            console.log("reload response",response.data)
            return response.data
        }
        catch(err) {
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

    export const reloadCastcrews=createAsyncThunk(
      "movies/reloadCastcrews",async(_, { rejectWithValue })=>{
          try{
              const response=await axios.get('/api/castcrew')
              console.log("reload response",response.data)
              return response.data
          }
          catch(err) {
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

      export const reloadTimeplaces=createAsyncThunk(
        "movies/reloadTimeplaces",async(_, { rejectWithValue })=>{
            try{
                const response=await axios.get('/api/timeplace')
                console.log("reload response",response.data)
                return response.data
            }
            catch(err) {
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

        export const reloadBookinghistory=createAsyncThunk(
          "movies/reloadBookinghistory",async(_, { rejectWithValue })=>{
              try{
                  const response=await axios.get('/api/bookinghistory')
                  console.log("reload response in reloadBookinghistory",response.data)
                  return response.data
              }
              catch(err) {
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
        

          export const reloadRatings=createAsyncThunk(
            "movies/reloadRatings",async(_, { rejectWithValue })=>{
                try{
                    const response=await axios.get('/api/rating')
                    console.log("reload response",response.data)
                    return response.data
                }
                catch(err) {
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


const movieSlice = createSlice({
  name: "movies",
  initialState: {allmovies:null,
    allcastcrews:null,
    alltimeplaces:null,
    allbookinghistories:null,
    allratings:null,
    allsingledate:null,
    error:null,
    status: "idle",
    editId: null },
  reducers:{
  handleEditId:(state,action)=>{
    console.log("editid in regslice",action.payload)
    state.editId=action.payload
},
handleServerErrors:(state,action)=>{
  state.error=action.payload
},
moviesAfterEdit:(state,action)=>{
  console.log("action.payload in moviesafteredit",action.payload)
  state.allmovies=action.payload
},
castcrewAfterRemove:(state,action)=>{
  console.log("action.payload in castcrewAfterRemove",action.payload)
  state.allcastcrews=action.payload
},
timeplaceAfterRemove:(state,action)=>{
  console.log("action.payload in timeplaceAfterRemove",action.payload)
  state.alltimeplaces=action.payload
},
ratingAfterRemove:(state,action)=>{
  console.log("action.payload in timeplaceAfterRemove",action.payload)
  state.allratings=action.payload
},
},
  extraReducers: (builder) => {
  builder.addCase(reloadMovies.pending, (state) => {
    console.log("state handleLogin pend",state)
    state.status = "loading";
  });
  builder.addCase(reloadMovies.fulfilled, (state, action) => {
    state.allmovies= action.payload
    
  });
  builder.addCase(reloadSingledate.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    console.log("movie fukfilled")
    state.allsingledate= action.payload
    
  });
  builder.addCase(reloadMovies.rejected, (state, action) => {
    console.log("state handleLogin reject",state)
    state.error=action.payload.serverErrors;
  });
  builder.addCase(reloadCastcrews.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    state.allcastcrews= action.payload
    
  });
  builder.addCase(reloadCastcrews.rejected, (state, action) => {
    console.log("state handleLogin reject",state)
    state.error=action.payload.serverErrors;
  });
  builder.addCase(reloadTimeplaces.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    state.alltimeplaces= action.payload
    
  });
  builder.addCase(reloadBookinghistory.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    state.allbookinghistories= action.payload
    
  });
  builder.addCase(reloadRatings.fulfilled, (state, action) => {
    console.log("state handleRelaod full",state)
    console.log("action handleRelaod full action",action)
    console.log("action handleRelaod full payload",action.payload)
    state.allratings= action.payload
    
  });
  
},
});

export const { handleLogout,handleServerErrors,handleEditId,moviesAfterEdit,castcrewAfterRemove,timeplaceAfterRemove,ratingAfterRemove} =movieSlice.actions;
export default movieSlice.reducer;