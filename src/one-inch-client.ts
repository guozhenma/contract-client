import axios from "axios";
import { config } from "dotenv";
import { utils } from "./utils";
import { Chain } from "./enums";

config({ path: "./.env" });
class OneInchClient {
  swap = async (chain: Chain, fromAddress: string, amount: bigint) => {
    const usdcAdress = utils.getUsdcAddress(chain);
    const businesAddress = utils.getBusinessAddress(chain);
    const url = utils.get1inchUrl(chain);
    const headers = {
      Authorization: process.env.ONE_INCH_API_KEY,
      Accept: "application/json",
    };
    const params = {
      src: fromAddress,
      dst: usdcAdress,
      amount: amount,
      from: businesAddress,
      receiver: businesAddress,
      slippage: 10,
      disableEstimate: true,
      compatibility: true,
    };

    const resp = await axios.get(url, { headers, params });
    return resp.data.tx.data;
  };
}

const oneInchClient = new OneInchClient();
export { oneInchClient };
