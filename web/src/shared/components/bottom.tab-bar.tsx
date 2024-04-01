import { Tabbar, TabbarLink } from 'konsta/react';
import { useState } from 'react';

interface Tab {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const BottomTabBar = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <>
      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        {tabs.map((tab, index) => (
          <TabbarLink
            key={index}
            active={activeTab === tab.label}
            onClick={() => setActiveTab(tab.label)}
            label={tab.label}
            icon={tab.icon}
          />
        ))}
      </Tabbar>

      {tabs.map((tab, index) => (
        <div key={index} className={activeTab === tab.label ? '' : 'hidden'}>
          {tab.children}
        </div>
      ))}

      <div className="h-16" />
    </>
  );
};

export default BottomTabBar;
