import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import FileSearch from '../components/FileSearch';
import FileList from '../components/FileList';
import defaultFiles from '../utils/defaultFiles';
import BottomBtn from '../components/BottomBtn';
import TabList from '../components/TabList';

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title="cloud"
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => console.log(id)}
            onFileDelete={(id) => console.log(id)}
            onSaveEdit={(id, value) => console.log(id, value)}
          />
          <div className="row no-gutters">
            <div className="col">
              <BottomBtn text="New" colorClass="btn-primary" icon={faPlus} />
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
          <TabList
            files={defaultFiles}
            activeId="1"
            unsavedIds={['1']}
            onTabClick={(id) => console.log(id)}
            onCloseTab={(id) => console.log('closing', id)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
