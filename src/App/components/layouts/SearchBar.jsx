import { Grid, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { _routes } from '../../../data/_routes';
import { _searching } from '../../../data/_searching';
import { ArrowRightOutlined } from '@ant-design/icons';


const SearchBard = () => {
  const points = Grid.useBreakpoint();
  const navigate = useNavigate()

  const [searchItem, setSearchItem] = useState()
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      setIsSearchFocused(true);
    }
  };


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  const handleChange = (newValue) => {
    console.log(searchItem);
    setSearchItem(newValue);
  };

  return (
    <Select

      ref={searchInputRef}
      value={searchItem}
      onChange={handleChange}
      open={isDropdownOpen}
      showSearch
      style={{
        width: points.lg ? "90%" : "70%",
        
        // width: (points.xs || points.sm) && "70%" ,
      }}
      placeholder="Press cntrl + k"
      // optionFilterProp="children"
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={(input, option) =>
        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
      }
      onDropdownVisibleChange={(open) => {
        if (!open) { // Reset search when closed
          setSearchItem(null);
        }
      }}
      onSearch={(searchInput) => {
        setIsDropdownOpen(searchInput.length > 0);
      }}
    >


      {
        _searching.map(x =>
          <Select.Option className="py-2" value={x.description} >
            <div className='d-flex gap-2'>
              <div className='d-flex gap-2' onClick={() => navigate(x.route)}>
                <b>{x.name}</b>
                <span> {x.description} </span>
              </div>
              <ArrowRightOutlined onClick={() => navigate(x.route)} />
            </div>
          </Select.Option>)
      }

    </Select>
  )
};
export default SearchBard;