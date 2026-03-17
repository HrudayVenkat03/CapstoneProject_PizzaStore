import "../styles/Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Register(){

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues:{
      name:"",
      email:"",
      password:""
    },

    validationSchema: Yup.object({

      name: Yup.string()
        .min(3,"Name must be at least 3 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6,"Password must be at least 6 characters")
        .required("Password is required")

    }),

    onSubmit: async(values)=>{

      const response = await fetch(
        "http://localhost:8081/auth/register",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(values)
        }
      );

      const data = await response.text();

      alert(data); // alert mesage shows user register successfully

      navigate("/"); // now navigates to next page (login)

    }

  });

  return(

    <div className="login-container">

      <div className="login-card">

        <h2>Register</h2>

        <form onSubmit={formik.handleSubmit}>

          <div className="form-group">

            <input
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            {formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}

          </div>

          <div className="form-group">

            <input
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            {formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

          </div>

          <div className="form-group">

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            {formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}

          </div>

          <button type="submit">
            Register
          </button>

        </form>

        <p className="links">

          Already have an account? <Link to="/">Login</Link>

        </p>

      </div>

    </div>

  );

}

export default Register;