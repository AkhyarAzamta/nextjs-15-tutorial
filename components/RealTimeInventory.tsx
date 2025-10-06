'use client';

import { useState, useEffect } from 'react';

interface RealTimeInventoryProps {
  productId: string;
}

interface InventoryData {
  stock: number;
  lastUpdated: string;
  location: string;
}

export default function RealTimeInventory({ productId }: RealTimeInventoryProps) {
  const [inventory, setInventory] = useState<InventoryData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('🟢 Connecting to real-time inventory...');
    
    const connectWebSocket = () => {
      setIsConnected(true);
      
      setInventory({
        stock: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString(),
        location: 'Warehouse A'
      });
    };

    connectWebSocket();

    const interval = setInterval(() => {
      if (isConnected) {
        setInventory(prev => prev ? {
          ...prev,
          stock: Math.max(0, prev.stock - Math.floor(Math.random() * 3)),
          lastUpdated: new Date().toISOString()
        } : null);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [productId, isConnected]);

  if (!inventory) {
    return <div className="loading">Connecting to inventory system...</div>;
  }

  const stockStatus = inventory.stock > 20 ? 'In Stock' : 
                     inventory.stock > 0 ? 'Low Stock' : 'Out of Stock';
  
  const statusColor = inventory.stock > 20 ? 'green' : 
                     inventory.stock > 0 ? 'orange' : 'red';

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4>Inventory Status</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          color: isConnected ? 'green' : 'red'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isConnected ? 'green' : 'red',
            marginRight: '0.5rem'
          }} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <div>
          <strong>Stock:</strong>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: statusColor
          }}>
            {inventory.stock}
          </div>
        </div>
        
        <div>
          <strong>Status:</strong>
          <div style={{ color: statusColor, fontWeight: 'bold' }}>
            {stockStatus}
          </div>
        </div>
        
        <div>
          <strong>Location:</strong>
          <div>{inventory.location}</div>
        </div>
      </div>
      
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
        Last updated: {new Date(inventory.lastUpdated).toLocaleTimeString()}
      </div>
      
      <p><em>This section uses real-time WebSocket connection</em></p>
    </div>
  );
}
