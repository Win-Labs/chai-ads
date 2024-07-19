import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "./ImageUploader";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  font-family: Lexend;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  min-width: 100%;
  font-family: Lexend;
  resize: none;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormModal = () => {
  const [to, setTo] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");

  const toHandler = (e) => {
    e.preventDefault();
    setTo(e.target.value);
  };
  const durationHandler = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
  };
  const priceHandler = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const textHandler = (e) => {
    e.preventDefault();
    setText(e.target.value);
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
          placeholder="wallet address"
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
      <InputRow>
        <Label>Text</Label>
        <TextArea
          id="text"
          name="text"
          placeholder="post's text"
          value={text}
          onChange={textHandler}
        />
      </InputRow>
      <Button>MAKE OFFER</Button>
    </Wrapper>
  );
};

export default FormModal;
