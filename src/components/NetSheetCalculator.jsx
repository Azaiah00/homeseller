import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import jsPDF from 'jspdf'

const NetSheetCalculator = () => {
  const [formData, setFormData] = useState({
    listingPrice: '',
    mortgagePayoff: '',
    propertyTaxes: '',
    closingDate: '',
    commissionFees: 6, // Default 6% total commission
    miscClosingCosts: ''
  })

  const [netProceeds, setNetProceeds] = useState(0)
  const [breakdown, setBreakdown] = useState({
    listingPrice: 0,
    mortgagePayoff: 0,
    proratedTaxes: 0,
    commission: 0,
    closingCosts: 0,
    netAmount: 0
  })

  // Calculate prorated taxes based on closing date
  const calculateProratedTaxes = (yearlyTaxes, closingDate) => {
    if (!closingDate || !yearlyTaxes) return 0

    const closing = new Date(closingDate)
    const year = closing.getFullYear()
    const startOfYear = new Date(year, 0, 1)
    const daysInYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
    const daysElapsed = Math.floor((closing - startOfYear) / (1000 * 60 * 60 * 24))
    
    return (yearlyTaxes / daysInYear) * daysElapsed
  }

  // Calculate net proceeds
  useEffect(() => {
    const listingPrice = parseFloat(formData.listingPrice.toString().replace(/,/g, '')) || 0
    const mortgagePayoff = parseFloat(formData.mortgagePayoff.toString().replace(/,/g, '')) || 0
    const yearlyTaxes = parseFloat(formData.propertyTaxes.toString().replace(/,/g, '')) || 0
    const commissionPercent = parseFloat(formData.commissionFees) || 0
    const miscCosts = parseFloat(formData.miscClosingCosts.toString().replace(/,/g, '')) || 0

    const proratedTaxes = calculateProratedTaxes(yearlyTaxes, formData.closingDate)
    const commission = (listingPrice * commissionPercent) / 100

    const netAmount = listingPrice - mortgagePayoff - proratedTaxes - commission - miscCosts

    setBreakdown({
      listingPrice,
      mortgagePayoff,
      proratedTaxes,
      commission,
      closingCosts: miscCosts,
      netAmount: Math.max(0, netAmount)
    })

    setNetProceeds(Math.max(0, netAmount))
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'listingPrice' || name === 'mortgagePayoff' || name === 'propertyTaxes' || name === 'miscClosingCosts') {
      // Format with commas for display
      const numericValue = value.replace(/,/g, '')
      if (numericValue === '' || /^\d+$/.test(numericValue)) {
        const formattedValue = numericValue === '' ? '' : parseInt(numericValue).toLocaleString('en-US')
        setFormData(prev => ({ ...prev, [name]: formattedValue }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    
    // Add branding
    doc.setFontSize(20)
    doc.setTextColor(26, 32, 44) // navy
    doc.text('Seller Net Sheet Report', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setTextColor(201, 169, 97) // gold
    doc.text('Fred Sales | KS Team', 105, 28, { align: 'center' })
    
    doc.setDrawColor(201, 169, 97)
    doc.setLineWidth(0.5)
    doc.line(20, 32, 190, 32)
    
    // Add date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40)
    
    // Add calculations
    doc.setFontSize(12)
    doc.setTextColor(26, 32, 44)
    let yPos = 55
    
    doc.setFont(undefined, 'bold')
    doc.text('Listing Price:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(formatCurrency(breakdown.listingPrice), 150, yPos, { align: 'right' })
    
    yPos += 10
    doc.setFont(undefined, 'bold')
    doc.text('Less: Mortgage Payoff', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(`-${formatCurrency(breakdown.mortgagePayoff)}`, 150, yPos, { align: 'right' })
    
    yPos += 10
    doc.setFont(undefined, 'bold')
    doc.text('Less: Prorated Taxes', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(`-${formatCurrency(breakdown.proratedTaxes)}`, 150, yPos, { align: 'right' })
    
    yPos += 10
    doc.setFont(undefined, 'bold')
    doc.text('Less: Commission (' + formData.commissionFees + '%)', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(`-${formatCurrency(breakdown.commission)}`, 150, yPos, { align: 'right' })
    
    yPos += 10
    doc.setFont(undefined, 'bold')
    doc.text('Less: Closing Costs', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(`-${formatCurrency(breakdown.closingCosts)}`, 150, yPos, { align: 'right' })
    
    yPos += 15
    doc.setDrawColor(201, 169, 97)
    doc.setLineWidth(1)
    doc.line(20, yPos, 190, yPos)
    
    yPos += 10
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(26, 32, 44)
    doc.text('Estimated Net Proceeds:', 20, yPos)
    doc.setFontSize(18)
    doc.setTextColor(201, 169, 97)
    doc.text(formatCurrency(netProceeds), 150, yPos, { align: 'right' })
    
    // Add disclaimer
    yPos += 30
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text('* This is an estimate only. Actual proceeds may vary based on final closing costs,', 20, yPos, { maxWidth: 170 })
    yPos += 5
    doc.text('prorations, and adjustments. Consult with your real estate agent for accurate figures.', 20, yPos, { maxWidth: 170 })
    
    // Save PDF
    doc.save(`Seller-Net-Sheet-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <motion.section
      id="calculator"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Calculate Your Net Proceeds</h2>
          <p className="section-subtitle">
            Get an estimate of how much you'll walk away with after closing. Fill in your details below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="listingPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                    Listing Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      id="listingPrice"
                      name="listingPrice"
                      value={formData.listingPrice}
                      onChange={handleInputChange}
                      placeholder="500,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mortgagePayoff" className="block text-sm font-semibold text-gray-700 mb-2">
                    Existing Mortgage Payoff ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      id="mortgagePayoff"
                      name="mortgagePayoff"
                      value={formData.mortgagePayoff}
                      onChange={handleInputChange}
                      placeholder="300,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="propertyTaxes" className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Taxes (Yearly $)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      id="propertyTaxes"
                      name="propertyTaxes"
                      value={formData.propertyTaxes}
                      onChange={handleInputChange}
                      placeholder="6,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="closingDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Closing Date
                  </label>
                  <input
                    type="date"
                    id="closingDate"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="commissionFees" className="block text-sm font-semibold text-gray-700 mb-2">
                    Commission Fees (Total %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="commissionFees"
                      name="commissionFees"
                      value={formData.commissionFees}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      step="0.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="miscClosingCosts" className="block text-sm font-semibold text-gray-700 mb-2">
                    Misc Closing Costs (Est. $)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      id="miscClosingCosts"
                      name="miscClosingCosts"
                      value={formData.miscClosingCosts}
                      onChange={handleInputChange}
                      placeholder="3,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-8 text-white">
                  <div className="text-sm font-semibold mb-2">ESTIMATED NET PROCEEDS</div>
                  <div className="text-4xl md:text-5xl font-bold mb-4">
                    {formatCurrency(netProceeds)}
                  </div>
                  <div className="text-sm opacity-90">
                    This is your estimated cash at closing
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Breakdown:</h3>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Listing Price:</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(breakdown.listingPrice)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">- Mortgage Payoff:</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(breakdown.mortgagePayoff)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">- Prorated Taxes:</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(breakdown.proratedTaxes)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">- Commission ({formData.commissionFees}%):</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(breakdown.commission)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">- Closing Costs:</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(breakdown.closingCosts)}</span>
                  </div>

                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-800">Net Proceeds:</span>
                      <span className="font-bold text-primary text-lg">{formatCurrency(netProceeds)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={downloadPDF}
                  className="w-full cta-button primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={20} />
                  Download Official PDF Report
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  * This is an estimate only. Actual proceeds may vary based on final closing costs, prorations, and adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default NetSheetCalculator
