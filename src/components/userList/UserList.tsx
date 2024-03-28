import { useDispatch, useSelector } from "react-redux";
import scss from "./UserList.module.scss";
import { useEffect, useState } from "react";
import { deleteRequest, getRequest, putRequest } from "../../store/userSlice";
import { RootState } from "@reduxjs/toolkit/query";

const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()

  const [editingUserId, setEditingUserId] = useState(null)
  const [user, setUser] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("User")
  useEffect(() => {
    dispatch(getRequest())
  }, [dispatch])
  const handleDeleteRequest = (id) => {
    dispatch(deleteRequest(id)); 
  }                                  
  const handleEdit = (user) => {
    setEditingUserId(user.id)
    setUser(user.user)
    setFName(user.firstName)
    setLName(user.lastName)
    setEmail(user.email)
    setRole(user.role)
  };

  const handlePutRequest = () => {
    if (editingUserId) {
      const newData = {
        user: user,
        firstName: fname,
        lastName: lname,
        email: email,
        role: role
      };
      dispatch(putRequest({ id: editingUserId, newData }))
      setEditingUserId(null);
    }
  };



  return (
    <div className={scss.list}>
      <div className={scss.container}>
        <div className={scss.content}>
          {users.map((users) => (
            <div key={users.id} className={scss.user_list}>
              {editingUserId === users.id ? (
                <div className={scss.form}>
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
                  <div className={scss.edit_buttons}>
                    <button className={scss.save_button} onClick={handlePutRequest}>Save</button>
                    <button className={scss.cancel_button} onClick={() => setEditingUserId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className={scss.information}>
                  <h1 className={scss.name}>{users.firstName} {users.lastName}</h1>
                  <p>@{users.user}</p>
                  <h1>{users.role}</h1>
                  <p className={scss.email}>({users.email})</p>
                  <div className={scss.buttons}>
                    <button onClick={() => handleEdit(users)}>Edit</button>
                    <button onClick={() => handleDeleteRequest(users.id)} className={scss.delete_button}>Delete</button>
                  </div>
                  <p className={scss.time}>Created Time: {users.time} </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
