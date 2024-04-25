import React from 'react';
import MyBrowser from './components/MyBrowser';

const App: React.FC = () => {
  return (
    <div>
      <MyBrowser expandedFolders={['/DIA SDK/bin/arm']} />
    </div>
  );
};

export default App;
