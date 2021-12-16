import React, { useEffect, useState } from 'react'

import './DarkMode.css'
import { ChangeEventHandler } from 'react'

const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')

    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)')
        .matches

    const defaultDark =
      storedTheme === 'dark' ||
      (storedTheme === null && prefersDark)
    return defaultDark ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    )
  }, [theme])

  const toggleTheme: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          // NEW
          onChange={toggleTheme}
          defaultChecked={theme === 'dark'}
        />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  )
}

export default DarkMode
