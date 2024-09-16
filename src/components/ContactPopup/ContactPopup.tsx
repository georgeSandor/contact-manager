import React, { useState, useEffect } from 'react';
import './ContactPopup.scss';

interface Contact {
  name: string;
  phone: string;
  group: string;
}

interface ContactPopupProps {
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string, group: string) => void;
  mode: 'add' | 'edit';
  contact?: Contact | null;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ onClose, onSubmit, mode, contact }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('friends');

  useEffect(() => {
    if (contact && mode === 'edit') {
      const [first, ...last] = contact.name.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
      setGroup(contact.group);
    } else {
      setFirstName('');
      setLastName('');
      setGroup('friends');
    }
  }, [contact, mode]);

  const handleSubmit = () => {
    onSubmit(firstName, lastName, group);
  };

  return (
    <div className="popup-wrapper">
      <div className="popup">
        <h2>{mode === 'add' ? 'Add new contact' : 'Edit contact'}</h2>
        <div className="form-group">
          <label>First name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Group:</label>
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="friends">friends</option>
            <option value="family">family</option>
            <option value="work">work</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="action-btns">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
