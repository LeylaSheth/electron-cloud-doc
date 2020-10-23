import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';

// useRef 返回一个可变的ref对象，其.current属性被初始化传为传入的参数(initialValue)返回的ref对象在组件的整个生命周期内保持不变，在不同的渲染中记住变量的值
const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const node = useRef(null); // 将ref属性设置为相应的节点

  const closeSearch = () => {
    setInputActive(false);
    setValue('');
    onFileSearch('');
  };

  // 键盘事件
  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
    // const handleInputEvent = (event) => {
    //   const { keyCode } = event;
    //   if (keyCode === 13 && inputActive) {
    //     onFileSearch(value);
    //   } else if (keyCode === 27 && inputActive) {
    //     closeSearch(event);
    //   }
    // };
    // document.addEventListener('keyup', handleInputEvent);
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent);
    // };
  });

  // 自动聚焦
  useEffect(() => {
    if (inputActive) {
      node.current.focus();
    }
  }, [inputActive]);
  return (
    <div className="alert alert-primary mb-0">
      {inputActive ? (
        <div className=" d-flex justify-content-between align-items-center">
          <input
            className="form-control "
            value={value}
            ref={node}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" className="icon-button " onClick={closeSearch}>
            <FontAwesomeIcon title="close" icon={faTimes} size="lg" />
          </button>
        </div>
      ) : (
        <div className=" d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon title="search" icon={faSearch} size="lg" />
          </button>
        </div>
      )}
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: 'my cloud',
};

export default FileSearch;
