import { useProducts } from "../ProductsContext";
import Icon from '@mdi/react';
import "./Sidebar.css";

function Sidebar({activeFilter, setActiveFilter}){

  const { PLATFORM_ICONS } = useProducts();
  const GENRES = ["action", "adventure", "indie", "strategy", "casual", "sports", "fighting", "rpg", "massively multiplayer", "simulation", "racing", "educational", "shooter", "puzzle", "board games", "arcade", "platformer", "family", "card"]

  const resetButtonsHighlightPartial = (e) => {
    const parent = e.target.closest(".sidebar-filter-list");
    const allBtns = parent.querySelectorAll(".sidebar-filter-btn")
    allBtns.forEach(btn => {
      if(btn.classList.contains("active")){
        btn.classList.remove("active");
      }
    });
  }

  const resetButtonsHighlightTotal = (e) => {
    const parent = e.target.closest(".sidebar");
    const allBtns = parent.querySelectorAll(".sidebar-filter-btn")
    allBtns.forEach(btn => {
      if(btn.classList.contains("active")){
        btn.classList.remove("active");
      }
    });
  }

  const handleButtonClick = (e, filter) => {
    resetButtonsHighlightPartial(e);
    e.target.classList.add("active");
    setActiveFilter(filter);
  }

  const removeFilters = (e) => {
    resetButtonsHighlightTotal(e);
    setActiveFilter(null);
  }

  return(
    <div className="sidebar">
      {activeFilter !== null ? <button onClick={removeFilters} className="remove-filters-btn">Remove filters<span>×</span></button> : null}
      <h2>Platform</h2>
      <ul className="sidebar-filter-list">
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"pc")}}>Windows <Icon path={PLATFORM_ICONS.pc.icon} size={1} /></button>
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"linux")}}>Linux <Icon path={PLATFORM_ICONS.linux.icon} size={1} /></button>
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"macos")}}>macOS <Icon path={PLATFORM_ICONS.macos.icon} size={1} /></button>
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"playstation")}}>PlayStation <Icon path={PLATFORM_ICONS.playstation.icon} size={1} /></button>
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"xbox")}}>Xbox <Icon path={PLATFORM_ICONS.xbox.icon} size={1} /></button>
        <button className="sidebar-filter-btn" onClick={(e) => {handleButtonClick(e,"nintendo")}}>Nintendo <Icon path={PLATFORM_ICONS.nintendo.icon} size={1} /></button>
      </ul>
    </div>
  )
}

export default Sidebar;