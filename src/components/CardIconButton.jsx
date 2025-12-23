import { CardIconButtonEnum } from "../utils/enums";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faTrash, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export function CardIconButton({ icon, onClick }) {
    const getIcon = () => {
        switch (icon) {
            case CardIconButtonEnum.DELETE:
                return faTrash;
            case CardIconButtonEnum.DONE:
                return faCheck;
            case CardIconButtonEnum.CANCEL:
                return faXmark;
            case CardIconButtonEnum.ADD:
                return faPlus;
            case CardIconButtonEnum.EDIT:
                return faPenToSquare;
            default:
                return null;
        }
    };

    const getToolTip = () => {
        switch (icon) {
            case CardIconButtonEnum.DELETE:
                return "Delete";
            case CardIconButtonEnum.DONE:
                return "Save";
            case CardIconButtonEnum.CANCEL:
                return "Cancel";
            case CardIconButtonEnum.ADD:
                return "Add";
            case CardIconButtonEnum.EDIT:
                return "Edit";
            default:
                return null;
        }
    };

    return (
        <button
            className='card-icon-button'
            onClick={onClick}
            title={getToolTip()}
        >
            <FontAwesomeIcon icon={getIcon()} size='1x' />
        </button>
    );
}