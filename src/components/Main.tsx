import style from '../styles/Main.module.css'

function Main() {
  return (
    <div className={style.wrapper_main}>
      <h1>Main page</h1>
      <div className={style.links}>
        <a className={style.link} href="/uncontrolled-form">
          Go to Uncontrolled Form
        </a>
        <a className={style.link} href="/hook-form">
          {' '}
          Go to React Hook Form
        </a>
      </div>
    </div>
  )
}

export default Main
