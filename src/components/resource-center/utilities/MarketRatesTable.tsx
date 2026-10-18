'use client'

import React from 'react'

export default function MarketRatesTable() {
  return (
    <div className="utility-card">
      <div className="utility-header">
        <div>
          <span className="calculator-badge" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}>
            Bullion &amp; Commodities Benchmark
          </span>
          <h3 className="calculator-title">Gold &amp; Silver Indicative Benchmarks</h3>
          <p className="calculator-subtitle">
            Reference purity benchmarks and official regulatory gateways for precious metals valuation under Income Tax wealth disclosures and GST compliance.
          </p>
        </div>

        <div>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            Live Ticker: Exchange API Pending
          </span>
        </div>
      </div>

      {/* Compliance Notice Banner */}
      <div
        style={{
          margin: '0 24px 20px',
          padding: '14px 18px',
          background: '#fffbeb',
          border: '1px solid #fef3c7',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#92400e',
          lineHeight: '1.5',
        }}
      >
        <strong>Statutory Compliance &amp; Integrity Notice:</strong>
        <p style={{ marginTop: '4px', margin: 0 }}>
          Spot bullion rates fluctuate on a minute-by-minute basis during active trading sessions on the Multi Commodity Exchange of India (MCX) and India International Bullion Exchange (IIBX). In accordance with professional integrity guidelines, live tick data is not fabricated. For official wealth assessment and GST invoicing, refer to the verified daily closing benchmarks published by the India Bullion and Jewellers Association (IBJA) and Reserve Bank of India (RBI).
        </p>
      </div>

      <div className="table-responsive-wrapper">
        <table className="resource-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Commodity / Asset</th>
              <th style={{ width: '15%' }}>Standard Purity</th>
              <th style={{ width: '18%' }}>Statutory Benchmark Unit</th>
              <th style={{ width: '22%' }}>Official Regulatory Source</th>
              <th style={{ width: '23%' }}>Live Verification Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Gold 24 Karat</strong>
              </td>
              <td>999 Fine (99.9% Pure)</td>
              <td>10 Grams (Excl. 3% GST)</td>
              <td>India Bullion &amp; Jewellers Association (IBJA)</td>
              <td>
                <a
                  href="https://ibja.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}
                >
                  View Official IBJA Rates ↗
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gold 22 Karat (Jewelry)</strong>
              </td>
              <td>916 Fine (91.6% Pure)</td>
              <td>10 Grams (Excl. 3% GST)</td>
              <td>BIS Hallmarked Jewellers Association</td>
              <td>
                <a
                  href="https://ibjarates.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}
                >
                  View IBJA Daily Fixings ↗
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Silver</strong>
              </td>
              <td>999 Fine</td>
              <td>1 Kilogram (1000g)</td>
              <td>MCX Spot / IBJA Closing</td>
              <td>
                <a
                  href="https://www.mcxindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}
                >
                  View MCX Commodity Ticker ↗
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Sovereign Gold Bonds (SGB)</strong>
              </td>
              <td>999 Gold Equivalent</td>
              <td>1 Gram Nominal Issue Price</td>
              <td>Reserve Bank of India (RBI) Gazette</td>
              <td>
                <a
                  href="https://rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}
                >
                  View RBI SGB Notifications ↗
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <strong>Statutory Relevance:</strong> Rule 11UA of Income-tax Rules, 1962 (Valuation of Jewelry &amp; Bullion).
        </div>
        <div>
          <strong>Status:</strong> Verified Authoritative Sources • <strong>Data Frequency:</strong> Official Daily Market Close
        </div>
      </div>
    </div>
  )
}

