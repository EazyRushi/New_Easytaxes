// ─── USERS ────────────────────────────────────────────────────────
export const MOCK_USERS = [
  { id: 'u1', email: 'client@eazytaxes.com',     password: 'client123',  role: 'CLIENT',         name: 'John Martinez',  company: 'Martinez LLC',      avatar: 'JM' },
  { id: 'u2', email: 'client2@eazytaxes.com',    password: 'client123',  role: 'CLIENT',         name: 'Sarah Chen',     company: 'Chen Consulting',   avatar: 'SC' },
  { id: 'u3', email: 'accountant@eazytaxes.com', password: 'acc123',     role: 'ACCOUNTANT',     name: 'Rachel Kim',     company: 'EazyTaxes',         avatar: 'RK' },
  { id: 'u4', email: 'bookkeeper@eazytaxes.com', password: 'book123',    role: 'BOOKKEEPER',     name: 'David Patel',    company: 'EazyTaxes',         avatar: 'DP' },
  { id: 'u5', email: 'tax@eazytaxes.com',        password: 'tax123',     role: 'TAX_SPECIALIST', name: 'Lisa Thompson',  company: 'EazyTaxes',         avatar: 'LT' },
  { id: 'u6', email: 'admin@eazytaxes.com',      password: 'admin123',   role: 'ADMIN',          name: 'Mike Admin',     company: 'EazyTaxes',         avatar: 'MA' },
  { id: 'u7', email: 'support@eazytaxes.com',    password: 'support123', role: 'SUPPORT',        name: 'Amy Wilson',     company: 'EazyTaxes',         avatar: 'AW' },
];

export const ROLES = { CLIENT:'CLIENT', ACCOUNTANT:'ACCOUNTANT', BOOKKEEPER:'BOOKKEEPER', TAX_SPECIALIST:'TAX_SPECIALIST', ADMIN:'ADMIN', SUPPORT:'SUPPORT' };
export const TASK_STATUS   = { PENDING:'PENDING', IN_PROGRESS:'IN_PROGRESS', IN_REVIEW:'IN_REVIEW', COMPLETED:'COMPLETED', BLOCKED:'BLOCKED' };
export const TASK_PRIORITY = { LOW:'LOW', MEDIUM:'MEDIUM', HIGH:'HIGH', URGENT:'URGENT' };
export const TASK_CATEGORY = { TAX:'TAX', BOOKKEEPING:'BOOKKEEPING', PAYROLL:'PAYROLL', DOCUMENTS:'DOCUMENTS', ONBOARDING:'ONBOARDING', COMPLIANCE:'COMPLIANCE', GENERAL:'GENERAL' };

