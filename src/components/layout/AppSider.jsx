import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { fetchAssets, fetchCrypto } from "../utils/api";
import { Spin } from "antd";
import {percentDifference} from './../utils/PercentUtils';


const siderStyle = {
    padding: "1rem",

};

const AppSider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    
    useEffect(()=>{
        async function preload(){
          setIsLoading(true)
          const {result} = await fetchCrypto();
          const assets = await fetchAssets();

          setCrypto(result); 
          setAssets(assets.map((asset)=> {
              const coin = result.find(c => c.id === asset.id)
              return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                ...asset
              }
          }));
          setIsLoading(false);
        }

        preload() 
    }, [])
    
    if(isLoading === true) return <Spin fullscreen/>

    return (
    <Layout.Sider width="25%" style={siderStyle}>
        {assets.map(asset => (
          <Card 
            style={{marginBottom: "1rem"}}
          >
            <Statistic
              title={asset.id}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
              prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
              suffix="$"
            />
            <List
             size="small"
              dataSource={[
                {title: 'TotalProfit', value: asset.totalProfit, withTag: true},
                {title: 'AssetAmount', value: asset.amount, isPlain: true},
                {title: 'Difference', value: asset.growPercent}
              ]} 
              renderItem={(item) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.title}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {item.withTag && (
                        <Tag color={ asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                      )}
                      {item.isPlain && item.value}
                      {(!item.isPlain && typeof item.value === 'number') && <Typography>{item.value.toFixed(2)}$</Typography>}
                  </div>
                </List.Item> 
              )}
            />
          </Card>)
        )}
    </Layout.Sider>
    )
}

export default AppSider;