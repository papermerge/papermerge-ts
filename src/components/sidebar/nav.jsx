export default function Nav({children}) {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      {children}
    </ul>
  );
}