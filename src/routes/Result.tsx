import React, { useContext } from "react";
import Button from "../Button";
import { AppContext } from "../context/AppContext";

import { useNavigate } from "@reach/router";

interface ResultProps {
  path?: string;
}

const Result: React.FC<ResultProps> = () => {
  const { state, setState } = useContext(AppContext);
  const navigate = useNavigate();

  const resetExample = () => {
    setState({
      currentOperation: "token",
      loading: false
    });
    navigate("/");
  };

  return (
    <div className="success-wrapper">
      <div className="success-icon">✓</div>
      <p className="success-title">Suscripción exitosa</p>
      <pre className="success-code">
        <code>{JSON.stringify(state.subscriptionResponse, null, 2)}</code>
      </pre>

      <Button
        className="option-button"
        onClick={resetExample}
        disabled={state.loading}
      >
        Reiniciar ejemplo
      </Button>
    </div>
  );
};

export default Result;
