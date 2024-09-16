import React, { useState } from "react";
import ContactPopup from "./../ContactPopup/ContactPopup";
import AdvancedFilterPopup from "../AdvancedFilterPopup/AdvancedFilterPopup";
import contactImg from "../../assets/images/contact.svg";
import "./Main.scss";

interface Contact {
  name: string;
  phone: string;
  group: string;
}

const initialContacts: Contact[] = [
  { name: "al pacino", phone: "0123456789", group: "friends" },
  { name: "alain delon", phone: "0123456789", group: "friends" },
  { name: "anthony hopkins", phone: "0123456789", group: "work" },
  { name: "brad pitt", phone: "0123456789", group: "friends" },
  { name: "joaquin phoenix", phone: "0123456789", group: "work" },
  { name: "matt damon", phone: "0123456789", group: "friends" },
  { name: "michael caine", phone: "0123456789", group: "others" },
  { name: "morgan freeman", phone: "0123456789", group: "work" },
  { name: "tommy lee jones", phone: "0123456789", group: "family" },
];

const groupContactsByLetter = (contacts: Contact[]) => {
  return contacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);
};

const Main: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterText, setFilterText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"add" | "edit">("add");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value.toLowerCase();
    setFilterText(filter);
    applyFilters(filter, "all");
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const groupedContacts = groupContactsByLetter(filteredContacts);

  const handleAddContact = () => {
    setPopupMode("add");
    setIsPopupOpen(true);
  };

  const handleEditContact = () => {
    if (selectedContact) {
      setPopupMode("edit");
      setIsPopupOpen(true);
    }
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      setContacts(contacts.filter((contact) => contact !== selectedContact));
      setFilteredContacts(
        filteredContacts.filter((contact) => contact !== selectedContact)
      );
      setSelectedContact(null);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = (
    firstName: string,
    lastName: string,
    group: string
  ) => {
    const newContact: Contact = {
      name: `${firstName} ${lastName}`,
      phone: "0123456789",
      group,
    };

    if (popupMode === "add") {
      setContacts([...contacts, newContact]);
      setFilteredContacts([...filteredContacts, newContact]);
      setSelectedContact(null);
    } else if (popupMode === "edit" && selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact === selectedContact ? newContact : contact
      );
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
      setSelectedContact(newContact);
    }

    setIsPopupOpen(false);
  };

  const handleAdvancedFilterOpen = () => {
    setIsAdvancedFilterOpen(true);
  };

  const handleAdvancedFilterClose = () => {
    setIsAdvancedFilterOpen(false);
  };

  const handleAdvancedFilter = (nameFilter: string, groupFilter: string) => {
    setSelectedContact(null);
    setFilterText(nameFilter);
    applyFilters(nameFilter, groupFilter);
    setIsAdvancedFilterOpen(false);
  };

  const applyFilters = (nameFilter: string, groupFilter: string) => {
    const filtered = contacts.filter((contact) => {
      const matchesName = contact.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesGroup =
        groupFilter === "all" || contact.group === groupFilter;
      return matchesName && matchesGroup;
    });
    setFilteredContacts(filtered);
  };

  const formatName = (name: string) => {
    const nameParts = name.split(" ");

    if (nameParts.length >= 2) {
      const firstName =
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[0].slice(1).toLowerCase();

      const middleNames = nameParts
        .slice(1, -1)
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");

      const lastName = nameParts[nameParts.length - 1].toUpperCase();

      return `${firstName} ${middleNames} ${lastName}`.trim();
    }

    return name;
  };

  return (
    <div className="main-page-container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="filter..."
          value={filterText}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <a
          href="#"
          className="advanced-filter"
          onClick={handleAdvancedFilterOpen}
        >
          advanced filter
        </a>
        <div className="contact-list">
          {Object.keys(groupedContacts)
            .sort()
            .map((letter) => (
              <div key={letter} className="contact-group">
                <div className="contact-letter">{letter}</div>
                {groupedContacts[letter].map((contact, index) => (
                  <div
                    key={index}
                    className="contact-item"
                    onClick={() => handleContactClick(contact)}
                  >
                    {formatName(contact.name)}
                  </div>
                ))}
              </div>
            ))}
        </div>
        <button className="add-contact-btn" onClick={handleAddContact}>
          Add new contact
        </button>
      </div>
      <div className="contact-details">
        {selectedContact ? (
          <>
            <img
              src={contactImg}
              className="contact-img"
              width={100}
              height={100}
            />
            <h2>{formatName(selectedContact.name)}</h2>
            <p>{selectedContact.phone}</p>
            <p>{selectedContact.group}</p>
            <div className="action-buttons">
              <button onClick={handleEditContact} disabled={!selectedContact}>
                Edit contact
              </button>
              <button onClick={handleDeleteContact} disabled={!selectedContact}>
                Delete Contact
              </button>
            </div>
          </>
        ) : (
          <p>Please select a contact</p>
        )}
      </div>
      {isPopupOpen && (
        <ContactPopup
          onClose={handlePopupClose}
          onSubmit={handlePopupSubmit}
          mode={popupMode}
          contact={selectedContact}
        />
      )}
      {isAdvancedFilterOpen && (
        <AdvancedFilterPopup
          onClose={handleAdvancedFilterClose}
          onFilter={handleAdvancedFilter}
        />
      )}
    </div>
  );
};

export default Main;
