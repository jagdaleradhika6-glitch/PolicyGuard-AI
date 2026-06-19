import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api.js'
const Ctx = createContext(null)
export function AuthProvider({children}){
  const [user,setUser] = useState(()=>{
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })
  const save = (d)=>{ localStorage.setItem('token',d.token); localStorage.setItem('user',JSON.stringify(d)); setUser(d) }
  const login = async (email,password)=>{ const {data} = await api.post('/auth/login',{email,password}); save(data) }
  const register = async (fullName,email,password)=>{ const {data} = await api.post('/auth/register',{fullName,email,password}); save(data) }
  const logout = ()=>{ localStorage.clear(); setUser(null) }
  return <Ctx.Provider value={{user,login,register,logout}}>{children}</Ctx.Provider>
}
export const useAuth = ()=> useContext(Ctx)
