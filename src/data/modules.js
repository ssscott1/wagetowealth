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
  // ── EMPLOYER-SPECIFIC MODULES ─────────────────────────────────────────────
  {
    id: 11,
    slug: 'understanding-your-pay-slip',
    title: 'Understanding Your Pay Slip',
    category: 'Workplace',
    icon: '🧾',
    description: 'Decode every line of your pay slip — gross pay, PAYG tax, super, leave balances, and your legal rights.',
    overview: `Most Australians have never been taught to read their pay slip. Yet it contains critical information about whether you are being paid correctly, how much tax is being withheld, and whether your employer is meeting their super obligations.

**Gross Pay vs Net Pay**
Gross pay is your total earnings before deductions — base salary, penalty rates, allowances, and loadings. Net pay (take-home) is what hits your bank account after PAYG withholding, salary sacrifice deductions, and any other deductions are removed.

**PAYG Withholding**
PAYG (Pay As You Go) withholding is income tax your employer deducts from each pay and sends to the ATO on your behalf. The amount depends on your salary, your tax-free threshold declaration, HECS debt, and tax offsets. It varies because pay can vary — overtime, bonuses, and back-pay can push a single pay into a higher withholding band.

**Superannuation Guarantee Line**
Your employer must pay SG contributions (currently 12% p.a. of your ordinary time earnings) to your nominated super fund. This amount should appear on your pay slip. If it doesn't, ask HR. If super isn't being paid, report it to the ATO at ato.gov.au/check-super.

**Salary Sacrifice Deductions**
If you have a salary sacrifice arrangement (e.g. extra super, novated lease, laptop), these pre-tax deductions appear on your pay slip and reduce your gross pay before PAYG is calculated.

**Allowances, Loadings & Penalty Rates**
These appear as additional line items — e.g. a uniform allowance, shift loading, overtime rate, or car allowance. Each may be taxed differently.

**Leave Balances**
Most pay slips show your current accrued leave balances: annual leave, personal/carer's leave, and sometimes long service leave. Know your entitlements — unused annual leave and long service leave are paid out when you leave.

**Your Legal Rights**
Under the Fair Work Act, employers must provide a pay slip within 1 working day of your payday. Pay slips must show: employer name and ABN, employee name, pay period, gross and net pay, any deductions, and super contributions paid.

**Red Flags**
- No pay slip provided
- Super not showing or not matching (SG rate × gross)
- Hours shown don't match hours worked
- Deductions you didn't authorise`,
    keyPoints: [
      'Gross pay = before deductions; net pay = what you actually receive',
      'PAYG withholding is income tax deducted each pay — reconciled at tax time',
      'Your employer must pay super at the SG rate on ordinary time earnings',
      'Pay slips must be provided within 1 working day of pay day (Fair Work Act)',
      'Check your pay at fairwork.gov.au/pay-and-wages/pay-calculator',
    ],
    calculator: 'payg-take-home',
    quiz: [
      {
        question: 'What is the difference between gross pay and net pay?',
        options: [
          'Gross pay includes super; net pay does not',
          'Gross pay is before deductions; net pay is take-home after deductions',
          'Gross pay is your hourly rate; net pay is your annual salary',
          'There is no difference — they are the same amount',
        ],
        correct: 1,
        explanation: 'Gross pay is your total earnings before any deductions. Net pay is the amount deposited into your account after PAYG withholding, salary sacrifice, and other deductions.',
      },
      {
        question: 'Within how many working days must an employer provide a pay slip under the Fair Work Act?',
        options: ['Same day as pay', '1 working day', '3 working days', '7 days'],
        correct: 1,
        explanation: 'The Fair Work Act requires employers to provide a pay slip within 1 working day of the employee being paid.',
      },
      {
        question: 'What does PAYG withholding mean?',
        options: [
          'Your employer holds part of your pay and returns it later',
          'Income tax deducted from each pay and sent to the ATO on your behalf',
          'A penalty for submitting a late tax return',
          'A Medicare levy surcharge',
        ],
        correct: 1,
        explanation: 'PAYG (Pay As You Go) withholding is the income tax your employer deducts from each pay period and remits to the ATO. It\'s reconciled when you lodge your tax return.',
      },
      {
        question: 'What is the current Superannuation Guarantee rate that employers must pay?',
        options: ['10%', '10.5%', '11.5%', '12%'],
        correct: 3,
        explanation: 'From 1 July 2025, the SG rate is 12% of ordinary time earnings. If your pay slip shows less, check with HR or report it to the ATO.',
      },
      {
        question: 'Where should you report unpaid superannuation?',
        options: [
          'Fair Work Ombudsman (13 13 94)',
          'ASIC',
          'ATO at ato.gov.au/check-super',
          'Your bank',
        ],
        correct: 2,
        explanation: 'Unpaid super is reported to the ATO. You can use the ATO\'s online tool at ato.gov.au/check-super or call the ATO on 13 28 61.',
      },
    ],
  },
  {
    id: 12,
    slug: 'salary-packaging',
    title: 'Salary Packaging & Salary Sacrifice',
    category: 'Workplace',
    icon: '📦',
    description: 'Reduce your taxable income by packaging benefits pre-tax. Covers FBT, eligible items, and NFP concessions.',
    overview: `Salary packaging — also called salary sacrifice — allows you to receive part of your remuneration as benefits instead of cash, paid from your pre-tax salary. This reduces your taxable income and can result in significant tax savings.

**How It Works**
Instead of receiving $90,000 in salary and paying tax on the full amount, you might package $10,000 of benefits (like a novated car lease or extra super). You are then taxed on only $80,000 — a meaningful reduction if you are in a higher marginal tax bracket.

**Important: Must Be Arranged Before Pay Is Received**
Salary packaging must be set up in writing with your employer before the pay period in which it applies. You cannot retrospectively package income you have already received.

**Types of Packageable Items**
Your employer decides what they offer. Common options include:
- *Superannuation:* Extra contributions into your super fund (covered in Module 13)
- *Novated car lease:* A three-way vehicle arrangement (covered in Module 14)
- *Laptop/tablet/phone:* Devices primarily used for work — FBT-exempt
- *Professional memberships and subscriptions:* Industry bodies, journals
- *Work-related training and education:* Courses directly related to your role
- *Airline lounge memberships:* Where primarily work-related use can be demonstrated

**Fringe Benefits Tax (FBT)**
Most packaged benefits attract FBT at 47%, which the employer pays. This cost limits what employers offer. However, some items are FBT-exempt (like work-use devices) and therefore far more attractive.

**NFP and Public Hospital Employees**
Employees of not-for-profit organisations and public hospitals receive special FBT exemption caps — up to $15,900 (NFP) or $9,010 (public hospital) of benefits can be packaged entirely FBT-free. This is a major financial benefit for eligible employees that many do not fully utilise.

**What Salary Packaging Does NOT Do**
Salary sacrifice into non-super benefits does not reduce the salary base for your Superannuation Guarantee calculation. Your employer still pays SG on your ordinary time earnings.

**Who Benefits Most**
Employees in higher marginal tax brackets (37% or 45%) receive the largest tax advantage from packaging, since they are converting income that would have been taxed at their marginal rate into benefits taxed at a lower effective rate.`,
    keyPoints: [
      'Packaging reduces taxable income — most beneficial at higher marginal tax rates',
      'Must be arranged in writing BEFORE the pay period — not retrospective',
      'FBT-exempt items (laptops, phones) offer the best packaging value',
      'NFP/public hospital employees: up to $15,900 or $9,010 FBT-free packaging',
      'SG is still paid on your ordinary time earnings regardless of packaging',
    ],
    calculator: 'salary-sacrifice-saving',
    quiz: [
      {
        question: 'What is salary packaging?',
        options: [
          'Receiving your salary in multiple payments',
          'Receiving part of your remuneration as benefits paid from pre-tax salary',
          'Negotiating a higher salary',
          'A type of superannuation contribution',
        ],
        correct: 1,
        explanation: 'Salary packaging allows you to receive pre-tax salary as benefits, reducing your taxable income. Common examples include novated leases, laptops, and extra super contributions.',
      },
      {
        question: 'What does Fringe Benefits Tax (FBT) mean for salary packaging?',
        options: [
          'Employees pay 47% tax on packaged benefits',
          'Employers pay FBT on most benefits, which limits what they offer',
          'All packaged benefits are completely tax-free',
          'FBT only applies to superannuation packaging',
        ],
        correct: 1,
        explanation: 'FBT is paid by the employer at 47% on most fringe benefits. This cost means employers carefully choose which benefits to offer through packaging.',
      },
      {
        question: 'Who receives the most financial benefit from salary packaging?',
        options: [
          'Low income earners with the lowest marginal rate',
          'All employees equally — the benefit is the same for everyone',
          'Higher income earners on higher marginal tax rates',
          'Only not-for-profit employees',
        ],
        correct: 2,
        explanation: 'The higher your marginal tax rate, the more you save by converting taxable income into packaged benefits. Someone on 47% marginal rate saves far more than someone on 19%.',
      },
      {
        question: 'What is the FBT-free cap for a not-for-profit employee?',
        options: ['$9,010', '$12,000', '$15,900', '$18,200'],
        correct: 2,
        explanation: 'Eligible employees of not-for-profit organisations can package up to $15,900 of benefits completely FBT-free. Public hospital employees have a $9,010 cap.',
      },
      {
        question: 'Can you arrange salary packaging after you have already received your pay?',
        options: [
          'Yes, you can apply it to the current month',
          'Yes, but only for super contributions',
          'No — it must be set up in writing before the pay period',
          'Yes, within 30 days of receiving pay',
        ],
        correct: 2,
        explanation: 'Salary packaging arrangements must be made in advance and in writing with your employer before the pay period in which they apply. Retrospective packaging is not permitted by the ATO.',
      },
      {
        question: 'Does salary sacrifice into a novated lease reduce your super guarantee (SG) base?',
        options: [
          'Yes — your employer pays super on the reduced salary',
          'No — SG is still calculated on ordinary time earnings',
          'Only if the packaging amount exceeds $10,000',
          'It depends on the employer',
        ],
        correct: 1,
        explanation: 'Salary sacrifice into non-super benefits (like a novated lease) does not reduce your SG base. Your employer must still pay SG on your ordinary time earnings.',
      },
    ],
  },
  {
    id: 13,
    slug: 'super-contributions',
    title: 'Super: Salary Sacrifice & Voluntary Contributions',
    category: 'Workplace',
    icon: '💼',
    description: 'Go beyond the SG rate — salary sacrifice, personal contributions, FHSS, co-contributions, and the carry-forward rule.',
    overview: `Your employer's SG contributions are just the starting point. Voluntary contributions can dramatically accelerate your retirement balance — and deliver significant tax savings today.

**Salary Sacrifice Into Super**
Pre-tax salary diverted into super is taxed at only 15% inside the fund — lower than most employees' marginal income tax rate. On a $90,000 salary, sacrificing $10,000 extra into super saves approximately $2,700 in income tax (assuming a 37% marginal rate + 2% Medicare = 39% minus 15% contributions tax).

To set it up: request a salary sacrifice agreement from your HR or payroll team. It must be in writing and applied before the pay period.

**Concessional Contributions Cap**
All pre-tax super contributions — employer SG, salary sacrifice, and any personal deductible contributions — count toward the concessional cap. Check the current cap at ato.gov.au. Exceeding the cap results in extra tax.

**Carry-Forward Rule**
If your Total Super Balance is under $500,000, you can carry forward any unused concessional cap from the previous 5 financial years and use it in a single year. This is powerful for people returning from leave or with an irregular income year.

**Personal After-Tax (Non-Concessional) Contributions**
You can contribute from your own bank account (after-tax) directly to super. These do not attract contributions tax inside the fund. The non-concessional cap applies — check ato.gov.au. The bring-forward rule allows up to 3 years' cap in one year if eligible.

**Government Co-Contribution**
Low-to-middle income earners who make personal after-tax contributions may receive a government co-contribution of up to $500. Eligibility is income-tested — check current thresholds at ato.gov.au. No application required — the ATO calculates it automatically when you lodge your tax return.

**First Home Super Saver Scheme (FHSS)**
Voluntarily contribute to super, then withdraw those contributions (plus associated earnings) for a first home deposit. The tax advantage: contributions go in at 15%, and withdrawals are taxed at your marginal rate minus a 30% offset — usually far better than a standard savings account.

Critical: you must apply to the ATO for a FHSS release determination before signing a purchase contract. The application is irrevocable. Annual and lifetime release limits apply — verify at ato.gov.au.

**Division 293 Tax**
High income earners with total income (including concessional contributions) exceeding $250,000 pay an additional 15% tax on concessional contributions — bringing their effective rate to 30% rather than 15%.

**Checking Your Super**
Log in to myGov linked to the ATO to see all super accounts, find lost super, check balances, and consolidate multiple accounts. You can also check whether your employer is paying the correct SG amount.`,
    keyPoints: [
      'Salary sacrifice into super taxed at 15% — saving the difference vs your marginal rate',
      'Carry-forward rule: use up to 5 years of unused concessional cap if balance < $500,000',
      'FHSS: use super for a first home deposit — better after-tax outcome than a savings account',
      'Government co-contribution: up to $500 free for eligible low-to-middle income earners',
      'Check all current caps and thresholds at ato.gov.au — amounts change annually',
    ],
    calculator: 'super-sacrifice-projection',
    quiz: [
      {
        question: 'What tax rate applies to salary sacrifice contributions inside super?',
        options: ['0%', '10%', '15%', '30%'],
        correct: 2,
        explanation: 'Concessional (pre-tax) contributions — including salary sacrifice — are taxed at 15% inside the super fund. For most employees this is lower than their personal marginal income tax rate.',
      },
      {
        question: 'What is the carry-forward rule for super contributions?',
        options: [
          'You can move unused concessional cap from the last 5 years into this year if your balance is under $500,000',
          'You can carry forward unused non-concessional contributions indefinitely',
          'Unused cap is automatically added to next year\'s cap',
          'Carry-forward only applies to government co-contributions',
        ],
        correct: 0,
        explanation: 'If your Total Super Balance is under $500,000, you can access unused concessional cap amounts from the previous 5 financial years and use them in the current year.',
      },
      {
        question: 'What is the First Home Super Saver Scheme (FHSS)?',
        options: [
          'A government grant for first home buyers',
          'A scheme to use super fund returns to pay stamp duty',
          'Voluntarily contributing to super then withdrawing those contributions for a first home deposit with a tax advantage',
          'A scheme to salary sacrifice the mortgage repayments',
        ],
        correct: 2,
        explanation: 'The FHSS allows first home buyers to save inside super and withdraw contributions (with earnings) for a deposit. The tax advantage comes from contributing at 15% and withdrawing at marginal rate minus 30% offset.',
      },
      {
        question: 'What is the government co-contribution?',
        options: [
          'The SG rate the government mandates for all employers',
          'Up to $500 the government adds to your super when you make personal after-tax contributions — income tested',
          'A tax deduction for super contributions',
          'A payment the ATO makes on behalf of low-income earners',
        ],
        correct: 1,
        explanation: 'Eligible low-to-middle income earners who make personal after-tax contributions receive a government co-contribution of up to $500. The ATO automatically calculates and pays it — no separate application needed.',
      },
      {
        question: 'What is Division 293 tax?',
        options: [
          'The 15% contributions tax applied to all concessional contributions',
          'An additional 15% tax on concessional contributions for those earning over $250,000',
          'A penalty for exceeding the non-concessional cap',
          'A surcharge on SMSF earnings',
        ],
        correct: 1,
        explanation: 'Division 293 is an additional 15% tax on concessional super contributions for individuals whose combined income (including super contributions) exceeds $250,000. The effective rate becomes 30%.',
      },
      {
        question: 'When must you apply for a FHSS release determination?',
        options: [
          'Any time after purchasing your home',
          'Within 12 months of first making super contributions',
          'Before signing a purchase contract — the determination is irrevocable',
          'When lodging your tax return',
        ],
        correct: 2,
        explanation: 'You must apply to the ATO for a FHSS release determination BEFORE signing a purchase contract. Once issued, the determination is irrevocable and you must proceed with the withdrawal.',
      },
      {
        question: 'How do you find lost superannuation?',
        options: [
          'Contact each super fund individually',
          'Call the ATO on 13 28 61',
          'Use myGov linked to the ATO — the ATO holds records of all super accounts',
          'Check ASIC\'s database',
        ],
        correct: 2,
        explanation: 'The ATO maintains a register of all super accounts. Log in to myGov linked to the ATO to find lost or unclaimed super, view all accounts, and initiate consolidation.',
      },
    ],
  },
  {
    id: 14,
    slug: 'novated-leasing',
    title: 'Novated Leasing Explained',
    category: 'Workplace',
    icon: '🚘',
    description: 'The most misunderstood employee benefit — how novated leases work, the EV exemption, and when they make sense.',
    overview: `A novated lease is one of the most powerful — and most misunderstood — benefits available to Australian employees. Used well, it can save thousands of dollars a year.

**What Is a Novated Lease?**
A three-way agreement between you (the employee), your employer, and a finance company. Your employer deducts lease payments (and bundled running costs) from your gross salary before PAYG tax is applied. This reduces your taxable income each pay cycle.

**What Costs Can Be Bundled?**
Most novated lease providers let you bundle: lease repayments, fuel (or charging costs for EVs), registration, insurance, servicing, tyres, and roadside assistance — all from pre-tax salary.

**The FBT Issue — And How It's Managed**
Personal use of a vehicle attracts Fringe Benefits Tax at 47%, paid by the employer. To manage this, employers typically use the Employee Contribution Method (ECM): you make a post-tax contribution equal to the personal-use FBT liability, which reduces the FBT cost to zero. This post-tax portion still comes from your take-home pay — it's not all "free."

**The Electric Vehicle (EV) FBT Exemption**
Since April 2025, eligible battery EVs and plug-in hybrids (PHEVs) under the luxury car tax threshold are completely exempt from FBT — including the personal use portion. This removes the ECM calculation entirely and makes novated leasing significantly more attractive for EVs and PHEVs. Check ato.gov.au for current eligibility criteria and the LCT threshold.

**End of Lease Options**
At the end of the lease term, you typically have three options: pay the residual (balloon) and own the car outright, re-lease the same or a new vehicle, or hand the car back (if the residual was set appropriately).

**If You Leave Your Employer**
The lease obligation does not disappear. It either reverts to a personal (non-salary-packaged) lease, is transferred to your new employer if they accept it, or you pay it out. This is an important consideration before entering a lease.

**When a Novated Lease Works Well**
- Moderate-to-high income (37%+ marginal rate) — the tax saving is most meaningful
- High annual km driven — reduces the per-km cost of bundled running expenses
- Employer offers the benefit and has a reasonable provider
- EV or PHEV choice — FBT-exempt under current law

**When It May Not Be Right**
- Low income (smaller tax saving)
- Short job tenure (risk of employer change mid-lease)
- Very low km driving — bundled costs may over-budget running expenses`,
    keyPoints: [
      'Novated lease payments reduce taxable income via salary packaging',
      'EV and eligible PHEV novated leases are currently FBT-exempt — a major advantage',
      'Bundled costs include fuel, rego, insurance, servicing, and tyres',
      'If you leave your employer the lease obligation remains — plan carefully',
      'Most beneficial at higher marginal tax rates (37%+) with higher km usage',
    ],
    calculator: 'novated-vs-loan',
    quiz: [
      {
        question: 'What is a novated lease?',
        options: [
          'A car loan arranged through your employer\'s bank',
          'A three-way arrangement between employee, employer, and finance company — lease payments deducted from pre-tax salary',
          'A government scheme for first-time car buyers',
          'A hire purchase agreement',
        ],
        correct: 1,
        explanation: 'A novated lease involves three parties: you, your employer, and a finance company. Your employer deducts the bundled lease costs from your pre-tax salary, reducing your taxable income.',
      },
      {
        question: 'Which vehicles currently benefit from an FBT exemption on novated leases?',
        options: [
          'All vehicles under $50,000',
          'Hybrid vehicles only',
          'Eligible battery EVs and PHEVs under the luxury car tax threshold',
          'All vehicles manufactured after 2020',
        ],
        correct: 2,
        explanation: 'Under the current FBT exemption, eligible battery electric vehicles (EVs) and plug-in hybrids (PHEVs) under the luxury car tax threshold are FBT-exempt for novated leases.',
      },
      {
        question: 'What is the Employee Contribution Method (ECM)?',
        options: [
          'A way to increase your SG contributions',
          'An after-tax contribution by the employee to offset the personal-use FBT liability',
          'A method for paying out the residual at lease end',
          'A salary packaging limit set by the ATO',
        ],
        correct: 1,
        explanation: 'The ECM involves the employee making a post-tax contribution equal to the personal-use FBT liability, effectively reducing the FBT cost to zero for the employer.',
      },
      {
        question: 'What happens to a novated lease if you leave your employer?',
        options: [
          'The lease is automatically cancelled and the car is returned',
          'Your new employer is legally required to take over the lease',
          'The lease reverts to personal liability, transfers to a new employer, or must be paid out',
          'The government pays the remaining balance',
        ],
        correct: 2,
        explanation: 'If you leave your employer, the novated lease obligation doesn\'t disappear. You must either convert it to a personal lease, transfer it to a new employer, or pay it out — so consider job security before entering a long lease.',
      },
      {
        question: 'Which of the following costs can typically be bundled into a novated lease?',
        options: [
          'Fuel, registration, insurance, and servicing',
          'Only the lease repayments',
          'Mortgage repayments',
          'Groceries and general living expenses',
        ],
        correct: 0,
        explanation: 'Most novated lease packages bundle running costs including fuel (or EV charging), registration, insurance, tyres, and servicing — all deducted from pre-tax salary.',
      },
      {
        question: 'When is a novated lease least likely to be beneficial?',
        options: [
          'When you are on a high marginal tax rate',
          'When you drive high kilometres annually',
          'When you are on a low income with a short employment tenure',
          'When you choose an electric vehicle',
        ],
        correct: 2,
        explanation: 'The tax saving from a novated lease is smaller at lower marginal tax rates, and short employment tenure creates risk. Combined, these reduce the benefit significantly.',
      },
    ],
  },
  {
    id: 15,
    slug: 'income-tax-return',
    title: 'Income Tax & Your Tax Return',
    category: 'Workplace',
    icon: '📊',
    description: 'How PAYG works, what you can claim, myTax lodgement, HECS repayments, and tax brackets explained.',
    overview: `Understanding how Australian income tax works helps you avoid surprises at tax time and make sure you claim everything you are entitled to.

**How PAYG Withholding Works**
Your employer withholds income tax from each pay and remits it to the ATO. The amount is based on your declared tax-free threshold status, HECS debt, and any tax offsets. When you lodge your tax return, the ATO reconciles the total withheld against your actual tax liability — you get a refund if you overpaid, or a bill if you underpaid.

**2025–26 Australian Resident Tax Brackets**
Income tax brackets change — always verify at ato.gov.au for the current year:
- $0 – $18,200: Nil (Tax-Free Threshold)
- $18,201 – $45,000: 16 cents for each $1 over $18,200
- $45,001 – $135,000: $4,288 + 30 cents for each $1 over $45,000
- $135,001 – $190,000: $31,288 + 37 cents for each $1 over $135,000
- $190,001+: $51,638 + 45 cents for each $1 over $190,000
Plus 2% Medicare Levy on all taxable income.

**The Tax-Free Threshold**
The first $18,200 of your income is tax-free. Claim it with only one employer — if you work multiple jobs, only claim the threshold with your primary employer.

**Common Deductions Employees Can Claim**
- Work-related expenses: uniform, protective clothing, tools, work-use portion of phone/internet
- Home office: fixed rate method (check current rate at ato.gov.au) or actual costs
- Self-education directly related to your current job
- Professional memberships and subscriptions
- Union fees
- Income protection insurance premiums (not life insurance)
- Tax agent fees (from the following year's return)

**What You CANNOT Claim**
Personal clothing, gym memberships, ordinary meals, the cost of travelling between home and work, private components of mixed-use items.

**Lodging via myTax**
The ATO's free myTax tool (via myGov) pre-fills most information including income, health insurance details, and some bank interest. It's the fastest and cheapest way to lodge for most employees.

**HECS-HELP Repayments**
If you have a HECS-HELP debt, compulsory repayments are deducted via PAYG once your income exceeds the repayment threshold (verify at ato.gov.au). The repayment rate increases with income. HECS debt does not attract commercial interest — it is indexed annually to CPI.

**Medicare Levy Surcharge (MLS)**
If you earn above the MLS income threshold (verify at ato.gov.au) and do not have private hospital cover, you pay an additional 1–1.5% surcharge on top of the standard 2% Medicare levy.`,
    keyPoints: [
      'Claim the tax-free threshold with one employer only',
      'Home office, work clothing, tools, and self-education costs are claimable',
      'Lodge for free via myTax at my.gov.au — pre-fills most data',
      'HECS debt is CPI-indexed, not commercial interest — not urgent to repay early',
      'Verify current brackets, thresholds, and rates at ato.gov.au',
    ],
    calculator: 'payg-take-home',
    quiz: [
      {
        question: 'What is the Tax-Free Threshold in Australia?',
        options: ['$12,000', '$15,000', '$18,200', '$20,000'],
        correct: 2,
        explanation: 'The first $18,200 of income for Australian tax residents is tax-free. You should claim this threshold with only one employer.',
      },
      {
        question: 'Which of the following can an employee typically claim as a tax deduction?',
        options: [
          'Daily commute to work',
          'Personal gym membership',
          'Work-related tools and equipment',
          'General clothing worn to the office',
        ],
        correct: 2,
        explanation: 'Work-related tools and equipment (not reimbursed by your employer) are tax-deductible. Commuting, personal gym memberships, and ordinary clothing worn to work are not.',
      },
      {
        question: 'What does lodging a tax return via myTax cost?',
        options: ['$49', '$99', 'Free', 'A percentage of your refund'],
        correct: 2,
        explanation: 'myTax is the ATO\'s free online lodgement tool available via myGov. It pre-fills most information and is free to use. Tax agents charge fees, but may be worth it for complex returns.',
      },
      {
        question: 'When does HECS-HELP repayment begin?',
        options: [
          'Immediately when you graduate',
          'Once your income exceeds the compulsory repayment threshold',
          'At age 30',
          'Only when you apply to the ATO',
        ],
        correct: 1,
        explanation: 'HECS-HELP repayments are compulsory once your income exceeds the repayment threshold (set by the ATO). They are automatically deducted via PAYG withholding.',
      },
      {
        question: 'What is the Medicare Levy Surcharge?',
        options: [
          'The standard 2% Medicare levy paid by all residents',
          'An additional 1–1.5% levied on higher earners without private hospital cover',
          'A surcharge for using public hospitals',
          'A tax applied to all investment income',
        ],
        correct: 1,
        explanation: 'The MLS is an extra 1–1.5% tax on higher income earners who do not have private hospital cover. It is in addition to the standard 2% Medicare Levy.',
      },
      {
        question: 'How is HECS-HELP debt indexed?',
        options: [
          'At a fixed 3% per year',
          'At the RBA cash rate',
          'At the Consumer Price Index (CPI) annually',
          'It doesn\'t attract any indexation',
        ],
        correct: 2,
        explanation: 'HECS-HELP debt is indexed annually to CPI (inflation), not commercial interest rates. This makes it low-cost debt — focus on higher-rate debts before accelerating HECS repayments.',
      },
    ],
  },
  {
    id: 16,
    slug: 'workplace-entitlements',
    title: 'Knowing Your Workplace Entitlements',
    category: 'Workplace',
    icon: '⚖️',
    description: 'NES minimum entitlements, award wages, super rights, parental leave, redundancy, and what to do if underpaid.',
    overview: `Financial literacy at work starts with knowing what you are legally entitled to. The National Employment Standards (NES) set the minimum entitlements for most Australian employees.

**The National Employment Standards (NES)**
Under the Fair Work Act, 11 minimum entitlements apply to all employees covered by the national workplace relations system:
1. Maximum weekly hours: 38 ordinary hours plus reasonable additional hours
2. Annual leave: 4 weeks per year (pro-rata); 5 weeks for some shift workers
3. Personal/carer's leave: 10 days per year (paid) plus 2 days compassionate leave (per occasion)
4. Family and domestic violence leave: 10 days paid leave per year
5. Parental leave: up to 52 weeks unpaid (18 weeks of Government PPL may also be available)
6. Flexible working arrangements: eligible employees can request flexibility
7. Notice of termination and redundancy pay (as per NES scale)
8. Fair Work Information Statement (must be provided by employer)
9. Public holidays and community service leave

**Award Wages**
Most employees are covered by a modern award that sets minimum rates. Use the Fair Work Pay Calculator at fairwork.gov.au to check your minimum pay for your classification.

**Superannuation Rights**
You have a legal right to SG contributions from your employer. If you suspect you are not receiving them, check via myGov linked to the ATO, or report to the ATO at ato.gov.au/check-super.

**If You Are Being Underpaid**
1. Check your award or enterprise agreement at fairwork.gov.au
2. Speak with your employer or HR (keep a written record)
3. If unresolved, contact the Fair Work Ombudsman: 13 13 94 (free, confidential)
4. You can recover up to 6 years of underpaid wages through the FWO

**Parental Leave and Financial Planning**
Government Paid Parental Leave (PPL) is available for eligible primary carers — check Services Australia for current rates and eligibility. Super is not automatically paid during unpaid parental leave — you can make voluntary contributions to bridge the gap.

**Redundancy Entitlements**
Genuine redundancy pay is calculated based on years of continuous service (see Fair Work redundancy scale). Tax treatment: genuine redundancy payments receive concessional tax treatment up to the tax-free limit (verify at ato.gov.au).

**Final Pay**
When employment ends, your final pay must include: outstanding wages, accrued annual leave payout, and (if eligible) accrued long service leave. Payment must be made by the next scheduled pay day.`,
    keyPoints: [
      'NES provides 11 minimum entitlements for all national system employees',
      'Check your minimum pay at fairwork.gov.au/pay-calculator',
      'Underpayment: contact Fair Work Ombudsman — 13 13 94 — up to 6 years recoverable',
      'Genuine redundancy payments receive concessional tax treatment',
      'Super is not automatically paid during unpaid parental leave — plan ahead',
    ],
    calculator: 'redundancy-estimator',
    quiz: [
      {
        question: 'How many days of paid personal/carer\'s leave are most employees entitled to per year under the NES?',
        options: ['5 days', '8 days', '10 days', '15 days'],
        correct: 2,
        explanation: 'The NES provides 10 days of paid personal/carer\'s leave per year for full-time employees. Part-time employees receive a pro-rata entitlement.',
      },
      {
        question: 'What is the maximum unpaid parental leave entitlement under the NES?',
        options: ['6 months', '9 months', '12 months (52 weeks)', '24 months'],
        correct: 2,
        explanation: 'Eligible employees are entitled to up to 52 weeks of unpaid parental leave. In addition, Government Paid Parental Leave (PPL) provides payments for eligible primary carers.',
      },
      {
        question: 'Where can you check if you are being paid the correct minimum wage for your job?',
        options: [
          'ato.gov.au',
          'fairwork.gov.au — Pay Calculator',
          'moneysmart.gov.au',
          'asic.gov.au',
        ],
        correct: 1,
        explanation: 'The Fair Work Ombudsman\'s Pay Calculator at fairwork.gov.au lets you check minimum wages and entitlements for your award or enterprise agreement classification.',
      },
      {
        question: 'How many years of wages can the Fair Work Ombudsman help recover if you have been underpaid?',
        options: ['1 year', '3 years', '6 years', 'There is no limit'],
        correct: 2,
        explanation: 'Employees can recover up to 6 years of underpaid wages through the Fair Work Ombudsman. Contact the FWO on 13 13 94 — the service is free and confidential.',
      },
      {
        question: 'Are super contributions automatically paid during unpaid parental leave?',
        options: [
          'Yes — the government pays super during PPL periods',
          'Yes — employers must pay super throughout all leave',
          'No — super is typically not paid during unpaid parental leave',
          'Only if the employee earns over $50,000',
        ],
        correct: 2,
        explanation: 'Employers are generally not required to pay super contributions during periods of unpaid parental leave. Employees may choose to make voluntary contributions during this time.',
      },
    ],
  },
  {
    id: 17,
    slug: 'employee-share-schemes',
    title: 'Employee Share Schemes (ESS)',
    category: 'Workplace',
    icon: '📊',
    description: 'How ESS, RSUs, and options work — tax treatment, vesting, CGT, and the start-up concession.',
    overview: `Employee Share Schemes (ESS) allow employers to grant shares, rights, or options to employees — often at a discount or for free. They can be a significant component of total compensation, but the tax treatment is complex.

**Types of ESS**
- *Direct shares:* Employer grants shares at a discount to market value
- *Rights and options:* The right to acquire shares at a set price in the future
- *Restricted Stock Units (RSUs):* A promise to deliver shares upon meeting vesting conditions

**General Tax Treatment**
The discount on shares or the value of rights is generally taxed as income in the year the shares are acquired, at the market value minus the price paid. This appears on an ESS statement provided by your employer and is included in your tax return.

**Deferred Taxation (Deferral)**
Under certain conditions, tax can be deferred until a later "ESS deferred taxing point" — which is typically the earlier of: when you sell the shares, when you leave the employer, or 15 years from acquisition. Deferral conditions must be met at the scheme level.

**The $1,000 Concession**
Employees can receive up to $1,000 of shares at a discount tax-free in a qualifying ESS, provided income is under the threshold and other conditions are met — verify at ato.gov.au.

**Start-Up ESS Concession**
Employees of qualifying start-up companies can receive options with significantly concessional tax treatment — taxed as a capital gain when sold (rather than income at grant or exercise), potentially attracting the 50% CGT discount if held 12+ months. This is a powerful incentive. Check qualifying conditions at ato.gov.au/ess.

**CGT on Sale**
When you eventually sell ESS shares, CGT applies. The cost base is generally the market value at the time of taxation. If held for more than 12 months after the taxing point, the 50% CGT discount may apply.

**Key Risks**
- *Concentration risk:* Holding significant wealth in your employer's shares is undiversified
- *Options can expire worthless:* If the share price doesn't exceed the exercise price, options have no value
- *Tax liability at vesting:* You may owe tax even before you can sell (in non-deferral schemes)

**What to Ask Your Employer**
- What type of ESS is it? (shares, options, RSUs)
- Is it a deferred taxing scheme?
- When is the vesting schedule?
- Will an ESS statement be provided for your tax return?
- Are there any sale restrictions post-vesting?`,
    keyPoints: [
      'ESS discount value is generally taxed as income — check your ESS statement',
      'Start-up ESS options may be taxed as CGT (not income) — check ato.gov.au/ess',
      'Deferral conditions can delay the tax event until sale or departure',
      'Concentration risk: employer shares are undiversified — consider diversifying post-vesting',
      '50% CGT discount available if shares held 12+ months after the taxing point',
    ],
    calculator: 'ess-tax-estimator',
    quiz: [
      {
        question: 'What is an Employee Share Scheme (ESS)?',
        options: [
          'A super fund offered by employers',
          'A scheme where employers grant shares, rights, or options to employees as remuneration',
          'A government initiative to encourage share ownership',
          'A bonus paid in cash instead of shares',
        ],
        correct: 1,
        explanation: 'An ESS allows employers to provide equity-based remuneration in the form of shares, options, or rights — often at a discount or for free — as part of total compensation.',
      },
      {
        question: 'How is an ESS discount generally taxed?',
        options: [
          'Tax-free up to $10,000',
          'Taxed as capital gain when sold',
          'Taxed as income in the year acquired (unless deferred)',
          'Exempt from all tax for employees',
        ],
        correct: 2,
        explanation: 'The discount (market value minus price paid) is generally taxed as ordinary income in the year you acquire the shares, unless a deferral condition applies.',
      },
      {
        question: 'What is the main advantage of the start-up ESS concession?',
        options: [
          'No tax is ever paid on start-up shares',
          'Options are taxed as capital gain on sale rather than income at grant — potentially attracting the 50% CGT discount',
          'Employees receive a $1,000 government grant',
          'Start-up shares are always deferred for 15 years',
        ],
        correct: 1,
        explanation: 'The start-up ESS concession allows employees of qualifying startups to have options taxed as capital gains (not income) when sold, and the 50% CGT discount may apply if held 12+ months.',
      },
      {
        question: 'What is concentration risk in the context of ESS?',
        options: [
          'The risk that too many employees participate in the scheme',
          'The risk that your wealth becomes heavily tied to your employer\'s share price',
          'The risk of exceeding the $1,000 tax-free threshold',
          'The risk that your options expire before vesting',
        ],
        correct: 1,
        explanation: 'Concentration risk means having a significant portion of your wealth in one asset — your employer\'s shares. If the company performs poorly, your job AND your investments could be at risk simultaneously.',
      },
      {
        question: 'When might the 50% CGT discount apply to ESS shares?',
        options: [
          'Immediately when shares are granted',
          'If shares are held for more than 12 months after the taxing point',
          'Only for start-up ESS shares',
          'For all ESS shares regardless of holding period',
        ],
        correct: 1,
        explanation: 'The standard CGT 50% discount applies if shares are held as a capital asset for more than 12 months after the relevant taxing point (when the gain becomes subject to CGT).',
      },
    ],
  },
  {
    id: 18,
    slug: 'life-events',
    title: 'Managing Money Through Life Events',
    category: 'Workplace',
    icon: '🔄',
    description: 'Getting married, having a baby, separation, changing jobs, redundancy — how each major life event affects your finances.',
    overview: `Major life events create financial complexity. This module walks through the most common transitions employees face and what to consider at each stage.

**Getting Married or Entering a De Facto Relationship**
Combining finances is a significant decision. Consider: joint accounts for shared expenses, maintaining individual accounts for autonomy, and updating super beneficiary nominations. A binding death benefit nomination with your super fund ensures your benefit is paid to the right person — default nominations may not match your wishes. Review insurance policies for potential bundling opportunities, and consider making or updating your will.

**Having a Baby**
Plan for income changes during parental leave — Government Paid Parental Leave (PPL) provides payments for eligible primary carers (check Services Australia for current rates). If taking unpaid leave, super contributions pause — consider making voluntary contributions to close the gap. Update your budget to account for childcare costs (the Childcare Subsidy (CCS) reduces the cost — check eligibility at servicesaustralia.gov.au). A new dependant may affect your Medicare Levy Surcharge position.

**Separation or Divorce**
Super is treated as property in a family law settlement — it can be split between partners via a Super Splitting Order. Joint debt: both parties remain liable for joint loans regardless of verbal separation agreements — document and act on debt responsibilities formally. Rebuild your budget on a single income immediately. Free support is available from Legal Aid and the National Debt Helpline (1800 007 007).

**Changing Jobs**
Consolidate your superannuation — multiple funds mean multiple fee structures. Check insurance coverage in your new fund before closing old accounts (default insurance may not carry over). Your unused annual leave is paid out on resignation — this payout is taxed as ordinary income. Check whether your new employer offers salary packaging or better super options than your previous employer.

**Redundancy**
Genuine redundancy payments receive concessional tax treatment up to a tax-free limit (verify at ato.gov.au — indexed annually). The payout may include: redundancy pay (concessionally taxed), payment in lieu of notice (marginal rate), and unused leave (marginal rate). If you receive a large lump sum, consider: extra super contributions (within caps), offset account top-up, or emergency fund replenishment. Centrelink has a liquid assets waiting period if you receive a redundancy payout before benefits commence.`,
    keyPoints: [
      'Update super beneficiary nominations after major relationship changes',
      'Super is property in a family law split — take legal advice early',
      'Redundancy pay is concessionally taxed up to the ATO tax-free limit',
      'Consolidate super when changing jobs — check insurance before closing old funds',
      'Government Paid Parental Leave (PPL) and the Childcare Subsidy (CCS) are income-tested — check servicesaustralia.gov.au',
    ],
    quiz: [
      {
        question: 'What should you update with your super fund after getting married or entering a de facto relationship?',
        options: [
          'Your contribution rate',
          'Your investment option only',
          'Your binding death benefit nomination',
          'Your employer details',
        ],
        correct: 2,
        explanation: 'A binding death benefit nomination ensures your super benefit is paid to the right person. Without an updated nomination, the trustee has discretion — your partner may not automatically receive your super.',
      },
      {
        question: 'Are super contributions typically paid during unpaid parental leave?',
        options: [
          'Yes — employers must pay super throughout all leave',
          'Yes — the government makes super contributions during PPL',
          'No — super is typically not paid during unpaid leave',
          'Only if the leave period is under 3 months',
        ],
        correct: 2,
        explanation: 'Employers are generally not required to pay super during unpaid parental leave. This creates a gap in super savings that employees may choose to address with voluntary contributions.',
      },
      {
        question: 'In a separation or divorce, how is superannuation treated?',
        options: [
          'Super is excluded from family law property settlements',
          'Only the balance at the date of marriage is counted',
          'Super is treated as property and can be split via a Super Splitting Order',
          'Super goes to the party with the higher balance',
        ],
        correct: 2,
        explanation: 'Under the Family Law Act, superannuation is property and can be divided between separating parties via a Super Splitting Order, either by agreement or court order.',
      },
      {
        question: 'What should you check before closing an old super fund when changing jobs?',
        options: [
          'Whether the fund has a high-interest savings account',
          'Whether the fund has a physical branch near your home',
          'Whether you have insurance in the fund that would be lost on closure',
          'Whether the fund manager has won industry awards',
        ],
        correct: 2,
        explanation: 'Many default super accounts include life insurance and TPD cover. Closing an account without checking can mean losing insurance you may not be able to replace at the same cost due to age or health changes.',
      },
      {
        question: 'How is annual leave paid out taxed when you resign or are made redundant?',
        options: [
          'Tax-free up to $10,000',
          'At a flat rate of 15%',
          'At your marginal income tax rate',
          'As a capital gain',
        ],
        correct: 2,
        explanation: 'Unused annual leave paid out on termination is generally taxed at your marginal income tax rate — it is treated as ordinary income.',
      },
      {
        question: 'What is the Centrelink liquid assets waiting period relevant to redundancy?',
        options: [
          'A 2-year period before you can access super after redundancy',
          'A waiting period before Centrelink benefits begin if you received a significant redundancy payout',
          'The time it takes for Centrelink to process a redundancy application',
          'A period during which you cannot make super contributions',
        ],
        correct: 1,
        explanation: 'If you receive a significant redundancy payout, Centrelink may impose a liquid assets waiting period before payments like JobSeeker begin. The length depends on the payout amount.',
      },
    ],
  },
]
