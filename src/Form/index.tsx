function Demo() {
  return (
    <form
      onSubmit={function handleSubmit(e) {
        e.preventDefault();
        console.log(e.currentTarget);
      }}
    >
      <input name="firstname" />
      <input name="lastname" />
      <input type="submit" />
    </form>
  );
}

export { Demo };
