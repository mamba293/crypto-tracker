import React from 'react';
import {Layout } from 'antd';
import "./index.css"
import AppHeader from './components/layout/AppHEader';
import AppSlider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';

const layoutStyle = {
  borderRadius: 8,
};

function App() {

  return (
      <Layout style={layoutStyle}>
        <AppHeader />
        <Layout>
          <AppSlider />
          <AppContent />
        </Layout>
    </Layout>
  )
}

export default App
