import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";

const ErrorDisplay: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.error && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <b className="text-red">Error:</b> {state.error}
        </div>
      )}
    </>
  );
};

export default ErrorDisplay;