// ─── TASKS ────────────────────────────────────────────────────────
export const SEED_TASKS = [
  { id:'t1',  title:'Upload bank statements (Jan–Mar)',          description:'Please upload your Q1 2025 bank statements.',                            status:'PENDING',      priority:'HIGH',   category:'DOCUMENTS',    clientId:'u1', assignedTo:'u3', createdAt:'2025-06-01', dueDate:'2025-06-20', workflow:'ONBOARDING',    completedAt:null },
  { id:'t2',  title:'Submit W2 & 1099 forms',                   description:'Required for tax return preparation.',                                    status:'PENDING',      priority:'HIGH',   category:'TAX',          clientId:'u1', assignedTo:'u5', createdAt:'2025-06-01', dueDate:'2025-06-22', workflow:'TAX_FILING',    completedAt:null },
  { id:'t3',  title:'Review and approve Q1 P&L report',         description:'Your Profit & Loss statement for Q1 is ready.',                           status:'IN_REVIEW',    priority:'MEDIUM', category:'BOOKKEEPING',  clientId:'u1', assignedTo:'u4', createdAt:'2025-05-28', dueDate:'2025-06-15', workflow:'MONTHLY_CLOSE', completedAt:null },
  { id:'t4',  title:'Reconcile March bank account',             description:'Bank reconciliation for March 2025.',                                     status:'IN_PROGRESS',  priority:'MEDIUM', category:'BOOKKEEPING',  clientId:'u1', assignedTo:'u4', createdAt:'2025-06-05', dueDate:'2025-06-18', workflow:'MONTHLY_CLOSE', completedAt:null },
  { id:'t5',  title:'Sign engagement letter',                   description:'Please e-sign the engagement letter.',                                    status:'COMPLETED',    priority:'HIGH',   category:'ONBOARDING',   clientId:'u1', assignedTo:'u3', createdAt:'2025-05-20', dueDate:'2025-05-25', workflow:'ONBOARDING',    completedAt:'2025-05-24' },
  { id:'t6',  title:'Connect bank account via Plaid',           description:'Link your business bank account.',                                        status:'COMPLETED',    priority:'HIGH',   category:'ONBOARDING',   clientId:'u1', assignedTo:'u1', createdAt:'2025-05-20', dueDate:'2025-05-27', workflow:'ONBOARDING',    completedAt:'2025-05-26' },
  { id:'t7',  title:'Prepare Q2 estimated tax payment',         description:'Calculate and prepare Q2 estimated tax voucher.',                         status:'IN_PROGRESS',  priority:'URGENT', category:'TAX',          clientId:'u2', assignedTo:'u5', createdAt:'2025-06-10', dueDate:'2025-06-15', workflow:'TAX_FILING',    completedAt:null },
  { id:'t8',  title:'Upload payroll records (May)',              description:'Submit May payroll records.',                                             status:'PENDING',      priority:'MEDIUM', category:'PAYROLL',      clientId:'u2', assignedTo:'u4', createdAt:'2025-06-12', dueDate:'2025-06-25', workflow:'MONTHLY_CLOSE', completedAt:null },
  { id:'t9',  title:'Review business formation documents',      description:'LLC formation documents ready for review.',                               status:'IN_REVIEW',    priority:'HIGH',   category:'DOCUMENTS',    clientId:'u2', assignedTo:'u3', createdAt:'2025-06-08', dueDate:'2025-06-19', workflow:'ONBOARDING',    completedAt:null },
  { id:'t10', title:'Categorize March expenses',                description:'Several transactions need manual categorization.',                        status:'BLOCKED',      priority:'MEDIUM', category:'BOOKKEEPING',  clientId:'u2', assignedTo:'u4', createdAt:'2025-06-03', dueDate:'2025-06-17', workflow:'MONTHLY_CLOSE', completedAt:null },
  { id:'t11', title:'Prepare 2024 annual return – Martinez LLC',description:'Prepare business tax return. All documents collected.',                  status:'IN_PROGRESS',  priority:'HIGH',   category:'TAX',          clientId:'u1', assignedTo:'u5', createdAt:'2025-06-10', dueDate:'2025-06-30', workflow:'TAX_FILING',    completedAt:null },
  { id:'t12', title:'Monthly close – Chen Consulting (May)',    description:'Complete monthly close procedures.',                                      status:'PENDING',      priority:'HIGH',   category:'BOOKKEEPING',  clientId:'u2', assignedTo:'u4', createdAt:'2025-06-13', dueDate:'2025-06-20', workflow:'MONTHLY_CLOSE', completedAt:null },
  { id:'t13', title:'Review Q1 expenses – Chen Consulting',    description:'Categorize and validate Q1 expense transactions.',                        status:'COMPLETED',    priority:'MEDIUM', category:'BOOKKEEPING',  clientId:'u2', assignedTo:'u4', createdAt:'2025-05-01', dueDate:'2025-05-10', workflow:'MONTHLY_CLOSE', completedAt:'2025-05-09' },
  { id:'t14', title:'File state tax return – CA',               description:'File California state return for Martinez LLC.',                          status:'PENDING',      priority:'HIGH',   category:'TAX',          clientId:'u1', assignedTo:'u5', createdAt:'2025-06-11', dueDate:'2025-07-01', workflow:'TAX_FILING',    completedAt:null },
];

