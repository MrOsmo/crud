import { useState } from "react"
import scss from "./Form.module.scss"
import { useDispatch } from 'react-redux';
import { postRequest } from "../../store/userSlice";

const Form = () => {
  const [user, setUser] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("User")

  const dispatch = useDispatch()
  const [openForm, setOpenForm] = useState(false)
  const date = new Date();
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;

  const handlePostRequest = () => {
    const newUser = {
      user: user,
      firstName: fname,
      lastName: lname,
      email: email,
      role: role,
      time: formattedDate
    }
    if (user == "" || fname == "" || lname == "" || email == "") {
      console.log("Please fill out all the data!");
    } else {
      dispatch(postRequest(newUser))
      setUser("")
      setFName("")
      setLName("")
      setEmail("")
    }
  }

  return (
    <div className={scss.form}>
      <div className={scss.container}>
        <div className={scss.content}>
          {openForm ? (
            <div className={scss.content}>
              <input
                type="text"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="text"
                placeholder="Firstname"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Lastname"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={scss.roles}>
                <button onClick={() => setRole("User")}>User</button>
                <button onClick={() => setRole("Admin")}>Admin</button>
              </div>
              <button onClick={handlePostRequest}>Create Account</button>
            </div>
          ) : (
            <button className={scss.add_button} onClick={() =>setOpenForm(true)}>+</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form