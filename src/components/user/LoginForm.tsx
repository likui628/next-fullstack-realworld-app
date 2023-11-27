import ListErrors from "@/components/common/ListErrors";

const LoginForm = () => {
  // const data = await fetch('http://localhost:3000/api/users/login', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         "user": {
  //             "email": "alice@realworld.com",
  //             "password": "alice123"
  //         }
  //     })
  // }).then(res => res.json())

  // console.log(data)

  return (
    <>
      <ListErrors />
      <form>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="email"
            placeholder="Email"
            data-testid="input-email"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            placeholder="Password"
            data-testid="input-password"
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          data-testid="btn-submit"
        >
          Sign in
        </button>
      </form>
    </>
  );
};
export default LoginForm;