// ─── MESSAGES ─────────────────────────────────────────────────────
export const SEED_MESSAGES = [
  { id:'m1', from:'u3', to:'u1', subject:'Welcome to EazyTaxes!',                     body:'Hi John! Welcome aboard. I\'m Rachel, your dedicated accountant. Feel free to reach out anytime. Our first step is to get your bank account connected.', createdAt:'2025-05-20T09:00:00Z', read:true },
  { id:'m2', from:'u1', to:'u3', subject:'Re: Welcome to EazyTaxes!',                 body:'Thank you Rachel! Happy to be here. I\'ll connect the bank account today.', createdAt:'2025-05-20T11:30:00Z', read:true },
  { id:'m3', from:'u3', to:'u1', subject:'Q1 Documents Needed',                       body:'Hi John, to proceed with your Q1 bookkeeping we need your January through March bank statements. Please upload them in the Document Center at your earliest convenience.', createdAt:'2025-06-05T08:00:00Z', read:true },
  { id:'m4', from:'u5', to:'u1', subject:'Tax Return Update',                         body:'Hi John, we\'re making good progress on your 2024 return. We just need your W2 and 1099 forms to finalize. Due date is approaching.', createdAt:'2025-06-10T14:00:00Z', read:false },
  { id:'m5', from:'u3', to:'u2', subject:'Welcome – Chen Consulting',                 body:'Hi Sarah! I\'m Rachel, your accountant. We\'re excited to work with Chen Consulting. Your onboarding workflow has started.', createdAt:'2025-03-02T09:00:00Z', read:true },
  { id:'m6', from:'u2', to:'u3', subject:'Question about Q2 estimates',               body:'Hi Rachel, Lisa mentioned I need to make a Q2 estimated tax payment. Can you walk me through how much and how to pay?', createdAt:'2025-06-11T10:00:00Z', read:false },
  { id:'m7', from:'u3', to:'u2', subject:'Re: Question about Q2 estimates',           body:'Hi Sarah, great question. Based on your Q1 income, we estimate your Q2 payment to be around $2,400. Lisa will send you the exact voucher shortly. Due date is June 15.', createdAt:'2025-06-11T14:30:00Z', read:true },
];

// ─── TAX FILINGS ─────────────────────────────────────────────────
export const SEED_FILINGS = [
  { id:'f1', clientId:'u1', taxYear:2024, type:'Federal Business',  status:'PREPARING',        dueDate:'2025-09-15', filedAt:null,         returnAmount:null,  notes:'Extension filed. Preparing S-Corp return.' },
  { id:'f2', clientId:'u1', taxYear:2024, type:'California State',  status:'PENDING',          dueDate:'2025-09-15', filedAt:null,         returnAmount:null,  notes:'Waiting on federal return.' },
  { id:'f3', clientId:'u1', taxYear:2023, type:'Federal Business',  status:'FILED',            dueDate:'2024-04-15', filedAt:'2024-04-10', returnAmount:3240,  notes:'Refund of $3,240 received.' },
  { id:'f4', clientId:'u1', taxYear:2023, type:'California State',  status:'FILED',            dueDate:'2024-04-15', filedAt:'2024-04-10', returnAmount:410,   notes:'Refund of $410.' },
  { id:'f5', clientId:'u2', taxYear:2024, type:'Federal Business',  status:'COLLECTING_DOCS',  dueDate:'2025-09-15', filedAt:null,         returnAmount:null,  notes:'Awaiting income docs from client.' },
  { id:'f6', clientId:'u2', taxYear:2023, type:'Federal Business',  status:'FILED',            dueDate:'2024-04-15', filedAt:'2024-04-12', returnAmount:-1200, notes:'Amount owed: $1,200. Paid on time.' },
];

