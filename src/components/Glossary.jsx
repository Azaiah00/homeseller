import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'

const Glossary = ({ onBack }) => {
  const terms = [
    {
      letter: 'A',
      items: [
        {
          term: 'Appraisal',
          definition: 'A professional assessment of a property\'s value, typically conducted by a licensed appraiser. Lenders require appraisals to ensure the property is worth the loan amount.'
        },
        {
          term: 'As-Is',
          definition: 'A property sold in its current condition, with no repairs or improvements made by the seller. Buyers accept the property with all existing defects.'
        },
        {
          term: 'Assessed Value',
          definition: 'The value assigned to a property by a tax assessor for the purpose of calculating property taxes. This may differ from the market value.'
        },
        {
          term: 'Assumable Mortgage',
          definition: 'A mortgage that can be transferred from the seller to the buyer, allowing the buyer to take over the existing loan terms.'
        }
      ]
    },
    {
      letter: 'B',
      items: [
        {
          term: 'Backup Offer',
          definition: 'A secondary offer on a property that becomes active if the primary offer falls through. It provides security for sellers.'
        },
        {
          term: 'Bridge Loan',
          definition: 'A short-term loan that helps homeowners purchase a new home before selling their current one. It bridges the gap between transactions.'
        },
        {
          term: 'Buyer\'s Agent',
          definition: 'A real estate agent who represents the buyer\'s interests in a transaction. The buyer\'s agent helps find properties, negotiate offers, and guide the buyer through the process.'
        },
        {
          term: 'Buyer\'s Market',
          definition: 'A market condition where there are more homes for sale than buyers, giving buyers more negotiating power and often leading to lower prices.'
        }
      ]
    },
    {
      letter: 'C',
      items: [
        {
          term: 'Closing',
          definition: 'The final step in a real estate transaction where ownership is transferred from seller to buyer. All documents are signed, funds are exchanged, and keys are handed over.'
        },
        {
          term: 'Closing Costs',
          definition: 'Fees and expenses paid at closing, including loan origination fees, title insurance, escrow fees, property taxes, and recording fees. Typically 2-5% of the home price for buyers, 8-10% for sellers.'
        },
        {
          term: 'CMA (Comparative Market Analysis)',
          definition: 'A report prepared by a real estate agent that compares your home to similar properties that have recently sold, are currently for sale, or were listed but didn\'t sell. Used to determine a competitive listing price.'
        },
        {
          term: 'Commission',
          definition: 'The fee paid to real estate agents for their services, typically a percentage of the sale price (usually 5-6% total, split between listing and buyer\'s agents).'
        },
        {
          term: 'Contingency',
          definition: 'A condition that must be met for a real estate contract to be binding. Common contingencies include home inspection, appraisal, financing, and sale of buyer\'s current home.'
        },
        {
          term: 'Counter Offer',
          definition: 'A response to an initial offer that proposes different terms, such as a different price, closing date, or conditions. The negotiation process continues until both parties agree.'
        }
      ]
    },
    {
      letter: 'D',
      items: [
        {
          term: 'Days on Market (DOM)',
          definition: 'The number of days a property has been listed for sale. A high DOM may indicate overpricing or other issues.'
        },
        {
          term: 'Deed',
          definition: 'The legal document that transfers ownership of a property from seller to buyer. It must be recorded with the local government.'
        },
        {
          term: 'Deposit (Earnest Money)',
          definition: 'Money put down by the buyer to show serious intent to purchase. Typically 1-3% of the purchase price, held in escrow and applied to closing costs or down payment.'
        },
        {
          term: 'Down Payment',
          definition: 'The initial payment made by the buyer toward the purchase price. Typically 3-20% of the home price, with the remainder financed through a mortgage.'
        }
      ]
    },
    {
      letter: 'E',
      items: [
        {
          term: 'Equity',
          definition: 'The difference between your home\'s market value and the amount you owe on your mortgage. As you pay down your mortgage and property values increase, your equity grows.'
        },
        {
          term: 'Escrow',
          definition: 'A neutral third party that holds funds and documents during a real estate transaction, ensuring all conditions are met before closing.'
        },
        {
          term: 'Exclusive Listing',
          definition: 'A listing agreement where only one real estate agent has the right to sell the property for a specified period.'
        }
      ]
    },
    {
      letter: 'F',
      items: [
        {
          term: 'FSBO (For Sale By Owner)',
          definition: 'A property sold directly by the owner without a real estate agent. Sellers handle all aspects of the sale themselves.'
        },
        {
          term: 'Fair Market Value',
          definition: 'The price a property would sell for in an open market with a willing buyer and seller, both having reasonable knowledge of the property.'
        }
      ]
    },
    {
      letter: 'H',
      items: [
        {
          term: 'Home Inspection',
          definition: 'A thorough examination of a property\'s condition, including structural elements, systems (HVAC, plumbing, electrical), and potential issues. Buyers typically have the right to inspect and negotiate repairs.'
        },
        {
          term: 'Home Warranty',
          definition: 'A service contract that covers repairs or replacement of major home systems and appliances for a specified period, typically one year.'
        },
        {
          term: 'HOA (Homeowners Association)',
          definition: 'An organization that manages and enforces rules for a community or condominium complex. Homeowners pay monthly or annual fees for maintenance and amenities.'
        }
      ]
    },
    {
      letter: 'L',
      items: [
        {
          term: 'Listing Agent',
          definition: 'The real estate agent who represents the seller and lists the property for sale. Also called the seller\'s agent.'
        },
        {
          term: 'Listing Price',
          definition: 'The asking price for a property set by the seller and listing agent. This is the starting point for negotiations.'
        },
        {
          term: 'Lockbox',
          definition: 'A secure device attached to a property that holds the key, allowing authorized agents to show the home when the owner isn\'t present.'
        }
      ]
    },
    {
      letter: 'M',
      items: [
        {
          term: 'MLS (Multiple Listing Service)',
          definition: 'A database used by real estate agents to share property listings with other agents. Most homes sold through agents are listed on the MLS.'
        },
        {
          term: 'Mortgage',
          definition: 'A loan used to purchase real estate, where the property serves as collateral. The borrower makes monthly payments of principal and interest.'
        }
      ]
    },
    {
      letter: 'N',
      items: [
        {
          term: 'Net Proceeds',
          definition: 'The amount of money a seller receives after all closing costs, commissions, and mortgage payoffs are deducted from the sale price.'
        },
        {
          term: 'Negotiation',
          definition: 'The process of discussing and agreeing on terms of a real estate transaction, including price, closing date, repairs, and contingencies.'
        }
      ]
    },
    {
      letter: 'O',
      items: [
        {
          term: 'Offer',
          definition: 'A formal proposal to purchase a property at a specific price and under certain conditions. The seller can accept, reject, or counter the offer.'
        },
        {
          term: 'Open House',
          definition: 'A scheduled time when a property is open for public viewing without an appointment. Used to generate interest and attract potential buyers.'
        }
      ]
    },
    {
      letter: 'P',
      items: [
        {
          term: 'Pre-Approval',
          definition: 'A lender\'s commitment to loan a specific amount to a buyer, based on credit check and financial verification. Stronger than pre-qualification.'
        },
        {
          term: 'Pre-Qualification',
          definition: 'A preliminary assessment of a buyer\'s borrowing capacity based on basic financial information. Less formal than pre-approval.'
        },
        {
          term: 'Property Tax',
          definition: 'Taxes assessed by local governments based on the property\'s assessed value. Used to fund schools, roads, and other public services.'
        }
      ]
    },
    {
      letter: 'R',
      items: [
        {
          term: 'Real Estate Agent',
          definition: 'A licensed professional who represents buyers or sellers in real estate transactions. Agents must complete education and pass a licensing exam.'
        },
        {
          term: 'Realtor®',
          definition: 'A real estate agent who is a member of the National Association of Realtors (NAR) and adheres to a strict code of ethics.'
        },
        {
          term: 'ROI (Return on Investment)',
          definition: 'A measure of the profitability of an investment, calculated as the percentage of profit relative to the cost. Used to evaluate home improvements.'
        }
      ]
    },
    {
      letter: 'S',
      items: [
        {
          term: 'Seller\'s Agent',
          definition: 'A real estate agent who represents the seller\'s interests. Also called the listing agent.'
        },
        {
          term: 'Seller\'s Market',
          definition: 'A market condition where there are more buyers than available homes, giving sellers more negotiating power and often leading to higher prices and faster sales.'
        },
        {
          term: 'Settlement',
          definition: 'Another term for closing, the final step where ownership transfers and all documents are signed.'
        },
        {
          term: 'Staging',
          definition: 'The process of preparing a home for sale by arranging furniture, decor, and removing personal items to make the property more appealing to buyers.'
        }
      ]
    },
    {
      letter: 'T',
      items: [
        {
          term: 'Title',
          definition: 'Legal ownership of a property. A clear title means there are no claims or liens against the property.'
        },
        {
          term: 'Title Insurance',
          definition: 'Insurance that protects buyers and lenders from defects in the title, such as liens, encumbrances, or ownership disputes.'
        },
        {
          term: 'Transfer Tax',
          definition: 'A tax paid when property ownership is transferred, typically based on the sale price. Varies by location.'
        }
      ]
    },
    {
      letter: 'U',
      items: [
        {
          term: 'Under Contract',
          definition: 'A status indicating that a seller has accepted an offer and the property is in the process of closing. The sale is pending but not yet final.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-navy hover:text-primary transition-colors font-semibold"
                aria-label="Back to main page"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary" size={24} />
                <h1 className="text-2xl font-bold text-navy">Real Estate Glossary</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-lg text-gray-600 mb-8 text-center">
            Understanding real estate terminology is key to making informed decisions. 
            Use this glossary to educate yourself on common terms you'll encounter during your home selling journey.
          </p>

          <div className="space-y-12">
            {terms.map((section, sectionIndex) => (
              <motion.div
                key={section.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <h2 className="text-4xl font-bold text-primary mb-6 pb-4 border-b-2 border-primary/20">
                  {section.letter}
                </h2>
                <div className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary/30 pl-6 py-2">
                      <h3 className="text-xl font-bold text-navy mb-2">{item.term}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <button
              onClick={onBack}
              className="cta-button primary"
            >
              Return to Main Page
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Glossary

