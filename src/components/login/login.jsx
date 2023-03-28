import Username from "./username";
import Password from "./password";
import Button from "./button";


export default function Login() {
  return (
    <form>
      <div class="mb-3 form-floating">
        <Username />
      </div>

    <div class="mb-3 form-floating">
      <Password />
    </div>

    <Button />
  </form>
  );
}