// ─── TRANSACTIONS (Bookkeeper) ────────────────────────────────────
export const SEED_TRANSACTIONS = [
  { id:'tx1',  clientId:'u1', date:'2025-03-01', description:'Office Depot – Office Supplies',    amount:-234.50,  category:'Office Expenses',      status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx2',  clientId:'u1', date:'2025-03-03', description:'Client Payment – Acme Corp',        amount:5000.00,  category:'Revenue',              status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx3',  clientId:'u1', date:'2025-03-05', description:'AWS – Cloud Services',              amount:-189.99,  category:'Software & Tech',      status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx4',  clientId:'u1', date:'2025-03-07', description:'Starbucks',                         amount:-18.40,   category:'Meals & Entertainment',status:'FLAGGED',        account:'Chase ****4821' },
  { id:'tx5',  clientId:'u1', date:'2025-03-10', description:'Unknown Vendor – REF#8823',        amount:-440.00,  category:null,                   status:'NEEDS_REVIEW',   account:'Chase ****4821' },
  { id:'tx6',  clientId:'u1', date:'2025-03-12', description:'Client Payment – Beta LLC',        amount:3200.00,  category:'Revenue',              status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx7',  clientId:'u1', date:'2025-03-15', description:'ADP Payroll',                       amount:-4200.00, category:'Payroll',              status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx8',  clientId:'u1', date:'2025-03-18', description:'Chase – Loan Payment',              amount:-875.00,  category:'Loan Repayment',       status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx9',  clientId:'u1', date:'2025-03-22', description:'Gas Station',                      amount:-62.10,   category:null,                   status:'NEEDS_REVIEW',   account:'Chase ****4821' },
  { id:'tx10', clientId:'u1', date:'2025-03-28', description:'Client Payment – Gamma Inc',       amount:7500.00,  category:'Revenue',              status:'CATEGORIZED',   account:'Chase ****4821' },
  { id:'tx11', clientId:'u2', date:'2025-03-02', description:'Zoom – Subscription',              amount:-15.99,   category:'Software & Tech',      status:'CATEGORIZED',   account:'BofA ****2211' },
  { id:'tx12', clientId:'u2', date:'2025-03-05', description:'Consulting Revenue – Delta Co',    amount:12000.00, category:'Revenue',              status:'CATEGORIZED',   account:'BofA ****2211' },
  { id:'tx13', clientId:'u2', date:'2025-03-08', description:'Hotel – Client Meeting',           amount:-320.00,  category:'Travel',               status:'FLAGGED',        account:'BofA ****2211' },
  { id:'tx14', clientId:'u2', date:'2025-03-15', description:'ADP Payroll',                      amount:-6800.00, category:'Payroll',              status:'CATEGORIZED',   account:'BofA ****2211' },
];

// ─── TICKETS (Support) ────────────────────────────────────────────
export const SEED_TICKETS = [
  { id:'tk1', clientId:'u1', subject:'Cannot access my documents',        description:'I uploaded files last week but now I cannot find them in the Document Center.', status:'OPEN',        priority:'HIGH',   createdAt:'2025-06-14', agentId:null,  resolvedAt:null },
  { id:'tk2', clientId:'u2', subject:'Question about Q2 estimated taxes', description:'I need help understanding the Q2 estimated tax payment amount shown on my dashboard.',  status:'IN_PROGRESS', priority:'NORMAL', createdAt:'2025-06-12', agentId:'u7',  resolvedAt:null },
  { id:'tk3', clientId:'u1', subject:'Update business address',           description:'We moved offices. Please update the address on all our tax forms to: 123 New St, Los Angeles CA 90001.', status:'RESOLVED',    priority:'NORMAL', createdAt:'2025-06-01', agentId:'u7',  resolvedAt:'2025-06-03' },
  { id:'tk4', clientId:'u2', subject:'Payroll report not showing May',    description:'The May 2025 payroll report is missing from my bookkeeping section.',                 status:'OPEN',        priority:'HIGH',   createdAt:'2025-06-13', agentId:null,  resolvedAt:null },
  { id:'tk5', clientId:'u1', subject:'Need copy of 2022 return',          description:'I need a copy of my 2022 federal tax return for a bank loan application.',           status:'RESOLVED',    priority:'LOW',    createdAt:'2025-05-20', agentId:'u7',  resolvedAt:'2025-05-22' },
];

// ─── COMPLIANCE ITEMS (Tax Specialist) ──────────────────────────
export const SEED_COMPLIANCE = [
  { id:'c1', clientId:'u1', title:'Q2 Estimated Tax Payment – Federal', dueDate:'2025-06-15', status:'OVERDUE',  type:'ESTIMATED_TAX',  notes:'1040-ES voucher. Approx $2,800.' },
  { id:'c2', clientId:'u1', title:'2024 Federal Business Return',        dueDate:'2025-09-15', status:'PENDING',  type:'TAX_RETURN',     notes:'Extension filed April 15.' },
  { id:'c3', clientId:'u1', title:'2024 California State Return',        dueDate:'2025-09-15', status:'PENDING',  type:'TAX_RETURN',     notes:'Follows federal extension.' },
  { id:'c4', clientId:'u1', title:'Q3 Estimated Tax Payment – Federal', dueDate:'2025-09-15', status:'PENDING',  type:'ESTIMATED_TAX',  notes:'Due same day as extension.' },
  { id:'c5', clientId:'u2', title:'Q2 Estimated Tax Payment – Federal', dueDate:'2025-06-15', status:'OVERDUE',  type:'ESTIMATED_TAX',  notes:'1040-ES voucher. Approx $3,200.' },
  { id:'c6', clientId:'u2', title:'2024 Federal Business Return',        dueDate:'2025-09-15', status:'PENDING',  type:'TAX_RETURN',     notes:'Extension filed.' },
  { id:'c7', clientId:'u1', title:'W-2s issued to employees',            dueDate:'2025-01-31', status:'COMPLETED',type:'PAYROLL',        notes:'3 W-2s filed on time.' },
  { id:'c8', clientId:'u2', title:'1099-NEC issued to contractors',      dueDate:'2025-01-31', status:'COMPLETED',type:'PAYROLL',        notes:'2 contractors. Filed Jan 28.' },
];

// ─── RECONCILIATION ───────────────────────────────────────────────
export const SEED_RECONCILIATION = [
  { id:'r1', clientId:'u1', month:'2025-03', account:'Chase ****4821', status:'IN_PROGRESS', bankBalance:24340.50, bookBalance:24120.00, difference:220.50, checklist:{ bank_statement:true, transactions_imported:true, expenses_categorized:false, anomalies_reviewed:false, report_generated:false } },
  { id:'r2', clientId:'u1', month:'2025-02', account:'Chase ****4821', status:'COMPLETED',   bankBalance:21800.00, bookBalance:21800.00, difference:0,      checklist:{ bank_statement:true, transactions_imported:true, expenses_categorized:true,  anomalies_reviewed:true,  report_generated:true  } },
  { id:'r3', clientId:'u2', month:'2025-03', account:'BofA ****2211',  status:'PENDING',     bankBalance:38900.00, bookBalance:0,        difference:null,   checklist:{ bank_statement:false,transactions_imported:false,expenses_categorized:false, anomalies_reviewed:false, report_generated:false } },
];

// ─── WORKFLOWS ────────────────────────────────────────────────────
export const WORKFLOWS = {
  ONBOARDING: {
    name: 'New Client Onboarding',
    steps: ['Sign engagement letter','Collect business info','Connect bank account','Assign accountant','Assign bookkeeper','Create tax profile','Activate recurring workflow'],
  },
  TAX_FILING: {
    name: 'Tax Filing',
    steps: ['Request documents','Client uploads files','Accountant prepares return','Internal review','Client approval','File return','Archive documents'],
  },
  MONTHLY_CLOSE: {
    name: 'Monthly Bookkeeping Close',
    steps: ['Import transactions','Reconcile accounts','Review anomalies','Generate reports','Client review','Close month'],
  },
};

export const SEED_WORKFLOWS = [
  { id:'wf1', clientId:'u1', type:'ONBOARDING',    name:'New Client Onboarding – Martinez LLC',    status:'COMPLETED', startedAt:'2025-01-15', completedAt:'2025-02-01', steps:[{s:true},{s:true},{s:true},{s:true},{s:true},{s:true},{s:true}] },
  { id:'wf2', clientId:'u1', type:'TAX_FILING',    name:'2024 Tax Filing – Martinez LLC',          status:'ACTIVE',    startedAt:'2025-05-01', completedAt:null,         steps:[{s:true},{s:false},{s:false},{s:false},{s:false},{s:false},{s:false}] },
  { id:'wf3', clientId:'u1', type:'MONTHLY_CLOSE', name:'Monthly Close May 2025 – Martinez LLC',   status:'ACTIVE',    startedAt:'2025-06-01', completedAt:null,         steps:[{s:true},{s:true},{s:false},{s:false},{s:false},{s:false}] },
  { id:'wf4', clientId:'u2', type:'ONBOARDING',    name:'New Client Onboarding – Chen Consulting', status:'ACTIVE',    startedAt:'2025-03-01', completedAt:null,         steps:[{s:true},{s:true},{s:true},{s:false},{s:false},{s:false},{s:false}] },
  { id:'wf5', clientId:'u2', type:'TAX_FILING',    name:'2024 Tax Filing – Chen Consulting',       status:'ACTIVE',    startedAt:'2025-05-15', completedAt:null,         steps:[{s:false},{s:false},{s:false},{s:false},{s:false},{s:false},{s:false}] },
];
