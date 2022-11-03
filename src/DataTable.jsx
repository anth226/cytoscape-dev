import React from 'react'

const DataTable = ({data}) => {


  return (
    <div className="table">
      <div className="table-header">
        <div className="header__item">From</div>
        <div className="header__item">To</div>
        <div className="header__item">KeyType</div>
        <div className="header__item">Via</div>
      </div>
      <div className="table-content">
        {
          data.length > 0 ?
            data.map((item, index) => (
              <div className="table-row" key={`table-item-${index}`}>		
                <div className="table-data">{item.from}</div>
                <div className="table-data">{item.to}</div>
                <div className="table-data">{item.keyType}</div>
                <div className="table-data">{item.via}</div>
              </div>
            ))
          :
          <div className="table-row">		
            <div className="table-data">No data found</div>
          </div>
        }
      </div>	
    </div>
  )
}

export default DataTable