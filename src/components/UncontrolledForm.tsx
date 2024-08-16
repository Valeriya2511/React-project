function UncontrolledForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
