'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// 17 Financial Calculators
import GstCalculator from './calculators/GstCalculator'
import IncomeTaxCalculator from './calculators/IncomeTaxCalculator'
import TdsCalculator from './calculators/TdsCalculator'
import HraCalculator from './calculators/HraCalculator'
import EmiCalculator from './calculators/EmiCalculator'
import CorporateCalculator from './calculators/CorporateCalculator'
import NetProfitCalculator from './calculators/NetProfitCalculator'
import EffectiveCapitalCalculator from './calculators/EffectiveCapitalCalculator'
import NscCalculator from './calculators/NscCalculator'
import AutoLoanCalculator from './calculators/AutoLoanCalculator'
import HomeLoanCalculator from './calculators/HomeLoanCalculator'
import TenureCalculator from './calculators/TenureCalculator'
import ReraCalculator from './calculators/ReraCalculator'

// Bulletins Catalog
import BulletinsCatalog from './bulletins/BulletinsCatalog'

// Utilities Reference Schedules
import IncomeTaxRatesTable from './utilities/IncomeTaxRatesTable'
import TdsRatesTable from './utilities/TdsRatesTable'
import GstRatesTable from './utilities/GstRatesTable'
import CiiTable from './utilities/CiiTable'
import DepreciationTable from './utilities/DepreciationTable'
import RocFeesTable from './utilities/RocFeesTable'
import NscRatesTable from './utilities/NscRatesTable'
import StampDutyTable from './utilities/StampDutyTable'
import MarketRatesTable from './utilities/MarketRatesTable'

// Clean Vector Icons
import { CalcIcon, RatesIcon, ChevronDownIcon, BulletinIcon } from './Icons'

export type MainTab = 'calculators' | 'bulletins' | 'utilities'

export type CalculatorCategory = 'all' | 'tax' | 'corporate' | 'salary' | 'banking' | 'rera'

export type CalculatorType =
  | 'gst'
  | 'gst-mrp'
  | 'gst-rate'
  | 'income-tax'
  | 'tds'
  | 'net-profit'
  | 'corporate'
  | 'effective-capital'
  | 'hra'
  | 'nsc'
  | 'emi'
  | 'home-loan'
  | 'auto-loan'
  | 'tenure'
  | 'rera-withdrawal'
  | 'rera-delay'
  | 'rera-refund'
  | 'rera'

export type UtilityType =
  | 'income-tax-rates'
  | 'tds-rates'
  | 'gst-rates'
  | 'cii'
  | 'depreciation'
  | 'roc-fees'
  | 'nsc-rates'
  | 'stamp-duty'
  | 'market-rates'

const MAIN_TABS: { id: MainTab; label: string; count: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'calculators', label: 'Financial Calculators', count: '17 Tools', Icon: CalcIcon },
  { id: 'bulletins', label: 'Regulatory Bulletins', count: '9 Areas', Icon: BulletinIcon },
  { id: 'utilities', label: 'Statutory Rates & Schedules', count: '9 Reference Tables', Icon: RatesIcon },
]

const CALCULATOR_CATEGORIES: { id: CalculatorCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Calculators', count: 17 },
  { id: 'tax', label: 'GST & Taxation', count: 5 },
  { id: 'corporate', label: 'Accounting & Business', count: 3 },
  { id: 'salary', label: 'Salary & Savings', count: 2 },
  { id: 'banking', label: 'Loans & EMI', count: 4 },
  { id: 'rera', label: 'Real Estate & RERA', count: 3 },
]

export const CALCULATOR_ITEMS: {
  id: CalculatorType
  label: string
  badge: string
  category: CalculatorCategory
}[] = [
  // 1. GST & Taxation (5)
  { id: 'gst', label: 'GST Calculator', badge: 'Dual Forward & MRP', category: 'tax' },
  { id: 'gst-mrp', label: 'GST MRP Calculator', badge: 'Reverse MRP', category: 'tax' },
  { id: 'gst-rate', label: 'GST Rate Calculator', badge: 'Rate Split', category: 'tax' },
  { id: 'income-tax', label: 'Income Tax Calculator', badge: 'Old vs New 115BAC', category: 'tax' },
  { id: 'tds', label: 'TDS / TCS Calculator', badge: 'Chapter XVII-B', category: 'tax' },

  // 2. Accounting & Business (3)
  { id: 'net-profit', label: 'Net Profit Calculator', badge: 'Operating & PAT', category: 'corporate' },
  { id: 'corporate', label: 'Net Worth Calculator', badge: 'Companies Act Sec 2(57)', category: 'corporate' },
  { id: 'effective-capital', label: 'Effective Capital Calculator', badge: 'Companies Act Sch V', category: 'corporate' },

  // 3. Salary & Investments (2)
  { id: 'hra', label: 'HRA Calculator', badge: 'Sec 10(13A) Exemption', category: 'salary' },
  { id: 'nsc', label: 'National Savings Certificate (NSC)', badge: 'Post Office Sec 80C', category: 'salary' },

  // 4. Loans & Finance (4)
  { id: 'emi', label: 'EMI Calculator', badge: 'Banking Amortization', category: 'banking' },
  { id: 'home-loan', label: 'Home Loan Calculator', badge: 'Sec 24(b) & 80C', category: 'banking' },
  { id: 'auto-loan', label: 'Auto Loan Calculator', badge: 'Vehicle Finance', category: 'banking' },
  { id: 'tenure', label: 'Number of Instalments Calculator', badge: 'Payoff Solver', category: 'banking' },

  // 5. Real Estate & RERA (3)
  { id: 'rera-withdrawal', label: 'RERA 70% Withdrawal Calculator', badge: 'Promoter Sec 4(2)(l)(D)', category: 'rera' },
  { id: 'rera-delay', label: 'RERA Delay Interest Calculator', badge: 'Allottee Sec 18 Delay', category: 'rera' },
  { id: 'rera-refund', label: 'RERA Homebuyer Refund Calculator', badge: 'Allottee Sec 18 Refund', category: 'rera' },
]

