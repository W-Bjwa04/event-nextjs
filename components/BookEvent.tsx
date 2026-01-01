"use client"

import React, { useState } from "react"

const BookEvent = () => {
  const [email , setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit =(e: React.FormEvent)=>{
   e.preventDefault()
   setIsSubmitting(true)
   // We are using a timeout to simulate an API call
   setTimeout(()=>{
     setEmailSubmitted(true)
     setIsSubmitting(false)
     setEmail("")
   }, 3000)
 }

  return (

      <div id="book-event">
        {
          emailSubmitted ? (
            <div>
              <p className="text-sm">
               Thank you for signing up!
              </p>
            </div>
          ) : (
              <form onSubmit={handleSubmit} >
                  <div>
                    <label htmlFor="email-field">Email Address</label>
                    <input type="email" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    />
                  </div>
                  <button type="submit" className="button-submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
              </form>
          )
        }
      </div>
    )
  }

  export default BookEvent