import { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ChangeBgColor: React.FC = () => {
  const initialColor = '#FFBA08';
  const darkModeColor = '#134074';

  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleClick = () => {
    const newColor = currentColor === initialColor ? darkModeColor : initialColor;
    setCurrentColor(newColor);

    if (newColor === darkModeColor) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <DarkModeIcon onClick={handleClick}></DarkModeIcon>
  );
};

export default ChangeBgColor;