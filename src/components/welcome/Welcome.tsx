import scss from "./Welcome.module.scss"

const Welcome = () => {
  return (
    <div className={scss.welcome}>
      <h1 className={scss.crud}>CRUD</h1>
      <h1>Welcome to the website!</h1>
    </div>
  )
}

export default Welcome