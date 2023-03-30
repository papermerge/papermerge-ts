export default function Button(props: any) {
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