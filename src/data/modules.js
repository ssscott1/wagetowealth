export const MODULES = [
  {
    id: 1,
    slug: 'budgeting-saving',
    title: 'Budgeting & Saving',
    category: 'Foundations',
    icon: '💰',
    description: 'Master the 50/30/20 rule, build an emergency fund, and set savings goals.',
    overview: `Budgeting is the foundation of financial health. By understanding where your money goes, you can make intentional decisions that align with your goals.

The 50/30/20 rule is a simple, effective framework: allocate 50% of your after-tax income to needs (rent, utilities, groceries), 30% to wants (dining out, entertainment, hobbies), and 20% to savings and debt repayment.

**Emergency Fund:** Financial experts recommend maintaining 3–6 months of living expenses in an easily accessible account. This buffer protects you from unexpected costs like job loss, medical emergencies, or car repairs without needing to go into debt.

**Savings Goals:** Define what you're saving for — a home deposit, holiday, or retirement. Break large goals into monthly targets and automate transfers to a dedicated savings account on payday (pay yourself first).`,
    keyPoints: [
      '50% needs, 30% wants, 20% savings & debt',
      'Emergency fund: 3–6 months of expenses',
      'Automate savings to remove temptation',
      'Track spending weekly to stay on budget',
      'Use high-interest savings accounts (HISA) for your emergency fund',
    ],
    calculator: 'budget-planner',
    quiz: [
      {
        question: 'According to the 50/30/20 rule, what percentage should go to savings and debt repayment?',
        options: ['10%', '20%', '30%', '50%'],
        correct: 1,
        explanation: 'The 50/30/20 rule allocates 20% to savings and debt repayment, helping build financial security over time.',
      },
      {
        question: 'How many months of expenses is recommended for an emergency fund?',
        options: ['1–2 months', '3–6 months', '6–12 months', '12+ months'],
        correct: 1,
        explanation: '3–6 months of living expenses provides a solid buffer against unexpected financial shocks without tying up too much capital.',
      },
      {
        question: 'What does "paying yourself first" mean?',
        options: [
          'Spending on wants before needs',
          'Automating savings transfers before spending',
          'Paying off debt immediately',
          'Investing before paying bills',
        ],
        correct: 1,
        explanation: '"Paying yourself first" means setting up automatic transfers to savings on payday, before you have the chance to spend the money.',
      },
      {
        question: 'Which account type is best for an emergency fund?',
        options: ['Term deposit', 'Offset account', 'High-interest savings account', 'Investment account'],
        correct: 2,
        explanation: 'A high-interest savings account offers easy access (liquidity) while still earning interest — ideal for emergency funds.',
      },
      {
        question: 'What is a "needs" expense under the 50/30/20 rule?',
        options: ['Streaming subscriptions', 'Dining out', 'Rent/mortgage', 'Holiday savings'],
        correct: 2,
        explanation: 'Needs are essential expenses required for basic living — rent/mortgage, utilities, groceries, minimum debt repayments, and transport to work.',
      },
    ],
  },
  {
    id: 2,
    slug: 'banking-basics',
    title: 'Banking Basics',
    category: 'Foundations',
    icon: '🏦',
    description: 'Understand account types, compound interest, and how banking protections work.',
    overview: `Understanding how banking works helps you make smarter decisions about where to keep and grow your money.

**Account Types:** A transaction account is for everyday spending — it offers easy access but typically earns little or no interest. A savings account earns interest and is designed for money you don't need daily. Term deposits lock your money for a fixed period in exchange for a guaranteed, higher interest rate.

**Compound Interest:** This is the "eighth wonder of the world" — interest earning interest on itself. $10,000 earning 5% p.a. compounded annually becomes $16,289 after 10 years without adding a single dollar. The earlier you start saving, the more powerful compounding becomes.

**Government Guarantee:** In Australia, the Financial Claims Scheme (FCS) guarantees deposits up to $250,000 per account holder per authorised deposit-taking institution (ADI). This means your savings are protected even if a bank fails.`,
    keyPoints: [
      'Transaction accounts for daily spending, savings accounts for growth',
      'Compound interest: earning interest on your interest',
      'FCS protects up to $250,000 per ADI',
      'Authorised Deposit-Taking Institutions (ADIs) are APRA-regulated',
      'Compare savings rates at moneysmart.gov.au',
    ],
    quiz: [
      {
        question: 'What does the Financial Claims Scheme (FCS) protect?',
        options: [
          'Up to $100,000 per bank',
          'Up to $250,000 per account holder per ADI',
          'All deposits regardless of amount',
          'Only term deposits',
        ],
        correct: 1,
        explanation: 'The FCS protects deposits up to $250,000 per account holder per ADI (Authorised Deposit-Taking Institution).',
      },
      {
        question: 'What is compound interest?',
        options: [
          'Interest calculated on the original principal only',
          'A fee charged by banks',
          'Interest earned on both principal and previously earned interest',
          'A fixed government interest rate',
        ],
        correct: 2,
        explanation: 'Compound interest means you earn interest on your interest, causing your savings to grow exponentially over time.',
      },
      {
        question: 'Which account type typically offers the highest interest rate?',
        options: ['Transaction account', 'Savings account', 'Term deposit', 'Cheque account'],
        correct: 2,
        explanation: 'Term deposits typically offer higher rates because you agree to lock your money away for a fixed period, reducing the bank\'s liquidity risk.',
      },
      {
        question: 'What does ADI stand for?',
        options: ['Australian Deposit Institution', 'Authorised Deposit-Taking Institution', 'Annual Deposit Index', 'Asset Development Initiative'],
        correct: 1,
        explanation: 'ADI stands for Authorised Deposit-Taking Institution — banks, credit unions, and building societies regulated by APRA.',
      },
      {
        question: '$5,000 invested at 6% p.a. compounded annually for 20 years will grow to approximately:',
        options: ['$11,000', '$16,000', '$12,000', '$6,000'],
        correct: 1,
        explanation: 'Using the compound interest formula: $5,000 × (1.06)^20 ≈ $16,036. This demonstrates the power of long-term compounding.',
      },
    ],
  },
  {
    id: 3,
    slug: 'debt-credit',
    title: 'Debt & Credit',
    category: 'Foundations',
    icon: '💳',
    description: 'Understand credit scores, debt repayment strategies, and the risks of BNPL.',
    overview: `Debt is a tool — used wisely, it can help you build wealth; mismanaged, it can trap you. Understanding how credit works puts you in control.

**Credit Scores:** In Australia, credit scores are maintained by bureaus like Equifax, Experian, and illion. Scores range from 0–1,200 (Equifax) and are affected by: payment history, credit enquiries, credit utilisation, and the age of your credit accounts. A higher score means better rates on loans.

**Debt Repayment Strategies:**
- *Avalanche method:* Pay minimum on all debts, throw extra at the highest-interest debt first. Mathematically optimal.
- *Snowball method:* Pay off smallest balances first for psychological wins. Effective for motivation.

**Buy Now Pay Later (BNPL):** Services like Afterpay, Zip, and Klarna are not regulated as credit products and don't appear on credit reports in the same way — but missed payments can result in fees and default listings. BNPL can encourage overspending.`,
    keyPoints: [
      'Credit scores affect your borrowing power and interest rates',
      'Avalanche method saves the most interest',
      'Snowball method provides psychological momentum',
      'BNPL is not regulated as credit — use with caution',
      'Free annual credit report: annualcreditreport.com.au',
    ],
    quiz: [
      {
        question: 'Which debt repayment strategy saves the most money in interest?',
        options: ['Snowball method', 'Avalanche method', 'Minimum payment method', 'Debt consolidation'],
        correct: 1,
        explanation: 'The avalanche method (paying highest-interest debt first) is mathematically optimal and minimises total interest paid.',
      },
      {
        question: 'What primarily determines your credit score?',
        options: [
          'Your income level',
          'Payment history, credit enquiries, and utilisation',
          'How many bank accounts you have',
          'Your employer',
        ],
        correct: 1,
        explanation: 'Credit scores are primarily determined by repayment history, credit enquiries, credit utilisation ratio, and account age.',
      },
      {
        question: 'What is a risk of Buy Now Pay Later (BNPL) services?',
        options: [
          'They charge annual fees like credit cards',
          'They always appear on credit reports',
          'They can encourage overspending and charge fees for late payments',
          'They are banned in Australia',
        ],
        correct: 2,
        explanation: 'BNPL can encourage spending beyond your means and missed payments result in fees. ASIC has raised concerns about BNPL and debt accumulation.',
      },
      {
        question: 'What does "credit utilisation" mean?',
        options: [
          'The number of credit cards you own',
          'The percentage of available credit you are using',
          'Your total debt amount',
          'How often you apply for credit',
        ],
        correct: 1,
        explanation: 'Credit utilisation is the ratio of your current credit balances to your total available credit limit. Lower utilisation (under 30%) is better for your score.',
      },
      {
        question: 'How can you get a free copy of your credit report in Australia?',
        options: [
          'Only through paid services',
          'Once every 5 years through ASIC',
          'For free annually through credit bureaus like Equifax',
          'Only when applying for a loan',
        ],
        correct: 2,
        explanation: 'Australians are entitled to a free credit report annually from each credit reporting bureau (Equifax, Experian, illion).',
      },
    ],
  },
  {
    id: 4,
    slug: 'buying-a-house',
    title: 'Buying a House',
    category: 'Property',
    icon: '🏠',
    description: 'Navigate the home buying process, deposits, stamp duty, LMI, and the FHBG.',
    overview: `Buying a home is likely the largest financial decision of your life. Understanding the process reduces stress and helps you avoid costly mistakes.

**The Process:** Research → Pre-approval → Property search → Offer/auction → Exchange of contracts → Settlement

**Deposit:** Most lenders require a 20% deposit to avoid Lenders Mortgage Insurance (LMI). However, many first home buyers purchase with a 5–10% deposit.

**Stamp Duty:** A state government tax on property purchases. Rates vary by state and purchase price. First home buyers may be exempt or receive concessions (e.g., under $800k in NSW, $600k in VIC).

**Lenders Mortgage Insurance (LMI):** Protects the lender (not you) if you default with less than 20% deposit. Can add $10,000–$30,000+ to your loan. It can be capitalised into the loan.

**First Home Buyers Guarantee (FHBG):** The federal government guarantees up to 15% of your deposit, allowing eligible first home buyers to purchase with as little as 5% without paying LMI.`,
    keyPoints: [
      '20% deposit avoids LMI; FHBG allows 5% without LMI',
      'Stamp duty varies by state — check your state\'s rules',
      'Get pre-approval before inspecting properties',
      'Budget for additional costs: conveyancing, building inspection, moving',
      'Settlement is typically 30–90 days after exchange',
    ],
    calculator: 'mortgage-repayment',
    quiz: [
      {
        question: 'What is Lenders Mortgage Insurance (LMI)?',
        options: [
          'Insurance that protects you if you lose your job',
          'Insurance that protects the lender if you default with <20% deposit',
          'A government scheme for first home buyers',
          'Insurance against building defects',
        ],
        correct: 1,
        explanation: 'LMI protects the lender, not the borrower. It\'s required when borrowing more than 80% of the property value.',
      },
      {
        question: 'What is the minimum deposit for the First Home Buyers Guarantee (FHBG)?',
        options: ['2%', '5%', '10%', '20%'],
        correct: 1,
        explanation: 'The FHBG allows eligible first home buyers to purchase with as little as 5% deposit without paying LMI.',
      },
      {
        question: 'What is stamp duty?',
        options: [
          'A federal tax on all property transactions',
          'A state government tax on property purchases',
          'A fee charged by conveyancers',
          'A bank fee for mortgage setup',
        ],
        correct: 1,
        explanation: 'Stamp duty (also called transfer duty) is a state government tax. Rates and concessions vary by state and purchase price.',
      },
      {
        question: 'What typically happens at settlement?',
        options: [
          'You sign the contract of sale',
          'You pay the deposit',
          'Ownership transfers and you receive the keys',
          'The bank approves your loan',
        ],
        correct: 2,
        explanation: 'At settlement, the remaining balance is paid, ownership legally transfers to you, and you receive the keys.',
      },
      {
        question: 'Why is it important to get a building inspection before purchasing?',
        options: [
          'It is legally required',
          'To identify structural issues or defects before committing to purchase',
          'To satisfy stamp duty requirements',
          'Banks require it for pre-approval',
        ],
        correct: 1,
        explanation: 'A building inspection can reveal hidden structural issues, pest problems, or defects that could cost tens of thousands to fix — before you\'re legally committed.',
      },
    ],
  },
  {
    id: 5,
    slug: 'getting-a-mortgage',
    title: 'Getting a Mortgage',
    category: 'Property',
    icon: '📋',
    description: 'Fixed vs variable rates, LVR, offset accounts, and how to negotiate your rate.',
    overview: `A mortgage is a long-term commitment. Understanding your options helps you choose the right loan and save potentially tens of thousands in interest.

**Fixed vs Variable:**
- *Fixed rate:* Rate locked for a term (1–5 years). Certainty, but less flexibility — break costs can be significant.
- *Variable rate:* Moves with market rates. Offers features like offset accounts and redraw, and usually lower long-term costs.
- *Split loan:* Fix part, keep part variable — the best of both worlds.

**Loan-to-Value Ratio (LVR):** Your loan amount as a percentage of the property value. LVR under 80% avoids LMI. The lower your LVR, the better interest rate you can typically negotiate.

**Offset Account:** A linked transaction account where the balance offsets your loan principal for interest purposes. $400,000 loan with $50,000 in offset = you pay interest on $350,000. Highly effective for reducing interest without losing access to funds.

**Redraw Facility:** Extra repayments can be withdrawn if needed — less tax-effective than offset for investment properties.`,
    keyPoints: [
      'Variable rates offer more features; fixed rates offer certainty',
      'Offset accounts can save tens of thousands in interest',
      'LVR under 80% gets better rates and avoids LMI',
      'Compare comparison rates, not just advertised rates',
      'You can negotiate your rate — banks want to keep your business',
    ],
    calculator: 'mortgage-rate-saving',
    quiz: [
      {
        question: 'What is an offset account?',
        options: [
          'A separate savings account with higher interest',
          'A linked account whose balance reduces your loan balance for interest calculations',
          'A government first home buyer account',
          'A redraw facility',
        ],
        correct: 1,
        explanation: 'An offset account reduces the principal on which interest is calculated. $50,000 in offset on a $400,000 loan means you pay interest on only $350,000.',
      },
      {
        question: 'What does LVR stand for?',
        options: ['Loan Value Rate', 'Loan-to-Value Ratio', 'Lender Verification Requirement', 'Low Variable Rate'],
        correct: 1,
        explanation: 'LVR is Loan-to-Value Ratio — your loan amount divided by the property value. Below 80% LVR generally avoids LMI.',
      },
      {
        question: 'What is a "comparison rate"?',
        options: [
          'The rate a competitor bank is offering',
          'The advertised interest rate',
          'An interest rate that includes most fees, giving a truer cost of a loan',
          'The RBA cash rate',
        ],
        correct: 2,
        explanation: 'The comparison rate includes the interest rate plus most fees and charges, providing a more accurate picture of the true cost of a loan.',
      },
      {
        question: 'When might you pay a "break cost" on a fixed rate loan?',
        options: [
          'When you make extra repayments',
          'When you refinance or exit the loan during the fixed period',
          'When interest rates rise',
          'When you open an offset account',
        ],
        correct: 1,
        explanation: 'Break costs apply when you exit a fixed rate loan early — the lender recalculates costs based on wholesale market rates, which can be substantial.',
      },
      {
        question: 'What is the APRA serviceability buffer?',
        options: [
          'A fee added to all mortgages',
          'Banks must test if you can afford repayments at your rate + 3%',
          'A cap on interest rates',
          'A government guarantee scheme',
        ],
        correct: 1,
        explanation: 'APRA requires lenders to assess borrowers at their interest rate plus at least 3%, ensuring they can afford repayments if rates rise.',
      },
    ],
  },
  {
    id: 6,
    slug: 'buying-a-car',
    title: 'Buying a Car',
    category: 'Borrowing',
    icon: '🚗',
    description: 'Car loans, novated leases, balloon payments — choose the right option.',
    overview: `A car is typically the second-largest purchase after a home. Understanding your financing options can save thousands.

**Car Loan:** You own the car from day one. Secured car loans (where the car is collateral) typically offer lower rates than unsecured personal loans. Shop around — credit unions and online lenders often beat dealership finance.

**Novated Lease:** A three-way arrangement between you, your employer, and a finance company. Payments are made pre-tax, reducing your taxable income — making this particularly tax-effective. Available through salary packaging with many employers.

**Balloon Payment:** A lump sum due at the end of the loan term (often 20–30% of the vehicle value). Lowers regular repayments but can leave you in negative equity and require refinancing or selling the car.

**Depreciation:** New cars lose 15–25% of their value in the first year. Buying a 2–3 year old car can deliver significant savings with most depreciation already absorbed.`,
    keyPoints: [
      'Novated leases can save tax via salary packaging',
      'Balloon payments reduce repayments but create end-of-term risk',
      'Secured car loans have lower rates than unsecured',
      'New cars depreciate rapidly — consider 2–3 year old vehicles',
      'Always compare the comparison rate, not just monthly repayment',
    ],
    calculator: 'car-loan',
    quiz: [
      {
        question: 'What is a balloon payment?',
        options: [
          'A monthly repayment on a car loan',
          'A lump sum payment due at the end of a loan term',
          'An upfront deposit',
          'An insurance premium',
        ],
        correct: 1,
        explanation: 'A balloon payment is a large lump sum due at the end of the loan term. While it reduces regular repayments, it requires careful planning to pay off or refinance.',
      },
      {
        question: 'What makes a novated lease tax-effective?',
        options: [
          'It removes GST from the car purchase price',
          'Lease payments are made from pre-tax salary, reducing taxable income',
          'The government subsidises electric vehicles',
          'There is no interest on novated leases',
        ],
        correct: 1,
        explanation: 'Novated lease payments come from your pre-tax salary, reducing your taxable income. Running costs like fuel and insurance can also be included.',
      },
      {
        question: 'How much value can a new car lose in its first year?',
        options: ['5–10%', '15–25%', '30–40%', '50%+'],
        correct: 1,
        explanation: 'New cars typically depreciate 15–25% in the first year. Buying a 2–3 year old car lets someone else absorb that depreciation.',
      },
      {
        question: 'What is a secured car loan?',
        options: [
          'A loan guaranteed by the government',
          'A loan where the car serves as collateral',
          'A loan with a fixed interest rate',
          'A loan arranged through your employer',
        ],
        correct: 1,
        explanation: 'A secured car loan uses the vehicle as collateral. This reduces the lender\'s risk and typically results in lower interest rates than unsecured loans.',
      },
      {
        question: 'What should you compare when evaluating car loan options?',
        options: [
          'Only the monthly repayment amount',
          'Only the advertised interest rate',
          'The comparison rate, which includes fees',
          'The colour of the car',
        ],
        correct: 2,
        explanation: 'Always compare comparison rates — they include fees and charges, giving you the true cost of borrowing across different loan options.',
      },
    ],
  },
  {
    id: 7,
    slug: 'personal-loans',
    title: 'Personal Loans',
    category: 'Borrowing',
    icon: '📑',
    description: 'Comparison rates, secured vs unsecured loans, and what to watch for.',
    overview: `Personal loans can fund renovations, consolidate debt, or cover large unexpected expenses — but they come at a cost. Understanding the terms ensures you borrow wisely.

**Secured vs Unsecured:**
- *Secured:* Backed by an asset (car, savings). Lower interest rates but the asset can be repossessed if you default.
- *Unsecured:* No collateral. Higher interest rates (typically 8–20% p.a.) reflecting higher lender risk.

**Comparison Rate:** The advertised rate plus fees, expressed as a single annual percentage. Always use the comparison rate when comparing loans — a loan with a low rate but high fees may cost more than one with a slightly higher rate.

**What to Watch For:**
- Early repayment fees (exit fees)
- Monthly/annual account fees
- Establishment fees
- Late payment penalties

**Debt Consolidation:** A personal loan to pay off multiple high-interest debts (credit cards, BNPL) can reduce your total interest if the personal loan rate is lower. However, consolidation can extend repayment terms and total cost.`,
    keyPoints: [
      'Comparison rate reveals the true cost — always use it',
      'Secured loans have lower rates; unsecured loans are higher risk',
      'Watch for exit fees if you plan to repay early',
      'Debt consolidation can help if your new rate is genuinely lower',
      'Never borrow more than you need',
    ],
    calculator: 'debt-payoff',
    quiz: [
      {
        question: 'What is the main difference between secured and unsecured personal loans?',
        options: [
          'Secured loans are from banks; unsecured from non-banks',
          'Secured loans require an asset as collateral; unsecured do not',
          'Secured loans have higher interest rates',
          'Unsecured loans are only for businesses',
        ],
        correct: 1,
        explanation: 'Secured loans require collateral (an asset), which reduces lender risk and allows lower interest rates. Unsecured loans carry higher rates to compensate for greater lender risk.',
      },
      {
        question: 'Why should you use the comparison rate rather than the advertised rate?',
        options: [
          'The comparison rate is always lower',
          'The comparison rate includes fees, showing the true borrowing cost',
          'The advertised rate changes daily',
          'The comparison rate is set by ASIC',
        ],
        correct: 1,
        explanation: 'The comparison rate combines the interest rate with fees and charges into a single percentage, allowing accurate comparison between different loan products.',
      },
      {
        question: 'When does debt consolidation make financial sense?',
        options: [
          'Always — it simplifies repayments',
          'When the consolidation loan rate is lower than the average of your existing debts',
          'When you want to extend your repayment term',
          'When you have only one debt',
        ],
        correct: 1,
        explanation: 'Debt consolidation only saves money if the new loan rate is genuinely lower than the weighted average of your existing debts, and if you don\'t extend the term unnecessarily.',
      },
      {
        question: 'What is an "exit fee" or "early repayment fee"?',
        options: [
          'A fee for opening a loan',
          'A monthly account fee',
          'A fee charged for paying off your loan before the end of the term',
          'A government tax on loans',
        ],
        correct: 2,
        explanation: 'Some lenders charge fees for early loan repayment to recoup interest they expected to earn. Check for these before choosing a loan if you plan to repay early.',
      },
      {
        question: 'What is a typical interest rate range for unsecured personal loans in Australia?',
        options: ['1–5% p.a.', '5–8% p.a.', '8–20% p.a.', '20–30% p.a.'],
        correct: 2,
        explanation: 'Unsecured personal loans in Australia typically carry interest rates of 8–20% p.a. due to the higher risk for lenders without collateral.',
      },
    ],
  },
  {
    id: 8,
    slug: 'investment-property',
    title: 'Buying an Investment Property',
    category: 'Investing',
    icon: '🏘️',
    description: 'Negative gearing, CGT discount, depreciation, and rental yield basics.',
    overview: `Property investment can build long-term wealth, but it's not passive income — it requires capital, ongoing management, and tolerance for complexity.

**Rental Yield:** Annual rent ÷ property value × 100. A $600,000 property renting for $30,000/year has a 5% gross yield. Net yield accounts for expenses (rates, insurance, management, maintenance).

**Negative Gearing:** When your property costs more to hold than it earns in rent. The loss is deductible against your other income (such as salary), reducing your tax. A $10,000 net loss on a 37% marginal rate saves $3,700 in tax. Note: you still have a $6,300 cash outflow — negative gearing is a tax strategy, not a profit strategy.

**CGT Discount:** Investment properties held for more than 12 months qualify for a 50% CGT discount — you only pay tax on half the capital gain.

**Depreciation:** Building depreciation (Division 43) and plant & equipment (Division 40) can generate significant non-cash tax deductions. A quantity surveyor's report unlocks these deductions.

**Interest-Only Loans:** Common for investment properties to maximise deductible interest and cash flow. However, the principal never reduces, increasing long-term risk.`,
    keyPoints: [
      'Gross yield: annual rent ÷ property value',
      'Negative gearing offsets rental loss against taxable income',
      '50% CGT discount for properties held 12+ months',
      'Depreciation reports unlock non-cash tax deductions',
      'Leverage amplifies both gains and losses',
    ],
    calculator: 'investment-property',
    quiz: [
      {
        question: 'What is negative gearing?',
        options: [
          'When rental income exceeds property costs',
          'When property costs exceed rental income, creating a tax-deductible loss',
          'A type of depreciation',
          'A CGT strategy',
        ],
        correct: 1,
        explanation: 'Negative gearing occurs when your investment property costs more than it earns. The net loss is deductible against your other income, reducing your tax.',
      },
      {
        question: 'What CGT discount applies to investment properties held for more than 12 months?',
        options: ['25%', '33%', '50%', '75%'],
        correct: 2,
        explanation: 'Individuals and trusts receive a 50% CGT discount on assets held for more than 12 months, meaning only half the capital gain is taxable.',
      },
      {
        question: 'What is a quantity surveyor\'s report used for?',
        options: [
          'Valuing property for stamp duty purposes',
          'Estimating building costs for insurance',
          'Identifying depreciation deductions on investment property',
          'Calculating rental yield',
        ],
        correct: 2,
        explanation: 'A quantity surveyor prepares a tax depreciation schedule detailing allowable deductions for the building and its fixtures — often generating thousands in annual tax savings.',
      },
      {
        question: 'If a $700,000 property earns $35,000 annual rent, what is the gross rental yield?',
        options: ['4%', '5%', '6%', '3.5%'],
        correct: 1,
        explanation: 'Gross yield = $35,000 ÷ $700,000 × 100 = 5%. Net yield would be lower after deducting property management, rates, insurance, and maintenance.',
      },
      {
        question: 'What is an interest-only loan?',
        options: [
          'A loan with no interest for the first year',
          'A loan where you only pay interest, not principal, during the interest-only period',
          'A loan with the lowest possible interest rate',
          'A government first home buyer loan',
        ],
        correct: 1,
        explanation: 'Interest-only loans require repayment of interest only for a set period (typically 1–5 years). The principal balance does not reduce, which maintains higher deductible interest but increases long-term risk.',
      },
    ],
  },
  {
    id: 9,
    slug: 'shares-etfs',
    title: 'Buying Shares & ETFs',
    category: 'Investing',
    icon: '📈',
    description: 'ASX basics, ETFs vs managed funds, compounding, and dollar-cost averaging.',
    overview: `The sharemarket has historically been one of the most effective ways to build long-term wealth — but it requires patience and discipline.

**ASX Basics:** The Australian Securities Exchange (ASX) is where shares of publicly listed companies are bought and sold. You need a brokerage account (CommSec, Stake, SelfWealth, etc.) to participate. Shares represent ownership in a company; you earn returns via dividends and capital growth.

**ETFs (Exchange Traded Funds):** ETFs track an index (like the ASX 200 or S&P 500) and can be bought like a share. They offer instant diversification, very low fees (0.03–0.5% p.a.), and transparency. They are generally preferred over active managed funds for retail investors due to lower costs.

**Compounding:** Reinvesting dividends and returns accelerates wealth building. $10,000 at 8% p.a. becomes $21,589 in 10 years and $46,610 in 20 years.

**Dollar-Cost Averaging (DCA):** Investing a fixed amount regularly (e.g., $500/month) regardless of market conditions. This removes the need to time the market and reduces the impact of volatility.`,
    keyPoints: [
      'ETFs offer low-cost diversification — index funds beat most active funds long-term',
      'Dollar-cost averaging removes the pressure of timing the market',
      'Reinvest dividends via DRP for compounding effect',
      'Hold for the long term — time in market beats timing the market',
      'Franking credits reduce tax on Australian dividends',
    ],
    calculator: 'compound-growth',
    quiz: [
      {
        question: 'What is an ETF?',
        options: [
          'A type of savings account',
          'A fund that tracks an index and can be traded like a share',
          'A government bond',
          'An individual company share',
        ],
        correct: 1,
        explanation: 'An ETF (Exchange Traded Fund) tracks an index or basket of assets and trades on the ASX like a regular share, offering instant diversification at very low cost.',
      },
      {
        question: 'What is dollar-cost averaging?',
        options: [
          'Buying shares at the lowest price possible',
          'Investing a fixed amount regularly regardless of market price',
          'Averaging your cost across multiple brokers',
          'A currency hedging strategy',
        ],
        correct: 1,
        explanation: 'Dollar-cost averaging involves investing a fixed amount at regular intervals. This means you buy more shares when prices are low and fewer when high, smoothing your average purchase price.',
      },
      {
        question: 'What are "franking credits"?',
        options: [
          'A type of brokerage fee',
          'Tax credits attached to Australian dividends, representing company tax already paid',
          'A government investment subsidy',
          'Credits for first-time investors',
        ],
        correct: 1,
        explanation: 'Franking credits represent the tax a company has already paid on its profits. Shareholders receive these credits and can use them to offset their own tax liability.',
      },
      {
        question: 'Why do ETFs generally outperform actively managed funds over the long term?',
        options: [
          'ETFs are guaranteed by the government',
          'ETFs take more risk',
          'Lower fees and the difficulty of consistently beating the market',
          'ETF managers are more skilled',
        ],
        correct: 2,
        explanation: 'Research consistently shows most active fund managers fail to outperform their benchmark index over 10+ years, especially after fees. Low-cost index ETFs capture market returns more reliably.',
      },
      {
        question: '$10,000 invested at 8% p.a. for 20 years grows to approximately:',
        options: ['$16,000', '$26,000', '$46,000', '$56,000'],
        correct: 2,
        explanation: '$10,000 × (1.08)^20 ≈ $46,610. This demonstrates how compounding creates exponential growth over long time horizons.',
      },
    ],
  },
  {
    id: 10,
    slug: 'superannuation',
    title: 'Superannuation',
    category: 'Retirement',
    icon: '🧓',
    description: 'SG rate, contribution types, SMSF basics, and salary sacrifice explained.',
    overview: `Superannuation is Australia's compulsory retirement savings system — and with the right strategy, it can be your most powerful wealth-building tool.

**Superannuation Guarantee (SG):** Employers must pay 11.5% of your ordinary time earnings (2024–25) into your super fund. This rises to 12% from 1 July 2025.

**Contribution Types:**
- *Concessional (pre-tax):* Employer contributions, salary sacrifice, and personal deductible contributions. Taxed at 15% in the fund. Annual cap: $30,000 (2024–25).
- *Non-concessional (after-tax):* Personal contributions from after-tax income. Annual cap: $120,000. No further tax in the fund.

**Salary Sacrifice:** Redirect part of your salary into super before tax, reducing your taxable income. On a $90,000 salary with $10,000 salary sacrifice, you only pay income tax on $80,000.

**SMSF (Self-Managed Super Fund):** You control your own super investment, including direct property and unlisted assets. Complex and expensive to run — generally only worth it above ~$500,000 in combined balances.

**Investment Options:** Most funds offer balanced (default), conservative, and growth options. Your risk profile and time horizon should guide your choice.`,
    keyPoints: [
      'SG rate: 11.5% (rising to 12% from July 2025)',
      'Salary sacrifice reduces taxable income — contributions taxed at 15%',
      'Concessional cap: $30,000; non-concessional cap: $120,000',
      'Find lost super at ATO: ato.gov.au/mysuper',
      'Compare super fund performance at ato.gov.au/super',
    ],
    calculator: 'superannuation',
    quiz: [
      {
        question: 'What is the Superannuation Guarantee rate for 2024–25?',
        options: ['10%', '10.5%', '11%', '11.5%'],
        correct: 3,
        explanation: 'The SG rate is 11.5% for 2024–25, rising to 12% from 1 July 2025. Employers must pay this on ordinary time earnings.',
      },
      {
        question: 'What is salary sacrifice in the context of superannuation?',
        options: [
          'Reducing your salary to save money',
          'Directing pre-tax salary into super, reducing taxable income',
          'Having your employer pay your super for free',
          'A government co-contribution scheme',
        ],
        correct: 1,
        explanation: 'Salary sacrifice allows you to redirect pre-tax salary into super. Contributions are taxed at 15% in the fund (vs your marginal rate), creating a tax saving if your marginal rate exceeds 15%.',
      },
      {
        question: 'What is the annual concessional contribution cap (2024–25)?',
        options: ['$25,000', '$27,500', '$30,000', '$35,000'],
        correct: 2,
        explanation: 'The concessional contributions cap is $30,000 per financial year (2024–25), covering employer contributions, salary sacrifice, and personal deductible contributions.',
      },
      {
        question: 'What is an SMSF?',
        options: [
          'A government-managed super fund',
          'A default industry super fund',
          'A self-managed super fund where you control investment decisions',
          'A salary sacrifice arrangement',
        ],
        correct: 2,
        explanation: 'An SMSF (Self-Managed Super Fund) is a private super fund with 1–6 members who act as trustees and are responsible for investment decisions. It\'s complex and cost-effective only with higher balances.',
      },
      {
        question: 'Where can you find and consolidate lost superannuation?',
        options: [
          'Through your bank',
          'Through ASIC',
          'Through the ATO via myGov',
          'Through your employer',
        ],
        correct: 2,
        explanation: 'The ATO maintains records of all super accounts. You can find and consolidate lost or multiple super accounts through myGov linked to the ATO.',
      },
    ],
  },
]
