import { useState } from 'react'
import { useGetItems } from './hooks/useGetItems'
import './App.css'

function App() {
  const { data, loading, error } = useGetItems();

  console.log(data)
  console.log(loading);
  console.log(error)
  return (
    <>
    </>
  )
}

export default App
