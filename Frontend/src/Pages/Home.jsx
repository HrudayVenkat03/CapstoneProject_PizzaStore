import "../styles/Login.css";

function Home(){

  const role = localStorage.getItem("role");

  return(

    <div style={{textAlign:"center",marginTop:"100px"}}>

      <h2>Welcome to Pizza Store 🍕</h2>

      <p>You are logged in as <b>{role}</b></p>

      <p>Pizza ordering features will appear here.</p>

    </div>

  );

}

export default Home;