export const UTILITY_ITEMS: { id: UtilityType; label: string; badge: string }[] = [
  { id: 'income-tax-rates', label: 'Income Tax Slabs', badge: '115BAC vs Old' },
  { id: 'tds-rates', label: 'TDS & TCS Rates', badge: 'FY 25-27' },
  { id: 'gst-rates', label: 'GST Rates & HSN', badge: '0% - 28%' },
  { id: 'cii', label: 'Cost Inflation Index', badge: '2001 - 2026' },
  { id: 'depreciation', label: 'Depreciation Rates', badge: 'IT vs Co. Act' },
  { id: 'roc-fees', label: 'RoC Filing Fees', badge: 'MCA Rules' },
  { id: 'nsc-rates', label: 'NSC & Small Savings', badge: 'Quarterly Rates' },
  { id: 'stamp-duty', label: 'State Stamp Duty', badge: 'State Tariffs' },
  { id: 'market-rates', label: 'Bullion Benchmarks', badge: 'Statutory Valuation' },
]

export default function ResourceCenterView() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<MainTab>('calculators')
  const [activeCategory, setActiveCategory] = useState<CalculatorCategory>('all')
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('gst-mrp')
  const [activeUtility, setActiveUtility] = useState<UtilityType>('income-tax-rates')

  useEffect(() => {
    const tabParam = searchParams.get('tab') as MainTab
    const toolParam = searchParams.get('tool')

    if (tabParam && ['calculators', 'bulletins', 'utilities'].includes(tabParam)) {
      setActiveTab(tabParam)
    }

    if (toolParam) {
      const validTools: CalculatorType[] = [
        'gst',
        'gst-mrp',
        'gst-rate',
        'income-tax',
        'tds',
        'net-profit',
        'corporate',
        'effective-capital',
        'hra',
        'nsc',
        'emi',
        'home-loan',
        'auto-loan',
        'tenure',
        'rera-withdrawal',
        'rera-delay',
        'rera-refund',
        'rera',
      ]
      if (validTools.includes(toolParam as CalculatorType)) {
        setActiveTab('calculators')
        const targetTool = toolParam === 'rera' ? 'rera-delay' : (toolParam as CalculatorType)
        setActiveCalculator(targetTool)
        const matched = CALCULATOR_ITEMS.find((c) => c.id === targetTool)
        if (matched) {
          setActiveCategory(matched.category)
        }
      } else if (
        [
          'income-tax-rates',
          'tds-rates',
          'gst-rates',
          'cii',
          'depreciation',
          'roc-fees',
          'nsc-rates',
          'stamp-duty',
          'market-rates',
        ].includes(toolParam)
      ) {
        setActiveTab('utilities')
        setActiveUtility(toolParam as UtilityType)
      }
    }
  }, [searchParams])

  const filteredCalculators =
    activeCategory === 'all'
      ? CALCULATOR_ITEMS
      : CALCULATOR_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <div className="inst-resource-container">
      {/* Primary Section Navigation Tabs */}
      <nav className="inst-tab-strip" aria-label="Knowledge Bank Sections" style={{ marginBottom: '24px' }}>
        <div className="inst-tab-strip__inner" style={{ justifyContent: 'flex-start', gap: '8px' }}>
          {MAIN_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.Icon
            return (
              <button
                key={tab.id}
                type="button"
                className={`inst-tab-btn ${isActive ? 'inst-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ padding: '10px 20px', borderRadius: '8px' }}
              >
                <Icon size={16} className="inst-tab-icon" />
                <span style={{ fontWeight: 600 }}>{tab.label}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 7px',
                    borderRadius: '12px',
                    background: isActive ? '#eff6ff' : '#f1f5f9',
                    color: isActive ? '#1d4ed8' : '#64748b',
                    marginLeft: '4px',
                    fontWeight: 600,
                  }}
                >
                  {tab.count}
                </span>
                {isActive && <span className="inst-tab-active-indicator" />}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Tab Pane Body */}
      <div className="inst-pane-body">
        {/* --- TAB 1: 17 FINANCIAL CALCULATORS --- */}
        {activeTab === 'calculators' && (
          <div>
            {/* Clean Category Pills & Calculator Selector Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
                padding: '12px 18px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              {/* Category Filter Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                {CALCULATOR_CATEGORIES.map((cat) => {
                  const isCatActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id)
                        if (cat.id !== 'all') {
                          const inCat = CALCULATOR_ITEMS.filter((c) => c.category === cat.id)
                          if (inCat.length > 0 && !inCat.some((c) => c.id === activeCalculator)) {
                            setActiveCalculator(inCat[0].id)
                          }
                        }
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: isCatActive ? '#1e40af' : '#e2e8f0',
                        background: isCatActive ? '#1e40af' : '#ffffff',
                        color: isCatActive ? '#ffffff' : '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>

              {/* Calculator Dropdown Selector */}
              <div style={{ minWidth: '280px', flex: '0 1 340px' }}>
                <div className="inst-select-wrapper" style={{ position: 'relative' }}>
                  <select
                    id="inst-tool-dropdown"
                    className="inst-tool-select"
                    value={activeCalculator}
                    onChange={(e) => setActiveCalculator(e.target.value as CalculatorType)}
                    style={{
                      width: '100%',
                      padding: '8px 34px 8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      background: '#f8fafc',
                      cursor: 'pointer',
                    }}
                  >
                    {filteredCalculators.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} ({c.badge})
                      </option>
                    ))}
                  </select>
                  <span className="inst-select-chevron" aria-hidden="true" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                    <ChevronDownIcon size={14} />
                  </span>
                </div>
              </div>
            </div>

            {/* Active Calculator Component */}
            <div className="inst-tool-stage">
              {activeCalculator === 'gst' && (
                <GstCalculator titleOverride="GST Calculator (Combined Forward &amp; MRP Engine)" />
              )}
              {activeCalculator === 'gst-mrp' && (
                <GstCalculator
                  initialMode="inclusive"
                  titleOverride="GST MRP Calculator (Reverse Method)"
                />
              )}
              {activeCalculator === 'gst-rate' && (
                <GstCalculator
                  initialMode="exclusive"
                  titleOverride="GST Rate Calculator (Forward Computation)"
                />
              )}
              {activeCalculator === 'income-tax' && <IncomeTaxCalculator />}
              {activeCalculator === 'tds' && <TdsCalculator />}
              {activeCalculator === 'net-profit' && <NetProfitCalculator />}
              {activeCalculator === 'corporate' && <CorporateCalculator />}
              {activeCalculator === 'effective-capital' && <EffectiveCapitalCalculator />}
              {activeCalculator === 'hra' && <HraCalculator />}
              {activeCalculator === 'nsc' && <NscCalculator />}
              {activeCalculator === 'emi' && <EmiCalculator />}
              {activeCalculator === 'home-loan' && <HomeLoanCalculator />}
              {activeCalculator === 'auto-loan' && <AutoLoanCalculator />}
              {activeCalculator === 'tenure' && <TenureCalculator />}
              {activeCalculator === 'rera-withdrawal' && <ReraCalculator initialMode="withdrawal" />}
              {activeCalculator === 'rera-delay' && <ReraCalculator initialMode="delay-interest" />}
              {activeCalculator === 'rera-refund' && <ReraCalculator initialMode="refund" />}
              {activeCalculator === 'rera' && <ReraCalculator initialMode="delay-interest" />}
            </div>
          </div>
        )}

        {/* --- TAB 2: PROFESSIONAL REGULATORY BULLETINS --- */}
        {activeTab === 'bulletins' && (
          <div className="inst-tool-stage">
            <BulletinsCatalog />
          </div>
        )}

        {/* --- TAB 3: STATUTORY RATES & UTILITIES --- */}
        {activeTab === 'utilities' && (
          <div>
            {/* Clean Reference Utility Selector Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px',
                padding: '14px 18px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              {UTILITY_ITEMS.map((u) => {
                const isUtilActive = activeUtility === u.id
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setActiveUtility(u.id)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: isUtilActive ? '#1e40af' : '#e2e8f0',
                      background: isUtilActive ? '#1e40af' : '#f8fafc',
                      color: isUtilActive ? '#ffffff' : '#334155',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{u.label}</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        background: isUtilActive ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                        color: isUtilActive ? '#ffffff' : '#64748b',
                      }}
                    >
                      {u.badge}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="inst-tool-stage">
              {activeUtility === 'income-tax-rates' && <IncomeTaxRatesTable />}
              {activeUtility === 'tds-rates' && <TdsRatesTable />}
              {activeUtility === 'gst-rates' && <GstRatesTable />}
              {activeUtility === 'cii' && <CiiTable />}
              {activeUtility === 'depreciation' && <DepreciationTable />}
              {activeUtility === 'roc-fees' && <RocFeesTable />}
              {activeUtility === 'nsc-rates' && <NscRatesTable />}
              {activeUtility === 'stamp-duty' && <StampDutyTable />}
              {activeUtility === 'market-rates' && <MarketRatesTable />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
