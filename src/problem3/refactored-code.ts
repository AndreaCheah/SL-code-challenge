import type { PropsWithChildren } from "react";
import React, { useState, useEffect, useMemo } from "react";

const PRICES_API_URL = "https://interview.switcheo.com/prices.json";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletRowProps {
  className: string;
  key: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  amount,
  usdValue,
  formattedAmount,
}: PropsWithChildren<WalletRowProps>) => {
  // Implementation of WalletRow
  return <div>{/* Row content here */}</div>;
};

enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

const BlockchainPriority: { [key in Blockchain]: number } = {
  [Blockchain.Osmosis]: 100,
  [Blockchain.Ethereum]: 50,
  [Blockchain.Arbitrum]: 30,
  [Blockchain.Zilliqa]: 20,
  [Blockchain.Neo]: 20,
};

class Datasource {
  // TODO: Implement datasource class
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {
  const balances = getWalletBalances();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const datasource = new Datasource(PRICES_API_URL);
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPriority = (blockchain: Blockchain): number => {
    return BlockchainPriority[blockchain] || -99; // returns -99 if the blockchain is not found
  };

  const sortedBalances = useMemo(() => {
      // Filter out invalid balances
      const validBalances = balances.filter((balance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balance.amount > 0 && balancePriority > -99;
      });
      // Sort balances by priority
      return validBalances.sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    
    return (
      <WalletRow 
        className={classes.row}
        key={`${balance.currency}-${index}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
