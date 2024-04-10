import {
  Bip39,
  keccak256,
  EnglishMnemonic,
  Slip10,
  Slip10Curve,
  Secp256k1,
  HdPath,
  ripemd160,
  sha256,
} from '@cosmjs/crypto';
import { toBech32, toHex } from '@cosmjs/encoding';

export function toSeed(mnemonic: string) {
  return Bip39.mnemonicToSeed(new EnglishMnemonic(mnemonic));
}

export function toPrivateKey(seed: Uint8Array, path: HdPath) {
  const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, path);
  return privkey;
}

export async function toPublicKey(privateKey: Uint8Array) {
  const { pubkey } = await Secp256k1.makeKeypair(privateKey);
  return pubkey;
}

export async function toEtherAddress(pubkey: Uint8Array) {
  return '0x' + toHex(keccak256(pubkey.slice(1)).slice(-20)).toUpperCase();
}

export async function toEthermintLikeBech32Address(
  pubkey: Uint8Array,
  prefix: string
) {
  return toBech32(prefix, keccak256(pubkey.slice(1)).slice(-20));
}

export async function privateKeyToBech32Address(
  privateKey: Uint8Array,
  prefix: string
) {
  const pubkey = await toPublicKey(privateKey);
  return toBech32(prefix, ripemd160(sha256(Secp256k1.compressPubkey(pubkey))));
}
