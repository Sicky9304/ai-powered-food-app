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

              <div 
                className="demo-autofill-container mb-4 p-3" 
                style={{
                  background: "linear-gradient(135deg, rgba(7, 131, 71, 0.04) 0%, rgba(5, 106, 58, 0.08) 100%)",
                  border: "1px dashed rgba(7, 131, 71, 0.3)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)"
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#056a3a", letterSpacing: "1px", textTransform: "uppercase" }}>
                    ⚡ Demo Quick-fill
                  </span>
                  <span className="badge" style={{ fontSize: "0.7rem", backgroundColor: "#eaf6ed", color: "#078347", fontWeight: "bold", padding: "4px 8px", borderRadius: "10px" }}>
                    1-Click Auto Fill
                  </span>
                </div>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      border: "1.5px solid #078347",
                      color: "#078347",
                      backgroundColor: "transparent",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#078347";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#078347";
                      e.currentTarget.style.transform = "none";
                    }}
                    onClick={() => {
                      setEmail("test@user.com");
                      setPassword("test123");
                    }}
                  >
                    👤 User Demo
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      border: "1.5px solid #dc3545",
                      color: "#dc3545",
                      backgroundColor: "transparent",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc3545";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#dc3545";
                      e.currentTarget.style.transform = "none";
                    }}
                    onClick={() => {
                      setEmail("test@admin.com");
                      setPassword("test123");
                    }}
                  >
                    🛠️ Admin Demo
                  </button>
                </div>
              </div>

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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
