import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "./ImageUploader";
import {
  ButtonWrapper,
  Icon,
  ModalTitle,
  Wrapper,
} from "./pfa/screens/styles/CreateEditFeedbackStyles";
import InputRow from "./pfa/components/InputRow";
import Arrow from "./pfa/components/UI/Arrow";
import Button from "./pfa/components/UI/Button";
import Input from "./pfa/components/UI/Input";
import SelectBox from "./pfa/components/UI/SelectBox";
import Container from "./pfa/components/Container";
import classes from "./pfa/screens/styles/CreateEditFeedback.module.css";
import StyledInput from "./pfa/components/UI/styles/StyledInput";

// const Wrapper = styled.div`
//   display: flex;
//   width: 48.5rem;
//   flex-direction: column;
//   align-items: center;
//   align-self: start;
//   gap: 2rem;
//   padding: 3rem;
//   border: 0.1rem solid #fff;
//   border-radius: 0.8rem;
// `;

// const InputRow = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-direction: column;
//   width: 100%;
// `;

// const Label = styled.label`
//   font-size: 1.8rem;
// `;

// const Input = styled.input`
//   padding: 1rem;
//   width: 100%;
//   font-family: Lexend;
// `;

// const TextArea = styled.textarea`
//   padding: 1rem;
//   min-width: 100%;
//   font-family: Lexend;
//   resize: none;
// `;

// const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 5rem;
//   font-size: 1.5rem;
// `;

const FormModal = () => {
  const [to, setTo] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");

  const MODAL_TITLE = "Create your bundle transaction";

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

  const handleToBlur = (event) => {};
  const handleDurationBlur = (event) => {};
  const handlePriceBlur = (event) => {};
  const handleTextBlur = (event) => {};

  return (
    // <Wrapper>
    // <InputRow>
    //   <Label>Image</Label>
    //   <ImageUploader image={image} setImage={setImage} disabled={false} />
    // </InputRow>
    //   <InputRow>
    //     <Label>Recipient</Label>
    //     <Input
    //       id="to"
    //       name="to"
    //       placeholder="enter wallet address"
    //       value={to}
    //       onChange={toHandler}
    //     />
    //   </InputRow>
    //   <InputRow>
    //     <Label>Duration</Label>
    //     <Input
    //       id="duration"
    //       name="duration"
    //       placeholder="enter post duration"
    //       value={duration}
    //       onChange={durationHandler}
    //     />
    //   </InputRow>
    //   <InputRow>
    //     <Label>Price</Label>
    //     <Input
    //       id="price"
    //       name="price"
    //       placeholder="enter offered price"
    //       value={price}
    //       onChange={priceHandler}
    //     />
    //   </InputRow>
    //   <InputRow>
    //     <Label>Text</Label>
    //     <TextArea
    //       id="text"
    //       name="text"
    //       placeholder="enter post's content"
    //       value={text}
    //       onChange={textHandler}
    //     />
    //   </InputRow>
    //   <Button>MAKE OFFER</Button>
    // </Wrapper>
    <>
      {/* <StyledAccount>{account ? account : "Not Connected"}</StyledAccount> */}
      <Container className={classes.level_0}>
        <Container className={classes.level_1}>
          <Wrapper>
            <ModalTitle>Request publication</ModalTitle>
            <Container className={classes.level_2}>
              <InputRow title="Image">
                <ImageUploader
                  image={image}
                  setImage={setImage}
                  disabled={false}
                />
              </InputRow>
              <InputRow title="Recipient">
                <Input
                  id="to"
                  name="to"
                  placeholder="Enter wallet address"
                  value={to}
                  error={false}
                  onBlur={handleToBlur}
                  onChange={toHandler}
                />
              </InputRow>
              <InputRow title="Duration">
                <Input
                  id="duration"
                  name="duration"
                  value={duration}
                  error={false}
                  placeholder="Enter post duration"
                  onBlur={handleDurationBlur}
                  onChange={durationHandler}
                />
              </InputRow>
              <InputRow title="Price">
                <Input
                  id="price"
                  name="price"
                  placeholder="Enter offered price"
                  value={price}
                  error={false}
                  onBlur={handlePriceBlur}
                  onChange={priceHandler}
                />
              </InputRow>
              <InputRow title="Text">
                <StyledInput
                  id="text"
                  name="text"
                  as="textarea"
                  active
                  placeholder="Enter post's content"
                  value={text}
                  error={false}
                  onBlur={handleTextBlur}
                  onChange={textHandler}
                />
              </InputRow>
            </Container>
            <Container className={classes.level_3}>
              <Container>
                <Button
                  className={classes.level_4}
                  kind="default"
                  paint="#AD1FEA"
                  type="button"
                  onClick={() => {}}
                >
                  Request Ad
                </Button>
              </Container>
            </Container>
          </Wrapper>
        </Container>
      </Container>
    </>
  );
};

export default FormModal;
