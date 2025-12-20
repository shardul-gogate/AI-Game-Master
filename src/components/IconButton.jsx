import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faScroll, faBook, faFloppyDisk, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function IconButton({ icon, onClick }) {
  const getIcon = () => {
    switch (icon) {
      case "settings":
        return faGear;
      case "quests":
        return faScroll;
      case "plotpoints":
        return faBook;
      case "save":
        return faFloppyDisk;
      case "load":
        return faDownload;
      default:
        return null;
    }
  };

  return (
    <button
      className='top-app-bar-icon-button'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={getIcon()} size='2x' />
    </button>
  );
}
