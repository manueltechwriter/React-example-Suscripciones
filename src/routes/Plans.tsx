import { navigate, RouteComponentProps } from "@reach/router";
import React from "react";
import Button from "../Button";
import { plans } from "../utils/plans";

interface PlansProps extends RouteComponentProps {}

const Plans: React.FC<PlansProps> = () => {
  const handleClick = (plan: string) => {
    if (plan === "basic") {
      navigate("/subscribe/basic");
    } else {
      navigate("subscribe/premium");
    }
  };

  return (
    <div className="plan-selection">
      <h1>Selecciona un plan</h1>
      <div className="billing-plan-list">
        {plans.map((bp) => (
          <div className="billing-plan" key={bp.id}>
            <h2 className="billing-plan__title">{bp.name}</h2>
            <p className="billing-plan__price">${bp.price}</p>
            <p className="billing-plan__description">
              Por mes
              <br />
              Facturación mensual
            </p>
            <Button
              className="billing-plan__button"
              onClick={() => handleClick(bp.id)}
            >
              Seleccionar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
