// @ts-nocheck
import styled from "styled-components";

// Container to hold the tree
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Use $gap to avoid conflict with DOM attributes
const NodeChildren = styled.div<{ $gap: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $gap }) => `${$gap}px`}; // Ensure gap is correctly typed and used
  transform: rotate(-90deg);
`;

const Node = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: #f7f7f7;
`;

// Function to calculate the total number of nodes
const computeTotalNodes = (lastLevelNodes: number): number => {
  const height = Math.ceil(Math.log2(lastLevelNodes)) + 1;
  const fullLevelsNodes = Math.pow(2, height - 1) - 1;
  return fullLevelsNodes + lastLevelNodes;
};

// Function to construct the Merkle tree recursively with node names
const buildTree = (
  nodeCount: number,
  currentNode: number,
  initialGap: number
): JSX.Element | null => {
  if (currentNode === 0) return null;

  if (currentNode === 1) {
    return <Node key={currentNode}>{`N${currentNode}`}</Node>;
  }

  return (
    <NodeChildren $gap={initialGap - 10} key={currentNode}>
      {buildTree(nodeCount, currentNode - 2, initialGap - 10)}
      {/* Left child */}
      <Node>{`N${currentNode}`}</Node>
      {buildTree(nodeCount, currentNode - 1, initialGap - 10)}
      {/* Right child */}
    </NodeChildren>
  );
};

// Parent component to render the tree
const MerkleTree = (): JSX.Element => {
  const lastLevelNodes = 8;
  const initialGap = 50;
  const totalNodes = computeTotalNodes(lastLevelNodes);

  return (
    <div>
      <h2>Merkle Tree</h2>
      <Container>{buildTree(totalNodes, totalNodes, initialGap)}</Container>
    </div>
  );
};

export default MerkleTree;
