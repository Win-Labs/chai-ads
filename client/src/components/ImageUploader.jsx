import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Image = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  background-image: url(${(props) => props.imgsrc});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  font-size: 30px; /* Size of the plus sign */
  color: #333;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageUploader = ({ image = null, setImage, disabled }) => {
  const handleImageChange = (e) => {
    if (disabled) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage({
        src: reader.result,
        file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <HiddenInput
        disabled={disabled}
        type="file"
        id="image-upload"
        onChange={handleImageChange}
        accept="image/*"
      />
      <Image htmlFor="image-upload" imgsrc={image?.src}>
        {!image?.src && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            width="2rem"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        )}
      </Image>
    </Wrapper>
  );
};

export default ImageUploader;
