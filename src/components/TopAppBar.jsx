import { IconButton } from "./IconButton";
import { IconButtonEnum, SmallModalTypEnum } from "../utils/enums";

export default function TopAppBar({ saveHistory, openModal }) {

  return (
    <div className='top-app-bar'>
      <div className="top-app-bar-title">AI Game Master</div>
      <div className='top-app-bar-button-row'>
        <IconButton icon={IconButtonEnum.QUICK_SAVE} onClick={saveHistory} />
        <IconButton
          icon={IconButtonEnum.FULL_SAVE}
          onClick={() => openModal(SmallModalTypEnum.SAVE)}
        />
        <IconButton
          icon={IconButtonEnum.LOAD}
          onClick={() => openModal(SmallModalTypEnum.LOAD)}
        />
        <IconButton icon={IconButtonEnum.PLOT_POINTS} onClick={() => console.log("Delete clicked")} />
        <IconButton icon={IconButtonEnum.QUESTS} onClick={() => console.log("Save clicked")} />
        <IconButton icon={IconButtonEnum.SETTINGS} onClick={() => console.log("Save clicked")} />
      </div>
    </div>
  );
}
