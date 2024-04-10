import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { stringToPath } from '@cosmjs/crypto';

import styles from './index.module.scss';
import { useState } from 'react';
import { toHex } from '@cosmjs/encoding';
import {
  privateKeyToBech32Address,
  toPrivateKey,
  toSeed,
} from '../../shared/utils';

export function WalletDerive() {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [path, setPath] = useState<number>(0);

  const handleClickPrivateKey = async () => {
    const seed = await toSeed(mnemonic);
    const pk = toPrivateKey(seed, stringToPath(`m/44'/118'/0'/0/${path}`));
    setPrivateKey(toHex(pk));
    setAddress(await privateKeyToBech32Address(pk, 'axelar'));
  };

  return (
    <div className={styles.WalletDerive}>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="mnemonic_input">Mnemonic phrases</InputLabel>

          <TextField
            id="mnemonic_input"
            label="Mnemonic phrases"
            variant="outlined"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value.trim())}
          />
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="path_input">Derive Path</InputLabel>
          <OutlinedInput
            id="path_input"
            startAdornment={
              <InputAdornment position="start">m/44'/118'/0'/0/</InputAdornment>
            }
            label="Derive Path"
            type="number"
            value={path}
            onChange={(e) => setPath(+e.target.value)}
          />
        </FormControl>
      </Box>

      <Box mb={2}>
        <Button variant="contained" onClick={handleClickPrivateKey}>
          Private key
        </Button>
      </Box>

      <Box mb={2}>
        <div>私钥: {privateKey && <div>{privateKey}</div>}</div>
        <div>Axelar 地址: {address}</div>
        <div>请自行将私钥导入钱包核对私钥和地址是否对应。</div>
      </Box>
    </div>
  );
}
