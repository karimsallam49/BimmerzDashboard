import { Outlet } from "react-router-dom"
import { SideBare } from "../SideBare/SideBare"

export const AppLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh',minWidth:"100vw" }}>
      <SideBare />
      <div className=""style={{width:"85%"}}>
        <Outlet />
      </div>
    </div>
  )
}
