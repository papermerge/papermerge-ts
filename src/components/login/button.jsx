export default function Button(props) {
  return (
    <>
      <button {...props}
        className="btn btn-lg btn-block btn-primary"
        style={{'width': '100%'}}>
        Sign In
      </button>
    </>
  );
}