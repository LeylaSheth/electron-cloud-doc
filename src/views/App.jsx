import React, { useState } from 'react';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from 'react-simplemde-editor';
import uuidv4 from 'uuid/dist/v4';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';
// import { flattenArr, objToArr } from '../utils/helper';
import FileSearch from '../components/FileSearch';
import FileList from '../components/FileList';
import defaultFiles from '../utils/defaultFiles';
import BottomBtn from '../components/BottomBtn';
import TabList from '../components/TabList';

const App = () => {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);

  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };

  const tabClick = (fileID) => {
    // set current active file
    setActiveFileID(fileID);
  };

  const tabClose = (fileID) => {
    // remove current id from openedFileIDs
    const tabsWithout = openedFileIDs.filter((id) => fileID !== id);
    setOpenedFileIDs(tabsWithout);
    // set the active to the first opened tab
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0]);
    } else {
      setActiveFileID('');
    }
  };

  const fileChange = (fileID, value) => {
    // update file
    const newFiles = files.map((file) => {
      const newFile = file;
      if (newFile.id === fileID) {
        newFile.body = value;
      }
      return newFile;
    });
    setFiles(newFiles);
    // update unsavedIDs
    if (!unsavedFileIDs.includes(fileID)) {
      setUnsavedFileIDs([...unsavedFileIDs, fileID]);
    }
  };

  const fileDelete = (fileID) => {
    const newFiles = files.filter((file) => file.id !== fileID);
    setFiles(newFiles);
    // close the tab if opened
    tabClose(fileID);
  };

  const updateFileName = (fileID, title) => {
    const newFiles = files.map((file) => {
      const newFile = file;
      if (newFile.id === fileID) {
        newFile.title = title;
        newFile.isNew = false;
      }
      return newFile;
    });
    setFiles(newFiles);
  };

  const fileSearch = (keyword) => {
    const newFiles = files.filter((file) => file.title.includes(keyword));
    setSearchedFiles(newFiles);
  };

  const createNewFile = () => {
    const newID = uuidv4();
    const newFiles = [
      ...files,
      {
        id: newID,
        title: '',
        body: '## 请输出 MarkDown',
        createAt: new Date().getTime(),
        isNew: true,
      },
    ];
    setFiles(newFiles);
  };

  // 能计算出来就不要放到state中
  const openedFiles = openedFileIDs.map((openID) =>
    files.find((file) => file.id === openID)
  );
  const activeFile = files.find((file) => file.id === activeFileID);
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : files;

  return (
    <div className="container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch title="cloud" onFileSearch={fileSearch} />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group ">
            <div className="col">
              <BottomBtn
                text="NewFile"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          {activeFile ? (
            <div>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsavedIds={unsavedFileIDs}
                onTabClick={tabClick}
                onTabClose={tabClose}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => fileChange(activeFile.id, value)}
                options={{
                  minHeight: '470px',
                }}
              />
            </div>
          ) : (
            <div className="start-page">选择或者创建新的 MarkDown 文档</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
