import { useAccount, useConfig } from 'wagmi';
import PresaleAbiBsc from './presaleAbiBsc.json';
import PresaleAbiGoerli from './presaleAbiGoerli.json';
import TokenAbiBsc from './tokenAbiBsc.json';
import TokenAbiGoerli from './tokenAbiGoerli.json';

export const PresaleAddress = () => {
    const { chains } = useConfig();
    const { chain } = useAccount();
    const presaleContract = {
        [chains[0]?.id]: '0x129CDE6DF20c5853b26321806fE23652F6F68E61',
        [chains[1]?.id]: '0xf1e905aA4Bc813f8813A31daBcEc0E037e4AC617',
    };

    if (chains.find((chains) => chains?.id === chain?.id)) return presaleContract[chain?.id];
    else return '0x129CDE6DF20c5853b26321806fE23652F6F68E61';
};
export const TokenAddress = () => {
    const { chains } = useConfig();
    const { chain } = useAccount();

    const tokenContract = {
        [chains[0]?.id]: '0xdD178eaDfef387d03207a7E81E2Ad0A86e5Fc85a',
        [chains[1]?.id]: '0x24DFfb26EBAf86d4843eA258519379999B63C6cA',
    };
    if (chains.find((chains) => chains?.id === chain?.id)) return tokenContract[chain?.id];
    else return '0xdD178eaDfef387d03207a7E81E2Ad0A86e5Fc85a';
};
export const PresaleJsonRpc = () => {
    const { chains } = useConfig();
    const { chain } = useAccount();

    const jsonRPC = {
        [chains[0]?.id]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        [chains[1]?.id]: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    };
    if (chains.find((chains) => chains?.id === chain?.id)) return jsonRPC[chain?.id];
    else return 'https://data-seed-prebsc-1-s1.binance.org:8545';
};
export const PresaleAbi = () => {
    const { chains } = useConfig();
    const { chain } = useAccount();

    const presaleAbi = {
        [chains[0]?.id]: PresaleAbiBsc,
        [chains[1]?.id]: PresaleAbiGoerli,
    };
    if (chains.find((chains) => chains?.id === chain?.id)) return presaleAbi[chain?.id];
    else return PresaleAbiBsc;
};
export const TokenAbi = () => {
    const { chains } = useConfig();
    const { chain } = useAccount();

    const tokenAbi = {
        [chains[0]?.id]: TokenAbiBsc,
        [chains[1]?.id]: TokenAbiGoerli,
    };
    if (chains.find((chains) => chains?.id === chain?.id)) return tokenAbi[chain?.id];
    else return TokenAbiBsc;
};
