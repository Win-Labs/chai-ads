import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 40rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
`;

const FormModal = () => {
  const [from, setFrom] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const fromHandler = (e) => {
    e.preventDefault();
    setFrom(e.target.value);
  };
  const durationHandler = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
  };
  const imageHandler = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };
  const priceHandler = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  return (
    <Wrapper>
      <Input id="from" name="from" value={from} onChange={fromHandler} />
      <Input
        id="duration"
        name="duration"
        value={duration}
        placeholder="How long should the post be visible"
        onChange={durationHandler}
      />
      <Input
        id="name"
        name="image"
        value={image}
        placeholder=""
        onChange={imageHandler}
      />
      <Input id="price" name="price" value={price} onChange={priceHandler} />
      <Button>MAKE OFFER</Button>
    </Wrapper>
  );
};

export default FormModal;
