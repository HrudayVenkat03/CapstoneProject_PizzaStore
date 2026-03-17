import "../styles/Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import loginUser from "../Services/AuthService";

function AdminLogin(){

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues:{
      email:"",
      password:""
    },

    validationSchema:Yup.object({

      email:Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password:Yup.string()
        .min(6,"Password must be at least 6 characters")
        .required("Password is required")

    }),

    onSubmit: async(values)=>{

      try{

        const data = await loginUser(values.email,values.password);

        if(data.role !== "ADMIN"){
          alert("Access denied. Not an admin.");
          return;
        }

        localStorage.setItem("token",data.token);
        localStorage.setItem("role",data.role);

        navigate("/admin");

      }catch(error){

        alert("Invalid admin credentials");

      }

    }

  });

  return(

    <div className="login-container">

      <div className="login-card">

        <h2>Admin Login</h2>

        <form onSubmit={formik.handleSubmit}>

          <div className="form-group">

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
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
            Admin Login
          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminLogin;