import { useState } from 'react';

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(value);
  };

  const handleReset = () => {
    setValue('');
  };

  return (
    <form className="p-4 bg-primary" onSubmit={handleSubmit}>
      <div className="input-group input-group-lg">
        <button type="submit" className="btn btn-primary border ">
          <i className="bi bi-search"></i>
        </button>
        <input
          name="search"
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          value={value}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
        <button
          type="reset"
          className="btn btn-primary border "
          onClick={handleReset}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
