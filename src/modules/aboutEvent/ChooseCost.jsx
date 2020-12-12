import React from 'react';
import './ChooseCost.css';

export default function ChooseCost({ cost, setCost }) {

  return (
    <div className="chooseCost">
      <p>{+cost === 0 ? 'Установите цену: ' : 'Цена: '}</p>
      <input
        className="aboutevent-cost"
        type="number"
        min="0"
        placeholder="Цена..."
        value={cost}
        onChange={e => setCost(e.target.value)}
      />
    </div>
  )
}