import { WalletDerive } from './modules/WalletDerive';

function App() {
  return (
    <div className="App">
      <div>
        声明：该网站不存储私钥，安全起见，建议在无痕模式浏览器 +
        断网情况下使用。
      </div>
      <WalletDerive />
    </div>
  );
}

export default App;
