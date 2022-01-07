import LogInForm from "../components/login/LogInForm";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Index = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <>
        <LogInForm />
      </>
    );
  } else if (user) {
    return (
      <>
        <div className="nothingToSee">
          <h2>Welcome to Flitter!</h2>
        </div>
      </>
    );
  }
};

export default Index;
