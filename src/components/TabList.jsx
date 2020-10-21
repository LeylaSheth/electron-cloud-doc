import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TabList.scss';

const TabList = ({ files, activeId, unsavedIds, onTabClick, onCloseTab }) => {
  console.log('hi');
  return (
    <ul className="nav nav-pills tablist-component">
      {files.map((file) => {
        const withUnsavedMark = unsavedIds.includes(file.id);
        const fileClassName = classNames({
          'nav-link': true,
          active: file.id === activeId,
          withUnsaved: withUnsavedMark,
        });
        return (
          <li className="nav-item" key={file.id}>
            <button
              type="button"
              className={fileClassName}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                aria-hidden="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
              >
                <FontAwesomeIcon title="close" icon={faTimes} />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle unsaved-icon ml-2" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TabList.propTypes = {
  files: PropTypes.instanceOf(Array),
  activeId: PropTypes.string.isRequired,
  unsavedIds: PropTypes.instanceOf(Array),
  onTabClick: PropTypes.func.isRequired,
  onCloseTab: PropTypes.func.isRequired,
};

TabList.defaultProps = {
  files: [],
  unsavedIds: [],
};

export default TabList;
