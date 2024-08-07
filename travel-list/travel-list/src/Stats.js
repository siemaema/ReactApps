export default function Stats({ item }) {
  const numItems = item.length;
  const numPacked = item.filter((num) => num.packed).length;
  return (
    <footer className="stats">
      <em>
        You have {numItems} items in your bag and you already packed
        {numItems === numPacked
          ? ` everything 🧳🧳🧳`
          : ` ${numPacked} thing (${Math.floor(
              (numPacked / numItems) * 100
            )}%)`}
      </em>
    </footer>
  );
}
