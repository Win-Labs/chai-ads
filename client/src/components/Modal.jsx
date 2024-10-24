import { useEffect, useState } from "react";
import Button from "./Button";
import { useAccount } from "wagmi";
import useWrite from "../hooks/useContract";
import Loader from "./Loader";
import {
  Buttons,
  Input,
  InputContainer,
  Label,
  ModalContainer,
  Overlay,
  SelectBox,
  Step,
  StepsContainer,
  SubLabel,
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import { usePATCH } from "../hooks/useServer";

const Modal = ({ toggle }) => {
  const { address } = useAccount();

  // Step 1
  const [recipient, setRecipient] = useState("orkhan_influenza");
  const [duration, setDuration] = useState(30);
  const [currency, setCurrency] = useState("usdt");
  const [network, setNetwork] = useState("ethereum");
  // Step 2
  const [text, setText] = useState("rollup_id");
  const [amount, setAmount] = useState(1000);
  const [rollupType, setRollupType] = useState("polygon_cdk");
  const [orderCommitmentType, setOrderCommitmentType] = useState("sign");
  const [encryptedTransactionType, setEncryptedTransactionType] =
    useState("skde");
  const [platform, setPlatform] = useState("ethereum");
  const [serviceProvider, setServiceProvider] = useState("eigen_layer");
  const [rpcUrl, setRpcUrl] = useState("https://www.google.ru/");
  const [webSocketUrl, setWebSocketUrl] = useState("https://www.naver.com/");
  const [blockExplorerUrl, setBlockExplorerUrl] = useState(
    "https://www.hello-world.com/"
  );

  const [step, setStep] = useState(1);
  const [transactionCompleted, setTransactionCompleted] = useState(false); // New state to track transaction completion

  const { write, hash, isHashPending } = useWrite();

  const {
    mutate: patchData,
    isLoading: isPatchLoading,
    isError: isPatchError,
    error: patchError,
  } = usePATCH(`http://localhost:3333/api/v1/ads/${recipient}`, {
    onSuccess: (data) => {
      console.log("Resource updated successfully:", data);
    },
    onError: (error) => {
      console.log(data);

      console.error("Error updating resource:", error);
    },
  });

  // Handle ad initialization (Step 1)
  const handleInitializeAd = () => {
    write("initializeAd", [recipient, duration]);
    setTransactionCompleted(false); // Reset the flag when a new transaction begins
  };

  // Handle rollup addition (Step 2)
  const handleAddRollup = () => {
    write("addRollup", [
      recipient,
      {
        text,
        rollupType,
        encryptedTransactionType,
        owner: address,
        orderCommitmentType,
        validationInfo: { platform, serviceProvider },
      },
    ]);
    setTransactionCompleted(false); // Reset the flag when a new transaction begins
  };

  const handleAddServerData = () => {
    const data = {
      text,
      executorAddress: address,
      rpcUrl,
      blockExplorerUrl,
      websocketUrl: webSocketUrl,
    };
    patchData(data);
    console.log("data", data);
    if (!isPatchError) {
      setTransactionCompleted(false);
    }
  };

  // Effect to move to the next step when the hash arrives and it's not pending
  useEffect(() => {
    console.log("hash", hash);

    // Only proceed if the transaction is not pending and it hasn't already triggered a step transition
    if (hash && !isHashPending && !transactionCompleted) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        toggle();
      }
      setTransactionCompleted(true); // Mark the transaction as completed, preventing multiple triggers
    }
  }, [hash, isHashPending, step, transactionCompleted]);

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>
          <span>Request Ad</span>
        </Title>
        {isHashPending ? (
          <Loader />
        ) : (
          step === 1 && (
            <>
              <InputContainer>
                <Label>Recipient</Label>
                <Input
                  value={recipient}
                  type="text"
                  onChange={(e) => {
                    setRecipient(e.target.value);
                  }}
                />
              </InputContainer>{" "}
              <InputContainer>
                <Label>Duration</Label>
                <Input
                  value={duration}
                  type="text"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </InputContainer>{" "}
              <InputContainer>
                <Label>Text</Label>
                <Input
                  value={text}
                  type="text"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </InputContainer>
              <InputContainer>
                <Label>Currency</Label>
                <SelectBox onChange={(e) => setCurrency(e.target.value)}>
                  <option defaultValue="usdt">USDT</option>
                  <option value="eth">ETH</option>
                </SelectBox>
              </InputContainer>
              <InputContainer>
                <Label>Offer</Label>
                <Input
                  value={amount}
                  type="text"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </InputContainer>
              <InputContainer>
                <Label>Network</Label>
                <SelectBox onChange={(e) => setNetwork(e.target.value)}>
                  <option defaultValue="ethereum">Ethereum Mainnet</option>
                </SelectBox>
              </InputContainer>{" "}
            </>
          )
        )}
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={handleAddRollup} disabled={step !== 2}>
              Request add{" "}
            </Button>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
