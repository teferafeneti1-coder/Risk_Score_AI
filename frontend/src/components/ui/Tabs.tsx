interface Tab {
  id: string
  label: string
  icon?: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      className="flex gap-1 p-1 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? {
                    background: 'rgba(0,245,255,0.12)',
                    color: '#00f5ff',
                    borderBottom: '2px solid #00f5ff',
                  }
                : {
                    color: '#9a9a9a',
                    borderBottom: '2px solid transparent',
                  }
            }
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
