import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from '@rainbow-me/rainbowkit/chains';
import { RPC_URLS, BASE_CHAIN_ID } from '@/config/contracts';

export const wagmiConfig = getDefaultConfig({
  appName: 'Hydrex Bribe Calculator',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [base],
  ssr: true,
});

// Helper function to format token amounts
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const remainder = amount % divisor;
  const decimalsStr = remainder.toString().padStart(decimals, '0');
  const trimmed = decimalsStr.replace(/\.?0+$/, '');
  
  if (trimmed === '') {
    return whole.toString();
  }
  
  return `${whole}.${trimmed}`;
}

// Helper function to parse token amounts
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  const [whole, decimal = ''] = amount.split('.');
  const paddedDecimal = decimal.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole) * BigInt(10 ** decimals) + BigInt(paddedDecimal || '0');
}

