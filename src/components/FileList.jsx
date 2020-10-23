import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const node = useRef(null);

  const closeEdit = (editItem) => {
    setEditStatus(false);
    setValue('');
    // if we are editing a newly file, we should delete this file when we entered esc
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };

  // 键盘事件
  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue('');
    }
    if (escPressed && editStatus) {
      closeEdit(editItem);
    }
  });

  // 自动聚焦
  useEffect(() => {
    if (editStatus) {
      node.current.focus();
    }
  }, [editStatus]);

  // 当list里有新建文件时产生的副作用
  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          className="list-group-item bg-light  d-flex justify-content-between align-items-center"
          key={file.id}
        >
          {file.id === editStatus || file.isNew ? (
            <div className="row mx-0">
              <input
                className="form-control col-10 "
                value={value}
                ref={node}
                placeholder="file name"
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                type="button"
                className="icon-button col-2 "
                onClick={() => closeEdit(file)}
              >
                <FontAwesomeIcon title="close" icon={faTimes} size="lg" />
              </button>
            </div>
          ) : (
            <div className="row mx-0">
              <span className="col-2">
                <FontAwesomeIcon icon={faMarkdown} size="lg" />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => onFileClick(file.id)}
                aria-hidden="true"
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon title="edit" icon={faEdit} size="lg" />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => onFileDelete(file.id)}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.instanceOf(Array),
  onFileClick: PropTypes.func.isRequired,
  onFileDelete: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};

FileList.defaultProps = {
  files: [],
};

export default FileList;
