import "./Sidebar.css";

function Sidebar(){

  return(
    <div className="sidebar">
      <h2>Platform</h2>
      <ul className="sidebar-filter-list">
        <li>Windows</li>
        <li>Linux</li>
        <li>macOS</li>
        <li>PlayStation</li>
        <li>Xbox</li>
        <li>Nintendo</li>
      </ul>
    </div>
  )
}

export default Sidebar;