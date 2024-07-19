import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "./ImageUploader";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const InputRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  font-family: Lexend;
`;

const Button = styled.button`
  display: flex;
  max-width
`;

const FormModal = () => {
  const [to, setTo] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");

  const toHandler = (e) => {
    e.preventDefault();
    setTo(e.target.value);
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
      <InputRow>
        <Label>Image</Label>
        <ImageUploader image={image} setImage={setImage} disabled={false} />
      </InputRow>
      <InputRow>
        <Label>Recipient</Label>
        <Input
          id="to"
          name="to"
          placeholder="recepient wallet address"
          value={to}
          onChange={toHandler}
        />
      </InputRow>
      <InputRow>
        <Label>Duration</Label>
        <Input
          id="duration"
          name="duration"
          placeholder="post duration"
          value={duration}
          onChange={durationHandler}
        />
      </InputRow>
      <InputRow>
        <Label>Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="offered price"
          value={price}
          onChange={priceHandler}
        />
      </InputRow>
      <Button>MAKE OFFER</Button>
    </Wrapper>
  );
};

export default FormModal;
