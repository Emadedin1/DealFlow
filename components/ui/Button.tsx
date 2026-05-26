import React from 'react'

export default function Button({ children, className = '', ...props }: any) {
  return (
    <button className={`px-3 py-2 rounded bg-blue-600 text-white ${className}`} {...props}>
      {children}
    </button>
  )
}
