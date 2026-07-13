import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/slices/userSlice";

import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/users/forgetPassword" className="float-right mb-4">
                Forgot Password
              </Link>

              <button className="btn btn-block py3">LOGIN</button>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/users/signup">
                  NEW USER?
                </Link>
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <p className="mb-2 text-muted" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                  <strong>QUICK AUTOFILL DEMO</strong>
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info mr-3"
                    onClick={() => {
                      setEmail("test@user.com");
                      setPassword("test123");
                    }}
                  >
                    👤 User Demo
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setEmail("test@admin.com");
                      setPassword("test123");
                    }}
                  >
                    🛠️ Admin Demo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
