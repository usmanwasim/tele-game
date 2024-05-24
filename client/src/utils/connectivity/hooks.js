import { useMemo } from 'react';
import { ethers, BigNumber } from 'ethers';

import { TokenAddress, PresaleAddress, PresaleJsonRpc, TokenAbi, PresaleAbi } from './Environment';

const walletAdd = '0x4eCbf8722613809922E436B5FB666FfB864363CC';

const useContract = (address, ABI, signer) => {
    return useMemo(() => {
        const rpc = PresaleJsonRpc();
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const voidSigner = new ethers.VoidSigner(walletAdd, provider);
        if (signer) return new ethers.Contract(address, ABI, signer);
        else return new ethers.Contract(address, ABI, voidSigner);
    }, [address, ABI, signer]);
};

export function usePresaleContract(signer) {
    const contract = PresaleAddress();
    const abi = PresaleAbi();
    return useContract(contract, abi, signer);
}

export function useTokenContract(signer) {
    const contract = TokenAddress();
    const abi = TokenAbi();
    return useContract(contract, abi, signer);
}

function calculateGasMargin(value) {
    return +(
        (value * BigNumber.from(10000).add(BigNumber.from(1000))) /
        BigNumber.from(10000)
    ).toFixed(0);
}
export const gasEstimationPayable = async (account, fn, data, amount) => {
    if (account) {
        const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(() => {
            return fn(...data, { value: amount.toString() });
        });
        return calculateGasMargin(estimateGas);
    }
};
export const gasEstimationForAll = async (account, fn, data) => {
    if (account) {
        const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(() => {
            return fn(...data);
        });
        return calculateGasMargin(estimateGas);
    }
};
