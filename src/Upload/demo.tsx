export default function Demo() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="file" multiple />
      <button type="submit">upload</button>
    </form>
  );
}
