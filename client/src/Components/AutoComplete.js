import React, { useState } from 'react';
import { Form, ListGroup} from 'react-bootstrap';

const AutoComplete = ({ options, selectedUser, setSelectedUser }) => {
  
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = options.filter(option =>
      option.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.username);
    setSelectedUser(option);
  };

  return (
    <div>
        <Form.Label>Choose a user to bet against!</Form.Label>
        <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for another user..."
        ></Form.Control>

      <ListGroup variant = "flush">
      {filteredOptions.map((option, index) => (
        <ListGroup.Item action variant = "info" key={index} onClick={() => handleOptionClick(option)}>{selectedUser !== {} && option.username}</ListGroup.Item>
      ))}
      </ListGroup>
        
    </div>
  );
};

export default AutoComplete;






