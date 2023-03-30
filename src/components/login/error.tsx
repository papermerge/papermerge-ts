
type Args = {
  message: string;
}

function Error({message}: Args) {
  return (
    <>
      <div className='text-danger'>
        {message}
      </div>
    </>
  )
}

export default Error;