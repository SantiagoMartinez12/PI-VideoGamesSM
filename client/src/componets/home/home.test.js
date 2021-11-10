import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import App from "../../App";

describe("<Home/>", () => {
    const component = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/home"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    it("Should render Card component", () => {
        component.container.querySelector("Card");
    });
    it("Should render Paginado component", () => {
        component.container.querySelector("Paginado");
    });
    it("Should render SearchBar component", () => {
        component.container.querySelector("SearchBar");
    });


});