import React from 'react';
import PurchasesFilter from './PurchasesFilter/PurchasesFilter.jsx';
import PurchasesList from './PurchasesList/PurchasesList.jsx';
import AllInfoAboutPurchases from './AllInfoAboutPurchases/AllInfoAboutPurchases.jsx';
import './Purchases.css';

export default function Purchases() {

  return (
    <div className="purchasesWrapper">
      <div className='purchasesConteiner'>
        <AllInfoAboutPurchases className="C1-R1" />
        <PurchasesFilter className="C1-R2" />
        <PurchasesList className="C2-R1" />
      </div>
    </div>
  )
}