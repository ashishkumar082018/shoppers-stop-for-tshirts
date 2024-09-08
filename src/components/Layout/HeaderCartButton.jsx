import React, { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
    const CartCtx = useContext(CartContext);

    // Add a safety check to ensure CartCtx.items is defined
    const numberOfCartItems = (CartCtx.Tshirts || []).reduce((curNumber, item) => {
        return curNumber + Number(item.amount);
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
