import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
import {useState, useEffect} from "react";


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
    console.log(value)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select style={{width: 350}}
        mode="multiple"
        open={select}
        onClick={() => setSelect(prev => !prev) }
        placeholder="select one country"
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

      <Button type="primary">test</Button>
    </Layout.Header>
  );
};

export default AppHeader;
