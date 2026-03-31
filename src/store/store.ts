import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore,persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 import auth from './Auth/authSlice'
const authconfigration={
  key:"auth",
  storage,
  whitelist:["token","user"]

}


const rootpersistconfgritaion={

key:"root",
storage,
whitelist:["auth"]
}

const rootreducer= combineReducers({

 
  auth:persistReducer(authconfigration,auth),


//   cartslices:persistReducer(cartconfigration,cartslices),
  
})
const persistedreducer=persistReducer(rootpersistconfgritaion,rootreducer)
export const store = configureStore({
  reducer:  persistedreducer,
  middleware:(getDefalutmiddleware)=>getDefalutmiddleware({
    serializableCheck:{
      ignoredActions:[  FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    },
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor=persistStore(store)
export default persistor