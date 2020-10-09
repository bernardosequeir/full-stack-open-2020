import React from "react";

const PersonFrom = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonFrom;
