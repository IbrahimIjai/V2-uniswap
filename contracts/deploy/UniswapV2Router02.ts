import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: // getChainId,
// ethers,
HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // const chainId = parseInt(await getChainId());

  // if (!process.env.WNATIVE_ADDRESS) {
  //   throw Error(`No WNATIVE_ADDRESS for chain #${chainId}!`);
  // }

  // const factory = await ethers.getContract("UniswapV2Factory");

  // await deploy("WETH9", {
  //   from: deployer,
  //   deterministicDeployment: false,
  // });

  // const wethAddress = await ethers.getContract("WETH9", deployer);
  const wethAddress = "0x4200000000000000000000000000000000000006";
  const factoryAddress = "0x5fef6FdF7f46Ff1E0d2EF5fa8Ce052E45e5D1616";
  // const router = "0x3D05d6Fd225729F7fb8f624A59CE22Af842b172F"
  // const initcode = "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303"
  // await deploy("UniswapV2Router02", {
  //   from: deployer,
  //   // args: [factory.address, wethAddress.address],
  //   args: [factory.address, wethAddress],
  //   log: true,
  //   deterministicDeployment: false,
  // });

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
};

func.tags = ["UniswapV2Router02", "AMM"];

func.dependencies = ["UniswapV2Factory", "wethAddress"];

export default func;
