import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableTshirts.module.css";
import TshirtItem from "./Tshirt/Tshirt"; // Assuming Tshirt is a component
import AddTshirt from "./AddTshirt";

// Initial dummy data
export const DUMMY_TSHIRTS = [
  {
    id: Math.random(),
    name: "Navi Blue",
    description: "100% cotton",
    price: 700,
  },
  {
    id: Math.random(),
    name: "Yellow redTape",
    description: "100% cotton and easy to wash",
    price: 500,
  },
  {
    id: Math.random(),
    name: "Dark green Armani",
    description: "Full Sleeves",
    price: 1299,
  },
  {
    id: Math.random(),
    name: "Zara",
    description: "100% cotton and full sleeve",
    price: 1899,
  },
];

const AvailableTshirts = () => {
  // Initialize state with DUMMY_TSHIRTS
  const [Tshirts, setTshirts] = useState(DUMMY_TSHIRTS);

  // Function to add a new T-shirt
  const addTshirts = (newTshirt) => {
    setTshirts((prevTshirts) => {
      return [newTshirt, ...prevTshirts];
    });
  };

  // Map over the Tshirts array
  const tshirtList = Tshirts.map((tshirt) => (
    <TshirtItem
      id={tshirt.id}
      key={tshirt.id}
      name={tshirt.name}
      description={tshirt.description}
      price={tshirt.price}
    />
  ));

  return (
    <>
      <AddTshirt onAddTshirt={addTshirts} />
      <section className={classes.Tshirts}>
        <Card>
          <ul>{tshirtList}</ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableTshirts;
