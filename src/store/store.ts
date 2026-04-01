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
 import cart from './Cart/cartSlice'

const authconfigration={
  key:"auth",
  storage,
  whitelist:["token","user"]

}

const cartconfigration={
  key:"cart",
  storage,
  whitelist:["items","totalQuantity","totalAmount"]
}

const rootpersistconfgritaion={
key:"root",
storage,
whitelist:["auth","cart"]
}

const rootreducer= combineReducers({

 
  auth:persistReducer(authconfigration,auth),
  cart:persistReducer(cartconfigration,cart),

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