import React, { useState } from 'react';
import './AdvancedFilterPopup.scss';

interface AdvancedFilterPopupProps {
  onClose: () => void;
  onFilter: (nameFilter: string, groupFilter: string) => void;
}

const AdvancedFilterPopup: React.FC<AdvancedFilterPopupProps> = ({ onClose, onFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');

  const handleFilter = () => {
    onFilter(nameFilter, groupFilter);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Advanced filter</h2>
        <div className="form-group">
          <label>Name filter:</label>
          <input 
            type="text" 
            value={nameFilter} 
            onChange={(e) => setNameFilter(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Group select:</label>
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
            <option value="all">all</option>
            <option value="friends">friends</option>
            <option value="family">family</option>
            <option value="work">work</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterPopup;
