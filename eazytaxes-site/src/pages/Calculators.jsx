import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Formatter ─── */
const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const fmtDec = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── Tab Buttons ─── */
const calculators = [
  { id: 'self-employment', label: 'Self-Employment Tax', icon: 'person' },
  { id: 'scorp', label: 'S Corp Tax', icon: 'corporate_fare' },
  { id: 'savings', label: 'Tax Savings', icon: 'savings' },
  { id: 'payroll', label: 'Payroll Tax', icon: 'payments' },
];

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState('self-employment');

  return (
    <div className="bg-white text-gray-900 font-body">
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">Free Tools</p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Tax <span className="text-brand-orange">Calculators</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Get accurate year-to-date calculations for your self-employment taxes, S Corp tax burden, and potential savings — all in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Tabs */}
      <section className="py-4 bg-white sticky top-[72px] z-30 border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {calculators.map(calc => (
              <button
                key={calc.id}
                onClick={() => setActiveCalc(calc.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCalc === calc.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{calc.icon}</span>
                {calc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Calculator */}
      <section className="py-16 bg-[#f8f8f8] min-h-[70vh]">
        <div className="max-w-[1100px] mx-auto px-6">
          {activeCalc === 'self-employment' && <SelfEmploymentCalc />}
          {activeCalc === 'scorp' && <SCorpCalc />}
          {activeCalc === 'savings' && <SavingsCalc />}
          {activeCalc === 'payroll' && <PayrollCalc />}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="flex items-start gap-3 bg-orange-50 rounded-2xl p-6 text-left">
            <span className="material-symbols-outlined text-brand-orange mt-0.5 flex-shrink-0">info</span>
            <div>
              <p className="font-bold text-sm mb-1">Important Disclaimer</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                These calculators are designed to provide directional estimates of your tax situation. They are not a substitute for professional tax advice or tax preparation services. Your information is not stored or shared after you exit this page. For a complete analysis, please consult with one of our licensed CPAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Want a more precise estimate?</h2>
          <p className="text-gray-400 mb-8">Our licensed CPAs can review your exact financial situation and provide tailored tax strategies.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 text-lg shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  SELF-EMPLOYMENT TAX CALCULATOR                */
/* ═══════════════════════════════════════════════ */
function SelfEmploymentCalc() {
  const [income, setIncome] = useState(80000);
  const [w2Wages, setW2Wages] = useState(0);
  const [expenses, setExpenses] = useState(15000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const netSE = Math.max(0, income - expenses);
    const seBase = netSE * 0.9235; // 92.35% of net SE income
    const ssMax = 160200; // 2023 social security wage base
    const ssWages = Math.min(w2Wages, ssMax);
    const ssRemaining = Math.max(0, ssMax - ssWages);
    const ssSE = Math.min(seBase, ssRemaining);
    const ssTax = ssSE * 0.124; // 12.4% Social Security
    const medTax = seBase * 0.029; // 2.9% Medicare
    const addMedThreshold = filingStatus === 'married' ? 250000 : 200000;
    const addMedBase = Math.max(0, (seBase + w2Wages) - addMedThreshold);
    const addMedTax = addMedBase * 0.009;
    const totalSE = ssTax + medTax + addMedTax;
    const seDeduction = totalSE * 0.5; // half is deductible
    const effectiveRate = netSE > 0 ? (totalSE / netSE * 100) : 0;
    const quarterly = totalSE / 4;
    return { netSE, seBase, ssTax, medTax, addMedTax, totalSE, seDeduction, effectiveRate, quarterly };
  }, [income, w2Wages, expenses, filingStatus]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Input Panel */}
      <div className="lg:col-span-3 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-orange-100 text-brand-orange rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </div>
          <h2 className="text-xl font-bold">Self-Employment Tax Calculator</h2>
        </div>
        <p className="text-sm text-gray-400 mb-8">Estimate your self-employment tax (Social Security + Medicare) for the current year.</p>

        <div className="space-y-6">
          <SliderInput label="Self-Employment Income" icon="trending_up" color="text-orange-500" value={income} onChange={setIncome} min={0} max={500000} step={5000} format={fmt} />
          <SliderInput label="W-2 Wages (if any)" icon="work" color="text-blue-500" value={w2Wages} onChange={setW2Wages} min={0} max={300000} step={5000} format={fmt} />
          <SliderInput label="Business Expenses" icon="receipt" color="text-green-500" value={expenses} onChange={setExpenses} min={0} max={250000} step={1000} format={fmt} />

          <div>
            <label className="font-bold text-sm mb-3 block">Filing Status</label>
            <div className="flex gap-3">
              {[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married Filing Jointly' },
                { value: 'head', label: 'Head of Household' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilingStatus(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filingStatus === opt.value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="mt-8 w-full bg-gradient-to-b from-[#fba000] to-[#f96300] text-white font-bold rounded-full py-4 text-lg shadow-[0_4px_14px_rgba(250,130,0,0.35)] hover:shadow-[0_6px_20px_rgba(250,130,0,0.5)] transition-all"
        >
          Calculate My Tax
        </button>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col">
        <h3 className="font-bold text-lg mb-6">Estimated Results</h3>
        {showResults ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <div className="text-center mb-8 py-6 bg-orange-50 rounded-2xl">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Total Self-Employment Tax</p>
              <p className="text-5xl font-extrabold text-brand-orange">{fmtDec(results.totalSE)}</p>
              <p className="text-sm text-gray-400 mt-2">Effective Rate: {results.effectiveRate.toFixed(1)}%</p>
            </div>

            <div className="space-y-4 flex-1">
              <ResultRow label="Net SE Income" value={fmt(results.netSE)} />
              <ResultRow label="Social Security Tax" value={fmtDec(results.ssTax)} sub="12.4%" />
              <ResultRow label="Medicare Tax" value={fmtDec(results.medTax)} sub="2.9%" />
              {results.addMedTax > 0 && <ResultRow label="Additional Medicare" value={fmtDec(results.addMedTax)} sub="0.9%" />}
              <div className="border-t border-gray-100 pt-4">
                <ResultRow label="SE Tax Deduction" value={fmt(results.seDeduction)} sub="50% of SE tax" highlight />
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">Quarterly Payment</p>
                    <p className="text-xs text-gray-400">Estimated quarterly amount</p>
                  </div>
                  <p className="font-extrabold text-xl text-[#1b75ff]">{fmt(results.quarterly)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">calculate</span>
            <p className="text-gray-400 text-sm">Fill in your details and click<br/>"Calculate My Tax" to see results</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  S CORP TAX CALCULATOR                         */
/* ═══════════════════════════════════════════════ */
function SCorpCalc() {
  const [revenue, setRevenue] = useState(200000);
  const [bizExpenses, setBizExpenses] = useState(50000);
  const [salary, setSalary] = useState(60000);
  const [estPayments, setEstPayments] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const netIncome = revenue - bizExpenses;
    const distribution = Math.max(0, netIncome - salary);
    // Payroll taxes on salary only
    const ssMax = 160200;
    const ssTax = Math.min(salary, ssMax) * 0.153; // combined employer + employee
    const medTax = salary * 0.029; // is actually included in 15.3% but let's break it out
    const payrollTax = ssTax; // 15.3% covers both SS and Med

    // Federal income tax (simplified bracket)
    const taxableIncome = netIncome;
    let fedTax = 0;
    if (taxableIncome <= 11000) fedTax = taxableIncome * 0.10;
    else if (taxableIncome <= 44725) fedTax = 1100 + (taxableIncome - 11000) * 0.12;
    else if (taxableIncome <= 95375) fedTax = 5147 + (taxableIncome - 44725) * 0.22;
    else if (taxableIncome <= 182100) fedTax = 16290 + (taxableIncome - 95375) * 0.24;
    else if (taxableIncome <= 231250) fedTax = 37104 + (taxableIncome - 182100) * 0.32;
    else fedTax = 52832 + (taxableIncome - 231250) * 0.35;

    const totalTax = payrollTax + fedTax;
    const afterTax = netIncome - totalTax;
    const taxSaved = Math.max(0, distribution * 0.153); // what you save by NOT paying SE on distributions
    const effectiveRate = netIncome > 0 ? (totalTax / netIncome * 100) : 0;
    const owed = Math.max(0, totalTax - estPayments);

    return { netIncome, salary, distribution, payrollTax, fedTax, totalTax, afterTax, taxSaved, effectiveRate, owed };
  }, [revenue, bizExpenses, salary, estPayments]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">corporate_fare</span>
          </div>
          <h2 className="text-xl font-bold">S Corp Tax Calculator</h2>
        </div>
        <p className="text-sm text-gray-400 mb-8">Estimate your S Corp's combined federal income and payroll tax burden.</p>

        <div className="space-y-6">
          <SliderInput label="Annual Revenue" icon="trending_up" color="text-orange-500" value={revenue} onChange={setRevenue} min={0} max={1000000} step={10000} format={fmt} />
          <SliderInput label="Business Expenses" icon="receipt" color="text-red-500" value={bizExpenses} onChange={setBizExpenses} min={0} max={500000} step={5000} format={fmt} />
          <SliderInput label="Officer Salary" icon="person" color="text-blue-500" value={salary} onChange={setSalary} min={0} max={300000} step={5000} format={fmt} />
          <SliderInput label="Estimated Tax Payments Made" icon="account_balance" color="text-green-500" value={estPayments} onChange={setEstPayments} min={0} max={200000} step={1000} format={fmt} />
        </div>

        <button onClick={() => setShowResults(true)} className="mt-8 w-full bg-gradient-to-b from-[#1b75ff] to-[#155bcd] text-white font-bold rounded-full py-4 text-lg shadow-[0_4px_14px_rgba(27,117,255,0.3)] transition-all">
          Calculate S Corp Tax
        </button>
      </div>

      <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col">
        <h3 className="font-bold text-lg mb-6">Estimated Results</h3>
        {showResults ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <div className="text-center mb-6 py-6 bg-blue-50 rounded-2xl">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Total Tax Burden</p>
              <p className="text-5xl font-extrabold text-[#1b75ff]">{fmt(results.totalTax)}</p>
              <p className="text-sm text-gray-400 mt-2">Effective Rate: {results.effectiveRate.toFixed(1)}%</p>
            </div>
            <div className="space-y-4 flex-1">
              <ResultRow label="Net Income" value={fmt(results.netIncome)} />
              <ResultRow label="Officer Salary" value={fmt(results.salary)} />
              <ResultRow label="Distributions" value={fmt(results.distribution)} />
              <div className="border-t border-gray-100 pt-3">
                <ResultRow label="Payroll Tax (15.3%)" value={fmt(results.payrollTax)} />
                <ResultRow label="Federal Income Tax" value={fmt(results.fedTax)} />
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">S Corp Tax Savings</p>
                    <p className="text-xs text-gray-400">vs. sole proprietorship</p>
                  </div>
                  <p className="font-extrabold text-xl text-green-600">{fmt(results.taxSaved)}</p>
                </div>
              </div>
              {results.owed > 0 && (
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div><p className="font-bold text-sm">Still Owed</p><p className="text-xs text-gray-400">After estimated payments</p></div>
                    <p className="font-extrabold text-xl text-red-500">{fmt(results.owed)}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">corporate_fare</span>
            <p className="text-gray-400 text-sm">Fill in your S Corp details and click<br/>"Calculate S Corp Tax" to see results</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  TAX SAVINGS CALCULATOR                        */
/* ═══════════════════════════════════════════════ */
function SavingsCalc() {
  const [revenue, setRevenue] = useState(250000);
  const [employees, setEmployees] = useState(10);
  const [taxRate, setTaxRate] = useState(25);

  const savings = useMemo(() => {
    return (revenue * (taxRate / 100)) * 0.15;
  }, [revenue, taxRate]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8 md:p-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">savings</span>
          </div>
          <h2 className="text-xl font-bold">Tax Savings Calculator</h2>
        </div>
        <p className="text-sm text-gray-400 mb-10">See how much you could save with professional tax strategy and planning.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <SliderInput label="Annual Revenue" icon="trending_up" color="text-orange-500" value={revenue} onChange={setRevenue} min={50000} max={2000000} step={10000} format={fmt} />
            <SliderInput label="Number of Employees" icon="group" color="text-blue-500" value={employees} onChange={setEmployees} min={1} max={100} step={1} format={(v) => v.toString()} />
            <SliderInput label="Current Tax Rate" icon="receipt" color="text-green-500" value={taxRate} onChange={setTaxRate} min={10} max={45} step={1} format={(v) => `${v}%`} />
          </div>

          <div className="flex flex-col justify-center items-start lg:pl-12 lg:border-l border-gray-200">
            <h4 className="font-bold text-xl mb-1">Estimated Annual Savings</h4>
            <p className="text-xs text-gray-400 mb-6">Based on common deduction and tax strategies</p>
            <div className="text-5xl md:text-6xl font-extrabold text-brand-orange mb-8 tabular-nums">{fmt(savings)}</div>
            <Link to="/contact" className="w-full text-center inline-flex items-center justify-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-8 py-4 shadow-md transition-all">
              Schedule a Free Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  PAYROLL TAX CALCULATOR                        */
/* ═══════════════════════════════════════════════ */
function PayrollCalc() {
  const [grossPay, setGrossPay] = useState(5000);
  const [payFreq, setPayFreq] = useState('biweekly');
  const [state, setState] = useState('CA');
  const [showResults, setShowResults] = useState(false);

  const freqMultiplier = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };

  const results = useMemo(() => {
    const annual = grossPay * (freqMultiplier[payFreq] || 26);
    const ssMax = 160200;
    const ssTax = Math.min(annual, ssMax) * 0.062;
    const medTax = annual * 0.0145;
    const fedWithhold = annual > 170050 ? annual * 0.24 : annual > 89075 ? annual * 0.22 : annual > 41775 ? annual * 0.12 : annual * 0.10;
    const stateRate = state === 'CA' ? 0.0725 : state === 'NY' ? 0.0685 : state === 'TX' ? 0 : state === 'FL' ? 0 : 0.05;
    const stateTax = annual * stateRate;
    const employerSS = ssTax;
    const employerMed = medTax;
    const futa = Math.min(annual, 7000) * 0.006;
    const employeeCost = ssTax + medTax + fedWithhold + stateTax;
    const employerCost = employerSS + employerMed + futa;
    const totalCost = employeeCost + employerCost;
    const netPay = annual - employeeCost;
    const perPeriodNet = netPay / (freqMultiplier[payFreq] || 26);
    return { annual, ssTax, medTax, fedWithhold, stateTax, employerSS, employerMed, futa, employeeCost, employerCost, totalCost, netPay, perPeriodNet };
  }, [grossPay, payFreq, state]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h2 className="text-xl font-bold">Payroll Tax Calculator</h2>
        </div>
        <p className="text-sm text-gray-400 mb-8">Estimate employee and employer payroll tax obligations per pay period.</p>

        <div className="space-y-6">
          <SliderInput label="Gross Pay Per Period" icon="attach_money" color="text-green-500" value={grossPay} onChange={setGrossPay} min={500} max={25000} step={100} format={fmt} />

          <div>
            <label className="font-bold text-sm mb-3 block">Pay Frequency</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'weekly', label: 'Weekly' },
                { value: 'biweekly', label: 'Bi-Weekly' },
                { value: 'semimonthly', label: 'Semi-Monthly' },
                { value: 'monthly', label: 'Monthly' },
              ].map(opt => (
                <button key={opt.value} onClick={() => setPayFreq(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${payFreq === opt.value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >{opt.label}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-sm mb-3 block">State</label>
            <div className="flex flex-wrap gap-2">
              {['CA', 'NY', 'TX', 'FL', 'Other'].map(s => (
                <button key={s} onClick={() => setState(s)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${state === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => setShowResults(true)} className="mt-8 w-full bg-gradient-to-b from-purple-500 to-purple-700 text-white font-bold rounded-full py-4 text-lg shadow-[0_4px_14px_rgba(147,51,234,0.3)] transition-all">
          Calculate Payroll Tax
        </button>
      </div>

      <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col">
        <h3 className="font-bold text-lg mb-6">Estimated Results</h3>
        {showResults ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <div className="text-center mb-6 py-6 bg-purple-50 rounded-2xl">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Total Annual Tax Cost</p>
              <p className="text-4xl font-extrabold text-purple-600">{fmt(results.totalCost)}</p>
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Employee Taxes</p>
              <ResultRow label="Social Security (6.2%)" value={fmt(results.ssTax)} />
              <ResultRow label="Medicare (1.45%)" value={fmt(results.medTax)} />
              <ResultRow label="Federal Withholding" value={fmt(results.fedWithhold)} />
              <ResultRow label="State Tax" value={fmt(results.stateTax)} />
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3">Employer Taxes</p>
                <ResultRow label="Employer SS (6.2%)" value={fmt(results.employerSS)} />
                <ResultRow label="Employer Medicare" value={fmt(results.employerMed)} />
                <ResultRow label="FUTA" value={fmtDec(results.futa)} />
              </div>
              <div className="bg-green-50 rounded-xl p-4 mt-2">
                <div className="flex justify-between items-center">
                  <div><p className="font-bold text-sm">Net Pay / Period</p><p className="text-xs text-gray-400">Take-home estimate</p></div>
                  <p className="font-extrabold text-xl text-green-600">{fmt(results.perPeriodNet)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">payments</span>
            <p className="text-gray-400 text-sm">Fill in payroll details and click<br/>"Calculate Payroll Tax" to see results</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  SHARED COMPONENTS                             */
/* ═══════════════════════════════════════════════ */
function SliderInput({ label, icon, color, value, onChange, min, max, step, format }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="font-bold text-sm flex items-center gap-2">
          <span className={`material-symbols-outlined ${color} text-[18px]`}>{icon}</span>
          {label}
        </label>
        <span className="font-bold text-base tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-semibold">
        <span>{format(min)}</span>
        <span>{format(max)}{max >= 1000000 ? '+' : ''}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, sub, highlight }) {
  return (
    <div className="flex justify-between items-center py-1">
      <div>
        <p className={`text-sm ${highlight ? 'font-bold text-green-700' : 'text-gray-600'}`}>{label}</p>
        {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
      </div>
      <p className={`font-bold text-sm tabular-nums ${highlight ? 'text-green-700' : ''}`}>{value}</p>
    </div>
  );
}
