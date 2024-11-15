import React, { useState } from 'react';
import LLMs from './data/llms.js'; 

const DataTable = () => {
  const [data, setData] = useState(LLMs.llms);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortDataByCombinedCost = () => {
    const direction = sortConfig.key === 'combined' && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedData = [...data].sort((a, b) => {
      const totalA = a.input_cost_per_m + a.output_cost_per_m;
      const totalB = b.input_cost_per_m + b.output_cost_per_m;
      return direction === 'asc' ? totalA - totalB : totalB - totalA;
    });

    setSortConfig({ key: 'combined', direction });
    setData(sortedData);
  };

  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
    }
    return '↕️'; // Default indicator
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
      <button 
        onClick={sortDataByCombinedCost} 
        style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Sort by Combined Cost {getSortIndicator('combined')}
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={headerStyle}>Provider</th>
            <th style={headerStyle} onClick={() => sortData('input_cost_per_m')} >
              Input Cost Per M 
              <button style={buttonStyle}>
                {getSortIndicator('input_cost_per_m')}
              </button>
            </th>
            <th style={headerStyle} onClick={() => sortData('output_cost_per_m')} >
              Output Cost Per M 
              <button style={buttonStyle}>
                {getSortIndicator('output_cost_per_m')}
              </button>
            </th>
            <th style={headerStyle}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
              <td style={cellStyleLeft}>{row.provider}</td>
              <td style={cellStyle}>{row.input_cost_per_m}</td>
              <td style={cellStyle}>{row.output_cost_per_m}</td>
              <td style={cellStyle}>
                {JSON.parse(row.tags).map((tag, index) => (
                  <span key={index} style={chipStyle}>
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  padding: '10px',
  backgroundColor: '#f8f9fa',
  fontWeight: 'bold',
  color: 'black',
  textAlign: 'center',
  cursor: 'pointer',
};

const cellStyleLeft = {
  padding: '10px',
  color: 'black',
  textAlign: 'left',
};

const cellStyle = {
  padding: '10px',
  color: 'black',
};

const buttonStyle = {
  marginLeft: '5px',
  padding: '5px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const chipStyle = {
    display: 'inline-block',
    backgroundColor: '#e0e0e0',
    color: '#333',
    padding: '5px 10px',
    margin: '2px',
    borderRadius: '15px',
    fontSize: '12px',
};
  

export default DataTable;
