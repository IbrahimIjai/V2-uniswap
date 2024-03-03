//Viem Implementation

const { baseSepolia } = require("viem/chains");
const { http, createPublicClient } = require("viem");
const factory_artifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const { getCreate2Address } = require("@ethersproject/address");
const { pack, keccak256 } = require("@ethersproject/solidity");

const INIT_CODE_HASH =
  "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const FACTORY_ADDRESS = "0x38bC16094A1355D835Dc13f591D82532885E8FC8";

//tokens

const USDT = "0xAb2580B25C05031f318003697E43f5aF83AA8886";
const WETH = "0x4200000000000000000000000000000000000006";

const main = async () => {
  const result = await Promise.all([
    client.readContract({
      abi: factory_artifact.abi,
      address: FACTORY_ADDRESS,
      functionName: "getPair",
      args: [USDT, WETH],
    }),
  ]);
  console.log("this is the real pair address", result);

  const pairaddressGenerated = getCreate2Address(
    FACTORY_ADDRESS,
    keccak256(["bytes"], [pack(["address", "address"], [WETH, USDT])]),
    INIT_CODE_HASH,
  );

  const sorts_weth_usdt = WETH.toLowerCase() < USDT.toLowerCase();

  console.log(
    "this is the generated pair address and sort value",
    pairaddressGenerated,
    sorts_weth_usdt,
  );

  return result;
};

main();
