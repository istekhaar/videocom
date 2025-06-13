'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")

    const router = useRouter();

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(password!==conformPassword){
            alert("passowrd do not match")
        }

        try {
            const res = await fetch("/api/auth/register", {
                method:"POSt",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
        })
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || "Regiseration Error")
        }

        console.log(data);
        router.push("/login")
        
        } catch (error) {
            // alert(error)
            console.error(error);
            
        }
    }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handlerSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
