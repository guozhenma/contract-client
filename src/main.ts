import { parseEther } from "ethers";
import { oneInchClient } from "./one-inch-client";
import { CARD_PRICE, ETH_ADDRESS } from "./consts";
import { Chain } from "./enums";
import { utils } from "./utils";

const buyCardByETH = async (chain: Chain) => {
  const businessContract = utils.getBusinessContract(chain)!;
  let balanceOfOwner = await businessContract.balanceOfOwner();
  console.log("Balance of owner111: ", balanceOfOwner);

  const tokenAddress = ETH_ADDRESS;
  const amount = parseEther("0.0001");
  const exchangeData = await oneInchClient.swap(chain, tokenAddress, amount);

  const tx = await businessContract.buyCard(
    "buyCard_orderid",
    tokenAddress,
    amount,
    CARD_PRICE,
    exchangeData,
    { value: amount }
  );
  await tx.wait();

  balanceOfOwner = await businessContract.balanceOfOwner();
  console.log("Balance of owner222: ", balanceOfOwner);
};

const depositETH = async (chain: Chain) => {
  const signer = utils.getSigner(chain);
  const businessContract = utils.getBusinessContract(chain)!;

  let balance = await businessContract.balances(signer.address);
  console.log("Balance 111: ", balance);

  const tokenAddress = ETH_ADDRESS;
  const amount = parseEther("0.0001");

  const exchangeData = await oneInchClient.swap(chain, tokenAddress, amount);

  const tx = await businessContract.deposit(
    "deposit_orderid",
    tokenAddress,
    amount,
    exchangeData,
    { value: amount }
  );
  await tx.wait();

  balance = await businessContract.balances(signer.address);
  console.log("Balance 222: ", balance);
};

depositETH(Chain.OP);
