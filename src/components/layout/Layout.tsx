import Form from "../form/Form"
import UserList from "../userList/UserList"
import Welcome from "../welcome/Welcome"
import scss from "./Layout.module.scss"

const Layout = () => {
  return (
    <div className={scss.layout}>
      <Welcome />

      <Form />
      <UserList />
    </div>
  )
}

export default Layout