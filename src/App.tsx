import { Box } from '@mui/material';
import { WalletDerive } from './modules/WalletDerive';

function App() {
  return (
    <div className="App">
      <Box my={2}>
        <div>
          声明：该网站不存储私钥，安全起见，建议在无痕模式浏览器 +
          断网情况下使用。
        </div>
        <div>
          <a href="https://github.com/YES-Lee/wallet-tools" target="__blank">
            源码：https://github.com/YES-Lee/wallet-tools
          </a>
        </div>
      </Box>
      <WalletDerive />
    </div>
  );
}

export default App;
