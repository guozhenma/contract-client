import { config } from "dotenv";
import { Contract, Wallet, ethers } from "ethers";
import { Chain } from "./enums";
import { BUSINESS_ABI } from "./abis";

config({ path: "./.env" });

class Utils {
  getBusinessContract = (chain: Chain) => {
    return new Contract(
      this.getBusinessAddress(chain)!,
      BUSINESS_ABI,
      this.getSigner(chain)
    );
  };

  getUsdcAddress = (chain: Chain) => {
    switch (chain) {
      case Chain.ARB:
        return "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
      case Chain.OP:
        return "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85";
      default:
        return undefined;
    }
  };

  getBusinessAddress = (chain: Chain) => {
    switch (chain) {
      case Chain.ARB:
        return "0x01f2F14808f11B91f5643ae83358fF891eEB76a3";
      case Chain.OP:
        return "0xfc617D36DDE96d39F0F6AAda351B6E14075DD661";
      default:
        return undefined;
    }
  };

  getSigner = (chain: Chain) => {
    let provider = new ethers.JsonRpcProvider(
      this.getInfuraUrl(chain),
      this.getChainId(chain)
    );

    return new Wallet(process.env.KEY!, provider);
  };

  get1inchUrl = (chain: Chain) => {
    const chainId = this.getChainId(chain);
    return `https://api.1inch.dev/swap/v5.2/${chainId}/swap`;
  };

  // ========================== PRIVATE ==========================
  private getChainId = (chain: Chain) => {
    switch (chain) {
      case Chain.ARB:
        return 42161;
      case Chain.OP:
        return 10;
      default:
        return undefined;
    }
  };

  private getInfuraUrl = (chain: Chain) => {
    const infuraApiKey = process.env.INFURA_API_KEY!;
    switch (chain) {
      case Chain.ARB:
        return `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`;
      case Chain.OP:
        return `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`;
      default:
        return undefined;
    }
  };
}

const utils = new Utils();

export { utils };
