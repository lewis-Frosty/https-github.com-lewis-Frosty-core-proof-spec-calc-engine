import React from 'react';
import InputSection from './components/InputSection';
import AssemblySection from './components/AssemblySection';
import ProductToggle from './components/ProductToggle';
import ComplianceStatus from './components/ComplianceStatus';
import YieldOptimization from './components/YieldOptimization';
import useH1Calculator from './hooks/useH1Calculator';

const App: React.FC = () => {
    const { calculate } = useH1Calculator();

    return (
        <div className="dashboard">
            <div className="column left">
                <h2>Inputs</h2>
                <InputSection />
                <ProductToggle />
            </div>
            <div className="column center">
                <h2>Assembly</h2>
                <AssemblySection />
            </div>
            <div className="column right">
                <h2>Compliance & Yield Optimization</h2>
                <ComplianceStatus />
                <YieldOptimization />
            </div>
        </div>
    );
};

export default App;
