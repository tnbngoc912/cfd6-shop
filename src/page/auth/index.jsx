import Login from "./component/Login";
import Register from "./component/Register";

export default function Auth() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <Login />
          <Register />
        </div>
      </div>
    </section>
  );
}
