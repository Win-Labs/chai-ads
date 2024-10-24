// @ts-nocheck
import styled from "styled-components";

// Container to hold the tree
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: auto;
  position: relative;
`;

// Use $gap to avoid conflict with DOM attributes
const NodeChildren = styled.div<{ $gap: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 80px;
  display: flex;
  gap: 20px;
  transform: rotate(90deg);
`;

const Node = styled.div`
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
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
  currentNode: number
): JSX.Element | null => {
  if (currentNode === 0) return null;

  if (currentNode === 1) {
    return <Node key={currentNode}>{`N${currentNode}`}</Node>;
  }

  return (
    <NodeChildren key={currentNode}>
      {buildTree(nodeCount, currentNode - 2)}
      {/* Left child */}
      <Node>{`N${currentNode}`}</Node>
      {buildTree(nodeCount, currentNode - 1)}
      {/* Right child */}
    </NodeChildren>
  );
};

// Parent component to render the tree
const MerkleTree = (): JSX.Element => {
  const lastLevelNodes = 4;
  const xPercent = 50;
  const yPercent = 50;
  const totalNodes = computeTotalNodes(lastLevelNodes);
  console.log(totalNodes);
  return <Container>{buildTree(totalNodes, totalNodes)}</Container>;
};

export default MerkleTree;
