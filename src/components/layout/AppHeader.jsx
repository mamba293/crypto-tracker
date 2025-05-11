import { Layout, Select, Space, Button, Modal,Drawer} from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState, useEffect } from "react";
import CoinInfoMaodal from "../CoinInfoModal";
import AddAssetInfo from "../AddAssetInfo";


const headerStyle = {
  width: "100%",
  height: 60,
  textAlign: "center",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const {crypto} = useCrypto();

  useEffect(()=>{
    const keypress = (event) => {
        if(event.key === '/'){
          setSelect(prev => !prev)
        }
    } 

    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  },[])

  function handleSelect(value){
    setCoin(crypto.find(c => c.id === value))
    setIsModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select style={{width: 350}}
        open={select}
        onClick={() => {setSelect(prev => !prev)} }
        placeholder="Press / to open"
        onSelect={handleSelect}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
               <img style={{width: 20}} src={option.data.icon} alt={option.data.value}/> {' '}
              {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        keyboard={true} 
        footer={null}
      >
        <CoinInfoMaodal coin={coin}/>
      </Modal>

      <Drawer
        title="Add Asset"
        open={drawer}
        width={500}
        destroyOnClose={true}
        onClose={()=> setDrawer(false)}
      >
        <AddAssetInfo coin={coin}/>
      </Drawer>

    </Layout.Header>
  );
};

export default AppHeader;
