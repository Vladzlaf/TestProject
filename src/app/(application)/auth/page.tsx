import DealForm from "@/components/DealForm";

export default async function Auth() {
  return (
    <div>
      <div>
        <h1>Auth</h1>
        <form>
          <label>
            Email
            <input type="email" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div>
        <h1>Or</h1>
        <p>Sign up</p>
        <DealForm/>
      </div>
    </div>
  );
}

