import React, { useState, useEffect}  from 'react'
import styles from './Dropdown.module.scss'
import {getColorName} from '../../api'

export default function Dropdown() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('white');
  const [currentColorName, setCurrentColorName] = useState('White');
  const [colorOptions, setColorOptions] = useState(['#3bcebe', '#3b95ce', '#3bce75', '#ce3b4b']);

  const renderItems = () => {
    return colorOptions.map((color, i) => (
      <div key={i} className={styles.dropdownItem} onClick={() => onColorClick(color)}>
        {color}
      </div>
    ))
}

  const onColorClick = (currentColor) => {
    setCurrentColor(currentColor)
    setDropdownIsOpen(false)
  }

  const onEscapeKeyDown = (e) => {
    if (e.key !== 'Escape') return
    setDropdownIsOpen(false)
  }

  const onDropdownButtonClick = () => {
    setDropdownIsOpen(!dropdownIsOpen )
  }

  const fetchColorName = async (color) => {
    try {
      const currentColorName = await getColorName(color)
      setCurrentColorName(currentColorName)
    } catch (error) {
      console.error(error)
    }
  }

  const useApi = useEffect(() => {
      document.body.style.backgroundColor = currentColor
      fetchColorName(currentColor)
      document.title = currentColorName
  }, [currentColor])

  const useColor = useEffect(() => {
    document.body.style.backgroundColor = currentColor
    document.title = currentColorName
  }, [currentColor, currentColorName])

  const useEventawdawdawd = useEffect(() => {
    window.addEventListener('keydown', onEscapeKeyDown)
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener('keydown', onEscapeKeyDown)
    };
  })

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={onDropdownButtonClick}>
        Change color
      </button>
      {dropdownIsOpen && <div className={styles.dropdown}>{renderItems()}</div>}
    </div>
  )

}
