import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

// Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
import { abi, bytecode } from "../deployments/ethereum/UniswapV2Factory.json";

const func: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
}: // getChainId,
HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  await deploy("UniswapV2Factory", {
    contract: {
      abi,
      bytecode,
    },
    from: deployer,
    args: [dev],
    log: true,
    // deterministicDeployment: false,
    autoMine: true,
  });

  const factorycont = await ethers.getContract("UniswapV2Factory", deployer);

  console.log("this is FACTORY ADDRESS", factorycont.address);

  const Initcode = await factorycont.pairCodeHash();
  console.log("this is Initcode Initcode", Initcode);
};

func.tags = ["UniswapV2Factory", "AMM"];
export default func;
