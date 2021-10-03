import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useRef } from "react";
import Button from "../Button";
import CardForm, { Inputs } from "../CardForm";
import { AppContext } from "../context/AppContext";
import ErrorDisplay from "../ErrorDisplay";

import { plans } from "../utils/plans";
import { exampleAPI, kushki } from "../utils/services";
import testCards from "../utils/testCards";

interface SubscribeProps extends RouteComponentProps {
  plan?: string;
}

const Subscribe: React.FC<SubscribeProps> = ({
  plan,
  ..._props
}: SubscribeProps) => {
  const { state, setState } = useContext(AppContext);

  const cardFormRef = useRef<any>();

  const setValues = (type: "approved" | "declinedOnToken" | "declined") => {
    cardFormRef.current.setValues(
      testCards[type].cardNumber,
      testCards[type].cardName,
      testCards[type].expDate,
      testCards[type].cvc,
      testCards[type].email,
      testCards[type].phone
    );
  };

  const selectedPlan = plans.find((p) => p.id === plan);
  const today = new Date();

  const onSubmit = (data: Inputs) => {
    setState({
      loading: true,
      currentOperation: "token"
    });

    kushki.requestSubscriptionToken(
      {
        currency: "USD",
        card: {
          name: data.cardName,
          number: data.cardNumber.replace(/ /g, ""),
          cvc: data.cvc,
          expiryMonth: data.expDate.split("/")[0],
          expiryYear: data.expDate.split("/")[1]
        }
      },
      (response: any) => {
        if (!response.code) {
          setState((state: any) => ({
            ...state,
            token: response.token
          }));
          exampleAPI
            .post("/subscriptions", {
              amount: selectedPlan ? selectedPlan.price : 0,
              email: data.email,
              planName: selectedPlan ? selectedPlan.name : "",
              phone: data.phone,
              name: data.cardName,
              token: response.token
            })
            .then((response) => {
              console.log(response.data);
              setState((state: any) => ({
                ...state,
                subscriptionResponse: response.data
              }));

              navigate("/result");
            })
            .catch((error) => {
              if (error.response) {
                setState((state: any) => ({
                  ...state,
                  error: error.response.data.message
                }));
              } else {
                console.error(error);
              }
            })
            .finally(() => {
              setState((state: any) => ({
                ...state,
                loading: false
              }));
            });
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            error: response.message
          }));
        }
      }
    );
  };

  return (
    <>
      <div className="plan-form">
        <h4 className="plan-form__title">
          Ingresa tus detalles para iniciar tu suscripción
        </h4>
        <div className="plan-form__details">
          <p>
            Te estás suscribiendo al plan {selectedPlan && selectedPlan.name}
          </p>
          <p className="plan-description">
            Se te cobrará{" "}
            <b>
              ${selectedPlan && selectedPlan.price} el día {today.getDate()} de
              cada mes
            </b>{" "}
            a tu tarjeta, partiendo por hoy
          </p>
        </div>

        <CardForm
          onSubmit={onSubmit}
          chargeAmount={selectedPlan ? selectedPlan.price : 0}
          loading={state.loading}
          ref={cardFormRef}
        />
      </div>
      <div className="text-center">
        <div className="test-data">
          <span className="test-data__title">Datos de prueba</span>
          <Button
            className="option-button"
            onClick={() => setValues("approved")}
          >
            Transacción aprobada
          </Button>
          <Button
            className="option-button"
            onClick={() => setValues("declinedOnToken")}
          >
            Transacción declinada en solicitud de token
          </Button>
          <Button
            className="option-button"
            onClick={() => setValues("declined")}
          >
            Transacción declinada
          </Button>
        </div>

        {state.token && (
          <div style={{ marginTop: "1rem" }}>
            <b>Token obtenido:</b> {state.token}
          </div>
        )}
      </div>

      <ErrorDisplay />
    </>
  );
};

export default Subscribe;
